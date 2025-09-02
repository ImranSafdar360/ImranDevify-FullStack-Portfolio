import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  clientRole: string;
  clientCompany?: string;
  message: string;
  rating: number;
  imageUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
  },
  clientRole: {
    type: String,
    required: [true, 'Client role is required'],
    trim: true,
  },
  clientCompany: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Testimonial message is required'],
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
    default: 5,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

