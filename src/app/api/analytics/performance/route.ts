import { NextRequest, NextResponse } from 'next/server';
import { PerformanceData } from '@/lib/performance';

export async function POST(request: NextRequest) {
  try {
    const data: PerformanceData = await request.json();
    
    // Validate the data
    if (!data.metric || !data.metric.name || typeof data.metric.value !== 'number') {
      return NextResponse.json({ error: 'Invalid performance data' }, { status: 400 });
    }

    // Here you can:
    // 1. Store in database for analytics
    // 2. Send to external analytics service
    // 3. Log for monitoring
    
    console.log('Performance Metric:', {
      name: data.metric.name,
      value: data.metric.value,
      rating: data.rating,
      url: data.url,
      timestamp: new Date(data.timestamp).toISOString(),
    });

    // Example: Store in database (uncomment when you have a database setup)
    /*
    await db.collection('performance_metrics').add({
      metricName: data.metric.name,
      metricValue: data.metric.value,
      rating: data.rating,
      url: data.url,
      userAgent: data.userAgent,
      timestamp: new Date(data.timestamp),
    });
    */

    // Example: Send to external service
    /*
    if (process.env.ANALYTICS_WEBHOOK_URL) {
      await fetch(process.env.ANALYTICS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing performance data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
