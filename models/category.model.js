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

export const Category = mongoose.model('Category', categorySchema);
