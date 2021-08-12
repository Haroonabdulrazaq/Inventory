import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, min:3, max: 25, required: true },
  model: { type: Number, required: true },
  image: { type: String, default: 'Toyota-Venza' },
  description: { type: String, min:10, max: 255, required: true },
  category:  {type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: mongoose.Decimal128, default: 0.00 },
  numberInStock: { type: Number , required: true },
  date: { type: Date, default: Date.now }
});

CarSchema
  .virtual('url')
  .get(function() {
    return '/catalog/car/'+this._id
  });

export const Car = mongoose.model('Car', CarSchema);
