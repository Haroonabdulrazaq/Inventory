import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, min:3, max: 25, required: true },
  model: { type: Number, required: true },
  image: { type: String, required: true },
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

  CarSchema
    .virtual('formatDate')
    .get(function() {
      let myDate = new Date(this.date)
      myDate = myDate.toString().split('GMT')[0];
      return myDate;
    })

export const Car = mongoose.model('Car', CarSchema);


// Ferari https://image.cnbcfm.com/api/v1/image/101242908-front-jpg-[2]r.jpg?v=1386700473&w=630&h=354