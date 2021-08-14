import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const CAR ='https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'

const CarSchema = new Schema({
  name: { type: String, min:3, max: 25, required: true },
  model: { type: Number, required: true },
  image: { type: String, default: CAR },
  description: { type: String, min:10, max: 255, required: true },
  category:  {type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, default: 0.00 },
  numberInStock: { type: Number , required: true },
  date: { type: Date, default: Date.now }
});

CarSchema
  .virtual('url')
  .get(function() {
    return '/catalog/car/'+this._id
  });

export const Car = mongoose.model('Car', CarSchema);
