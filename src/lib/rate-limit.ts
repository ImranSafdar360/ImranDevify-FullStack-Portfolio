import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  keyGenerator?: (req: NextRequest) => string;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use Redis in production)
const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      skipSuccessfulRequests: false,
      skipFailedRequests: false,
      keyGenerator: (req) => this.getClientIP(req),
      ...config,
    };
  }

  private getClientIP(req: NextRequest): string {
    // Try to get real IP from various headers
    const forwarded = req.headers.get('x-forwarded-for');
    const realIP = req.headers.get('x-real-ip');
    const cfConnectingIP = req.headers.get('cf-connecting-ip');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    if (cfConnectingIP) {
      return cfConnectingIP;
    }
    
    // Fallback to a generic identifier
    return req.headers.get('user-agent') || 'unknown';
  }

  async isAllowed(req: NextRequest): Promise<{
    allowed: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
  }> {
    const key = this.config.keyGenerator!(req);
    const now = Date.now();

    // Get or create entry
    let entry = store[key];
    if (!entry || entry.resetTime < now) {
      entry = {
        count: 0,
        resetTime: now + this.config.windowMs,
      };
      store[key] = entry;
    }

    // Check if request is allowed
    const allowed = entry.count < this.config.maxRequests;
    
    if (allowed) {
      entry.count++;
    }

    return {
      allowed,
      limit: this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - entry.count),
      resetTime: entry.resetTime,
    };
  }

  async recordRequest(req: NextRequest, success: boolean = true): Promise<void> {
    if (
      (success && this.config.skipSuccessfulRequests) ||
      (!success && this.config.skipFailedRequests)
    ) {
      return;
    }

    // Request is already recorded in isAllowed
  }
}

// Predefined rate limiters
export const rateLimiters = {
  // General API rate limiter
  api: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per 15 minutes
  }),

  // Strict rate limiter for authentication endpoints
  auth: new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
  }),

  // Contact form rate limiter
  contact: new RateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 submissions per hour
  }),

  // Upload rate limiter
  upload: new RateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 uploads per hour
  }),

  // Search rate limiter
  search: new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 searches per minute
  }),
};

// Middleware factory for rate limiting
export function createRateLimitMiddleware(limiter: RateLimiter) {
  return async (req: NextRequest) => {
    const result = await limiter.isAllowed(req);
    
    const headers = new Headers();
    headers.set('X-RateLimit-Limit', result.limit.toString());
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', new Date(result.resetTime).toISOString());

    if (!result.allowed) {
      return new Response('Too Many Requests', {
        status: 429,
        headers,
      });
    }

    return { headers };
  };
}

// Distributed rate limiting for production (Redis-based)
export class DistributedRateLimiter {
  private redis: unknown; // Redis client - replace with proper Redis type
  private config: RateLimitConfig;

  constructor(redisClient: unknown, config: RateLimitConfig) {
    this.redis = redisClient;
    this.config = config;
  }

  async isAllowed(req: NextRequest): Promise<{
    allowed: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
  }> {
    const key = `rate_limit:${this.config.keyGenerator!(req)}`;
    const now = Date.now();
    const window = Math.floor(now / this.config.windowMs);
    const windowKey = `${key}:${window}`;

    try {
      // Use Redis pipeline for atomic operations
      const pipeline = this.redis.pipeline();
      pipeline.incr(windowKey);
      pipeline.expire(windowKey, Math.ceil(this.config.windowMs / 1000));
      
      const results = await pipeline.exec();
      const count = results[0][1];

      const allowed = count <= this.config.maxRequests;
      const resetTime = (window + 1) * this.config.windowMs;

      return {
        allowed,
        limit: this.config.maxRequests,
        remaining: Math.max(0, this.config.maxRequests - count),
        resetTime,
      };
    } catch (error) {
      console.error('Redis rate limiting error:', error);
      // Fallback to allowing the request if Redis is down
      return {
        allowed: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs,
      };
    }
  }
}

// Sliding window rate limiter
export class SlidingWindowRateLimiter {
  private config: RateLimitConfig;
  private requests: Map<string, number[]> = new Map();

  constructor(config: RateLimitConfig) {
    this.config = config;
    
    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60 * 1000);
  }

  private cleanup() {
    const cutoff = Date.now() - this.config.windowMs;
    this.requests.forEach((timestamps, key) => {
      const filtered = timestamps.filter(time => time > cutoff);
      if (filtered.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, filtered);
      }
    });
  }

  async isAllowed(req: NextRequest): Promise<{
    allowed: boolean;
    limit: number;
    remaining: number;
    resetTime: number;
  }> {
    const key = this.config.keyGenerator!(req);
    const now = Date.now();
    const cutoff = now - this.config.windowMs;

    // Get existing requests
    let requests = this.requests.get(key) || [];
    
    // Filter out old requests
    requests = requests.filter(time => time > cutoff);
    
    // Check if allowed
    const allowed = requests.length < this.config.maxRequests;
    
    if (allowed) {
      requests.push(now);
      this.requests.set(key, requests);
    }

    // Calculate reset time (when the oldest request expires)
    const oldestRequest = requests[0] || now;
    const resetTime = oldestRequest + this.config.windowMs;

    return {
      allowed,
      limit: this.config.maxRequests,
      remaining: Math.max(0, this.config.maxRequests - requests.length),
      resetTime,
    };
  }
}
