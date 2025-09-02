import { z } from 'zod';

// User validation
export const UserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'user']).default('user'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Project validation
export const ProjectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  techStack: z.array(z.string()).min(1, 'At least one technology is required'),
  githubUrl: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Invalid live URL').optional().or(z.literal('')),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

// Skill validation
export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
  category: z.enum(['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other']),
  iconUrl: z.string().url('Invalid icon URL').optional().or(z.literal('')),
});

// About validation
export const AboutSchema = z.object({
  bio: z.string().min(1, 'Bio is required'),
  experience: z.string().min(1, 'Experience is required'),
  cvUrl: z.string().url('Invalid CV URL').optional().or(z.literal('')),
  profileImageUrl: z.string().url('Invalid profile image URL').optional().or(z.literal('')),
  socialLinks: z.object({
    github: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
    twitter: z.string().url('Invalid Twitter URL').optional().or(z.literal('')),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  }).optional(),
});

// Testimonial validation
export const TestimonialSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientRole: z.string().min(1, 'Client role is required'),
  clientCompany: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  rating: z.number().min(1).max(5).default(5),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

// Contact validation
export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

// Export types
export type User = z.infer<typeof UserSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type About = z.infer<typeof AboutSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type Contact = z.infer<typeof ContactSchema>;

