import mongoose, { Schema, type Model } from 'mongoose'
import { OWNERSHIP, type ProjectData } from '@/schemas/project'

// Top-level fields are typed and indexed for queries; blocks are stored as validated JSON.
// The Zod schema (src/schemas/project.ts) is the source of truth and is applied on every write and read.
type ProjectDoc = Omit<ProjectData, 'blocks' | 'cover' | 'seo'> & { blocks: unknown[]; cover?: unknown; seo?: unknown }

const projectDocSchema = new Schema<ProjectDoc>(
  {
    slug: { type: String, required: true, unique: true },
    kind: { type: String, required: true, enum: ['case-study', 'note', 'other'], index: true },
    status: { type: String, required: true, enum: ['draft', 'published'], default: 'draft', index: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    title: { type: String, required: true },
    oneLiner: { type: String, required: true },
    year: { type: String, required: true },
    role: { type: String, required: true },
    context: { type: String, required: true, enum: ['client', 'company', 'freelance', 'personal'] },
    ownership: { type: String, required: true, enum: OWNERSHIP },
    ownershipDetail: String,
    platform: String,
    stack: { type: [String], default: [] },
    cover: Schema.Types.Mixed,
    blocks: { type: [Schema.Types.Mixed], default: [] },
    seo: Schema.Types.Mixed,
  },
  { timestamps: true, minimize: false },
)

projectDocSchema.index({ status: 1, featured: 1, order: 1 })

export const ProjectModel: Model<ProjectDoc> =
  (mongoose.models.Project as Model<ProjectDoc> | undefined) ?? mongoose.model<ProjectDoc>('Project', projectDocSchema)
