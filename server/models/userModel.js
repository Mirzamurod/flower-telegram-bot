import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    image: { type: String },
    role: { type: String, enum: ['admin', 'client'], default: 'admin' },
    block: { type: Boolean, default: true },
    telegramToken: { type: String },
    telegramId: { type: String },
  },
  { timestamps: true }
)

export default model('User', userSchema)
