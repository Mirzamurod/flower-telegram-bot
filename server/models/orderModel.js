import { model, Schema } from 'mongoose'

const orderSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String, required: true },
    flowers: [{ type: Schema.Types.ObjectId, ref: 'Flower', required: true }],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bouquet: { type: Schema.Types.ObjectId, ref: 'Bouquet', required: true },
  },
  { timestamps: true }
)

export default model('Order', orderSchema)
