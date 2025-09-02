import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
  bio: string;
  experience: string;
  cvUrl?: string;
  profileImageUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AboutSchema = new Schema<IAbout>({
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    trim: true,
  },
  cvUrl: {
    type: String,
    trim: true,
  },
  profileImageUrl: {
    type: String,
    trim: true,
  },
  socialLinks: {
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
  },
}, {
  timestamps: true,
});

export default mongoose.models.About || mongoose.model<IAbout>('About', AboutSchema);

