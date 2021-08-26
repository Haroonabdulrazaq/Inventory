import { body, validationResult } from 'express-validator';
import async from 'async';
import { Category } from "../models/category.model.js";
import { Car } from "../models/car.model.js";

const catalogController = (req, res, next) => {
  Category.find()
    .exec(function(err, categories) {
      if (err) { return next(err) }
      res.render('catalog', { title: "Available Categories", categories: categories })
    })
}

const categoryList = (req, res, next) => {
  Category.find()
    .exec(function(err, category) {
        if (err) { return next(err) }
        res.render('categoryIndex', { title: "All Categories", categories: category.reverse() })
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

const categoryCreatePost = (req, res, next) => {
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

const categoryCarListGet =(req, res) => {
  Car.find({ category: req.params.id })
    .populate('category')
    .exec((err, foundCars) => {
      if (err) {
        throw new err;
      }
      res.render('categoryCarList', { title: 'All cars in this Category', cars: foundCars })
    })
}

const categoryUpdateGet = (req, res, next) => {
  Category.findById(req.params.id)
    .exec((err, foundCategory) => {
      if (err) {
        return next(err);
      }
      res.render('categoryForm', { title: 'Update Category', category: foundCategory });
    })
}

const categoryUpdatePost = (req, res, next) => {
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

  const errors = validationResult(req);

  const category = new Category ({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description
  })

  if (!errors.isEmpty()) {
    res.render('categoryForm', { title: 'Update Category', category, errors: errors.array() });
    return;
  }

  Category.findByIdAndUpdate(req.params.id, category, {}, (err, foundCategory) => {
      if (err) { return next(err) }
      res.redirect(foundCategory.url)
  })
}

const categoryDeleteGet = (req, res, next) => {
  async.parallel({
    category: (callback) => {
      Category.findById(req.params.id)
      .exec(callback)
    },
    categoryCars: (callback) => {
      Car.find({ category: req.params.id })
      .exec(callback)
    }
  }, (err, results) => {
      if (err) { return next(err) }
      res.render('categoryDelete', { title: 'Delete Category', category: results.category, categoryCars: results.categoryCars })
  })
}

const categoryDeletePost = (req, res, next) => {
    // res.send('Category Delete Post')
    Category.findByIdAndDelete(req.params.id)
      .exec((err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/catalog/categories')
      })
}

export { catalogController, categoryList, categoryDetail,
    categoryCreateGet, categoryCreatePost, categoryCarListGet,
    categoryUpdateGet, categoryUpdatePost, categoryDeleteGet, categoryDeletePost };
