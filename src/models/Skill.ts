import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Other';
  iconUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
  },
  level: {
    type: String,
    required: [true, 'Skill level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'],
  },
  iconUrl: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

