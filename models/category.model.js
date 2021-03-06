import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// const CATEGORY = 'https://p.kindpng.com/picc/s/113-1136446_tesla-logo-png-tesla-logo-transparent-png.png';

const categorySchema = new Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
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

  categorySchema
  .virtual('formatDescription')
  .get(function() {
    const myDescription = this.description.split(' ')
    if (myDescription.length > 20 ) {
      const myArray = []
      myDescription.map((ele, i) => { if (i <= 20) { myArray.push(ele) }})
      return myArray.join(' ')+ '...'
    } else {
      return this.description
    }
  })
export const Category = mongoose.model('Category', categorySchema);
