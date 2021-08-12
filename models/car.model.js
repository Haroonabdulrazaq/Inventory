import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const ItemSchema = new Schema({
  name: { type: String, min:3, max: 25, required: true },
  description: { type: String, min:10, max: 255, required: true },
  category:  {type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: mongoose.Decimal128, default: 0.00 },
  numberInStock: { type: Number , required: true },
  date: { type: Date, default: Date.now }
});

ItemSchema
  .virtual('url')
  .get(function() {
    return '/catalog/item/'+this._id
  });

export const Item = mongoose.model('Item', ItemSchema);
