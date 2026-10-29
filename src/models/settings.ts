import mongoose, { Schema, type Model } from 'mongoose'

// Single-document collection keyed by "site". The value is validated by the Zod schema (src/schemas/settings.ts),
// which is the one source of truth for its shape.
type SettingsDoc = { key: 'site'; value: unknown; updatedAt: Date; createdAt: Date }

const settingsDocSchema = new Schema<SettingsDoc>(
  {
    key: { type: String, required: true, unique: true, enum: ['site'] },
    value: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: true, minimize: false },
)

export const SettingsModel: Model<SettingsDoc> =
  (mongoose.models.Settings as Model<SettingsDoc> | undefined) ?? mongoose.model<SettingsDoc>('Settings', settingsDocSchema)
