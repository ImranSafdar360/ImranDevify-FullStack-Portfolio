import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '../../../lib/db';
import Skill from '../../../models/Skill';
import { SkillSchema } from '../../../lib/validators';
import { authOptions } from '../../../lib/auth';

// GET /api/skills - Get all skills
export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST /api/skills - Create new skill
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
    const validatedData = SkillSchema.parse(body);

    await connectDB();
    const skill = await Skill.create(validatedData);
    
    return NextResponse.json(
      { success: true, data: skill },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating skill:', error);
    const err = error as { name?: string; errors?: unknown };
    
    if (err.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: err.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

