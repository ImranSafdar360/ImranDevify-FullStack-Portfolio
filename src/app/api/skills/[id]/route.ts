import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '../../../../lib/db';
import Skill from '../../../../models/Skill';
import { SkillSchema } from '../../../../lib/validators';
import { authOptions } from '../../../../lib/auth';

// GET /api/skills/[id] - Get single skill
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const skill = await Skill.findById(params.id);
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    console.error('Error fetching skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skill' },
      { status: 500 }
    );
  }
}

// PUT /api/skills/[id] - Update skill
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = SkillSchema.parse(body);

    await connectDB();
    const skill = await Skill.findByIdAndUpdate(
      params.id,
      validatedData,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: skill });
  } catch (error: any) {
    console.error('Error updating skill:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE /api/skills/[id] - Delete skill
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const skill = await Skill.findByIdAndDelete(params.id);
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Skill deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}

