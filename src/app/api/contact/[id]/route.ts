import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '../../../../lib/db';
import Contact from '../../../../models/Contact';
import { authOptions } from '../../../../lib/auth';

// PUT /api/contact/[id] - Mark message as read
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

    await connectDB();
    const contact = await Contact.findByIdAndUpdate(
      params.id,
      { isRead: true },
      { new: true }
    );
    
    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact message' },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete contact message
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
    const contact = await Contact.findByIdAndDelete(params.id);
    
    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Contact message not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Contact message deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact message' },
      { status: 500 }
    );
  }
}

