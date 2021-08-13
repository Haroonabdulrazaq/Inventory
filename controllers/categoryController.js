import { body, validationResult } from 'express-validator';
// import async from 'async';
import { Category } from "../models/category.model.js";

const catalogController = (req, res) => {
  res.render('catalog', {title: 'Hello catalog Controller'});
}

const categoryList = (req, res, next) => {
  // res.render('categoryIndex',{text: 'Category Index'})
  Category.find()
    .exec(function(err, category) {
        if (err) { return next(err) }
        res.render('categoryIndex', { title: "All Categories", categories: category })
    })
}

const categoryDetail = (req, res, next) => {
  Category.findById(req.params.id)
  .exec((err, foundCategory)=> {
    if (err) {
      return next(err);
    }
    res.render('categoryDetail', {title: "Category Detail", category: foundCategory });
  })
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

  const category = new Category({
    name: req.body.name,
    description: req.body.description
  })

  if (!errors.isEmpty()) {
    res.render('categoryForm', { title: 'Add Category', category: category, msg: 'An Error Occured', errors: errors.array() });
    return;
  } else {
    Category.findOne({name: req.body.name})
    .exec((err, foundCategory)=> {
      if (err) {
        return next(err);
      }
      if (foundCategory) {
        res.redirect(foundCategory.url)
      } else {
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

const categoryUpdateGet = (req, res, next) => {
  Category.findById(req.params.id)
    .exec((err, foundCategory) => {
      console.log("Found my cat", foundCategory);
      if (err) {
        return next(err);
      }
      res.render('categoryForm', { title: 'Update Category Detail', category: foundCategory });
    })
}

const categoryUpdatePost = (req, res) => {
  res.send('Category Update Post')
}

const categoryDeleteGet = (req, res) => {
    res.send('Category Delete Get')
}

const categoryDeletePost = (req, res) => {
    res.send('Category Delete Post')
}

export { catalogController, categoryList, categoryDetail,
    categoryCreateGet, categoryCreatePost, categoryUpdateGet,
    categoryUpdatePost, categoryDeleteGet, categoryDeletePost };
