import mongoose, { Schema, type Model } from 'mongoose'
import { PAGES } from '@/schemas/section'

// Section placement is typed and indexed; content is validated JSON (src/schemas/section.ts is the source of truth).
type SectionDoc = { page: string; key: string; type: string; order: number; visible: boolean; content: unknown }

const sectionDocSchema = new Schema<SectionDoc>(
  {
    page: { type: String, required: true, enum: PAGES },
    key: { type: String, required: true },
    type: { type: String, required: true },
    order: { type: Number, default: 0 },
    visible: { type: Boolean, default: true },
    content: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true, minimize: false },
)

sectionDocSchema.index({ page: 1, key: 1 }, { unique: true })
sectionDocSchema.index({ page: 1, visible: 1, order: 1 })

export const SectionModel: Model<SectionDoc> =
  (mongoose.models.Section as Model<SectionDoc> | undefined) ?? mongoose.model<SectionDoc>('Section', sectionDocSchema)
