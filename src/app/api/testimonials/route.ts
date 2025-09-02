import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '../../../lib/db';
import Testimonial from '../../../models/Testimonial';
import { TestimonialSchema } from '../../../lib/validators';
import { authOptions } from '../../../lib/auth';

// GET /api/testimonials - Get all testimonials
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Create new testimonial
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = TestimonialSchema.parse(body);

    await connectDB();
    const testimonial = await Testimonial.create(validatedData);
    
    return NextResponse.json(
      { success: true, data: testimonial },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}

