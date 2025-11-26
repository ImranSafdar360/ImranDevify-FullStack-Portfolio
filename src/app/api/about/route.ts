import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '../../../lib/db';
import About from '../../../models/About';
import { AboutSchema } from '../../../lib/validators';
import { authOptions } from '../../../lib/auth';

// GET /api/about - Get about information
export async function GET() {
  try {
    await connectDB();
    const about = await About.findOne().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    console.error('Error fetching about:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch about information' },
      { status: 500 }
    );
  }
}

// POST /api/about - Create or update about information
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
    const validatedData = AboutSchema.parse(body);

    await connectDB();
    
    // Check if about info already exists
    const existingAbout = await About.findOne();
    
    let about;
    if (existingAbout) {
      // Update existing
      about = await About.findByIdAndUpdate(
        existingAbout._id,
        validatedData,
        { new: true, runValidators: true }
      );
    } else {
      // Create new
      about = await About.create(validatedData);
    }
    
    return NextResponse.json(
      { success: true, data: about },
      { status: existingAbout ? 200 : 201 }
    );
  } catch (error: unknown) {
    const err = error as { name?: string; errors?: unknown };
    console.error('Error saving about:', error);
    
    if (err.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: err.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to save about information' },
      { status: 500 }
    );
  }
}

