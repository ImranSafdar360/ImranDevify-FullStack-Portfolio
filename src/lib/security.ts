import DOMPurify from 'dompurify';
import validator from 'validator';

// Content Security Policy configuration
export const getCSPHeader = (nonce?: string) => {
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-eval' ${nonce ? `'nonce-${nonce}'` : "'unsafe-inline'"} https://www.googletagmanager.com https://www.google-analytics.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-analytics.com",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ];

  return cspDirectives.join('; ');
};

// Security headers configuration
export const securityHeaders = [
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: getCSPHeader(),
  },
  // Prevent XSS attacks
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Referrer policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Permissions policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()',
  },
  // HSTS (only for HTTPS)
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // Cross-Origin policies
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
];

// Input sanitization utilities
export const sanitizeInput = {
  // Sanitize HTML content
  html: (input: string): string => {
    if (typeof window !== 'undefined') {
      return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
      });
    }
    return input; // Server-side fallback
  },

  // Sanitize plain text
  text: (input: string): string => {
    return validator.escape(input.trim());
  },

  // Sanitize email
  email: (input: string): string | null => {
    const email = input.trim().toLowerCase();
    return validator.isEmail(email) ? email : null;
  },

  // Sanitize URL
  url: (input: string): string | null => {
    const url = input.trim();
    if (validator.isURL(url, { protocols: ['http', 'https'] })) {
      return url;
    }
    return null;
  },

  // Sanitize phone number
  phone: (input: string): string | null => {
    const phone = input.replace(/\D/g, ''); // Remove non-digits
    return validator.isMobilePhone(phone) ? phone : null;
  },

  // Sanitize and validate JSON
  json: (input: string): unknown | null => {
    try {
      const parsed = JSON.parse(input);
      return parsed;
    } catch {
      return null;
    }
  },

  // Remove potential SQL injection patterns
  sqlSafe: (input: string): string => {
    return input
      .replace(/['"\\;]/g, '') // Remove quotes, backslashes, semicolons
      .replace(/\b(DROP|DELETE|INSERT|UPDATE|SELECT|UNION|ALTER|CREATE)\b/gi, '') // Remove SQL keywords
      .trim();
  },

  // XSS prevention
  xssSafe: (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/style\s*=/gi, ''); // Remove inline styles
  },
};

// Validation utilities
export const validate = {
  // Email validation
  email: (email: string): boolean => {
    return validator.isEmail(email);
  },

  // Password strength validation
  password: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // URL validation
  url: (url: string): boolean => {
    return validator.isURL(url, { protocols: ['http', 'https'] });
  },

  // Phone number validation
  phone: (phone: string): boolean => {
    return validator.isMobilePhone(phone);
  },

  // File type validation
  fileType: (filename: string, allowedTypes: string[]): boolean => {
    const extension = filename.split('.').pop()?.toLowerCase();
    return extension ? allowedTypes.includes(extension) : false;
  },

  // File size validation (in bytes)
  fileSize: (size: number, maxSize: number): boolean => {
    return size <= maxSize;
  },

  // Rate limiting validation
  rateLimit: (requests: number, timeWindow: number, maxRequests: number): boolean => {
    return requests <= maxRequests;
  },
};

// CSRF protection utilities
export const csrfProtection = {
  // Generate CSRF token
  generateToken: (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback for older environments
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },

  // Validate CSRF token
  validateToken: (sessionToken: string, requestToken: string): boolean => {
    return sessionToken === requestToken;
  },
};

// API security utilities
export const apiSecurity = {
  // Check if request is from allowed origin
  isAllowedOrigin: (origin: string, allowedOrigins: string[]): boolean => {
    return allowedOrigins.includes(origin) || allowedOrigins.includes('*');
  },

  // Generate API key
  generateApiKey: (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // Hash sensitive data
  hashData: async (data: string): Promise<string> => {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback for environments without crypto.subtle
    return data; // In production, use a proper hashing library
  },
};

// Content validation for user-generated content
export const contentValidation = {
  // Check for spam patterns
  isSpam: (content: string): boolean => {
    const spamPatterns = [
      /\b(viagra|cialis|casino|poker|lottery|winner|prize|claim|urgent|act now)\b/gi,
      /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, // Credit card patterns
      /\b[A-Z]{2,}\b.*\b[A-Z]{2,}\b.*\b[A-Z]{2,}\b/, // Excessive caps
      /(https?:\/\/[^\s]+){3,}/, // Multiple URLs
    ];
    
    return spamPatterns.some(pattern => pattern.test(content));
  },

  // Check content length
  isValidLength: (content: string, minLength: number, maxLength: number): boolean => {
    return content.length >= minLength && content.length <= maxLength;
  },

  // Check for profanity (basic implementation)
  containsProfanity: (content: string): boolean => {
    const profanityWords = ['spam', 'scam']; // Add more as needed
    const words = content.toLowerCase().split(/\s+/);
    return profanityWords.some(word => words.includes(word));
  },
};

// Security monitoring
export const securityMonitoring = {
  // Log security events
  logSecurityEvent: (event: {
    type: 'rate_limit' | 'csrf_violation' | 'xss_attempt' | 'sql_injection' | 'spam_detected';
    ip: string;
    userAgent: string;
    url: string;
    timestamp: Date;
    details?: Record<string, unknown>;
  }) => {
    console.warn('Security Event:', event);
    
    // In production, send to monitoring service
    // Example: Send to external monitoring service
    /*
    if (process.env.SECURITY_WEBHOOK_URL) {
      fetch(process.env.SECURITY_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(console.error);
    }
    */
  },

  // Check for suspicious activity
  isSuspiciousActivity: (ip: string, requests: number, timeWindow: number): boolean => {
    // More than 100 requests in 1 minute is suspicious
    return requests > 100 && timeWindow < 60000;
  },
};
