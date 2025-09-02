import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '../../../lib/db';
import Contact from '../../../models/Contact';
import { ContactSchema } from '../../../lib/validators';
import { authOptions } from '../../../lib/auth';

// GET /api/contact - Get all contact messages (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}

// POST /api/contact - Create new contact message (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ContactSchema.parse(body);

    await connectDB();
    const contact = await Contact.create(validatedData);
    
    return NextResponse.json(
      { success: true, data: contact, message: 'Message sent successfully!' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating contact:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

