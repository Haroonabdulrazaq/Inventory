import { body, validationResult } from 'express-validator';
// import async from 'async';
import { Category } from "../models/category.model.js";

const catalogController = (req, res) => {
  res.render('catalog', {title: 'Hello catalog Controller'});
}

const categoryList = (req, res) => {
  res.render('categoryIndex',{text: 'Category Index'})
}

const categoryDetail = (req, res) => {
  res.render('categoryDetail', {title: "Category Detail"});
}

const categoryCreateGet = (req, res) => {
  res.render('categoryForm', {title:'Add Category'})
}

// const categoryCreatePost = (req, res) => {
//   res.send('Testing Category Post');
// }

// eslint-disable-next-line no-unused-vars
const categoryCreatePost = (req, res, next) => {
  console.log(req.body),
  body('name')
  .isLength({ min: 3, max: 20 })
  .trim()
  .escape()
  .required
  body('description')
  .isLength({ min: 10, max: 255 })
  .trim()
  .escape()
  .required

  console.log("I am in here anonymous function");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render('categoryForm', { title: 'Add Category', msg: 'An Error Occured', errors: errors.array() });
    return;
  } else {
    console.log("I am searching if it already exist");
    Category.findOne({name: req.body.name})
    .exec((err, foundCategory)=> {
      if (err) {
        return next(err);
      }
      if (foundCategory) {
        console.log("Nope It exist");
        res.redirect(foundCategory.url)
      } else {
        console.log("I am saving right now");
        const category = new Category({
          name: req.body.name,
          description: req.body.description
        })
        category.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect(category.url);
        })
      }
    })
  }

}

const categoryDeleteGet = (req, res) => {
    res.send('Category Delete Get')
}

const categoryDeletePost = (req, res) => {
    res.send('Category Delete Post')
}

const categoryUpdateGet = (req, res) => {
    res.send('Category Update Get')
}

const categoryUpdatePost = (req, res) => {
    res.send('Category Update Post')
}

export { catalogController, categoryList, categoryDetail,
    categoryCreateGet, categoryCreatePost, categoryUpdateGet,
    categoryUpdatePost, categoryDeleteGet, categoryDeletePost };
