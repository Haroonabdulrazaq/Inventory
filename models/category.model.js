import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {type: String, require: true},
  description: { type: String, require: true, min:3, max: 100 },
  date: { type: Date, default: Date.now },
});

categorySchema
  .virtual('url')
  .get(function() {
    return '/catalog/category/'+ this._id
  });

categorySchema
  .virtual('formatDate')
  .get(function() {
    let myDate = new Date(this.date)
    myDate = myDate.toString().split('GMT')[0];
    return myDate;
  })

export const Category = mongoose.model('Category', categorySchema);
