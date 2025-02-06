import { model, Schema } from 'mongoose'

const customerSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    flowers: [{ type: Schema.Types.ObjectId, ref: 'Flower' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    bouquet: { type: Schema.Types.ObjectId, ref: 'Bouquet' },
  },
  { timestamps: true }
)

export default model('Customer', customerSchema)
