import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {type: String, require: true},
  description: { type: String, require: true, min:3, max: 100 }
});

categorySchema
  .virtual('url')
  .get(()=> {
    return '/catalog/category'+ this._id
  });

export const categoryModel = mongoose.model('categoryModel', categorySchema);