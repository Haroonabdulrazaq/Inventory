import async from 'async';
import { Car } from '../models/car.model.js';
import { body, validationResult } from "express-validator";
import { Category } from '../models/category.model.js';

const carCheckout = (req, res) => {
  res.render('carCheckout', { title: "Checkout Form" })
};
const carList = (req, res, next) => {
  Car.find({})
  .populate('category')
    .exec((err, foundCars) => {
      if (err) {
        return next(err);
      }
      res.render('categoryCarList', { title: 'All Cars', cars: foundCars.reverse() });
    })
};

const carDetail = (req, res, next) => {
  Car.findById(req.params.id)
    .populate('category')
    .exec((err, foundCar) => {
      if (err) { return next(err) }
      res.render('carDetail', { title: 'Car Detail', car: foundCar });
    })
};

const carCreateGet = (req, res, next) => {
  Category.find({}, '_id name')
    .exec((err, categories) => {
      console.log(categories)
      if (err) { 
        return next(err)
      } else {
        res.render('carForm', {title: 'Add a Car', categories });
      }
    })
};

const carCreatePost = (req, res, next) => {
  body('name')
    .isLength({min: 3, max: 25}).withMessage('Name should be greater than 3 and lass than 25')
    .trim()
    .escape().required
  body('description')
    .isLength({min: 10, max: 255}).withMessage('Name should be greater than 3 and lass than 25')
    .trim()
    .escape().required
  body('model').required
  body('price').required
  body('numberInStock').required

    const errors = validationResult(req);

    const car = new Car({
      name: req.body.name,
      model: req.body.model,
      price: req.body.price,
      numberInStock: req.body.numberInStock,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
    });

    if (!errors.isEmpty()) {
      res.render('CarForm', {title: 'Create Car' , car: car, errors: errors.array() });
      return;
    } else {
      Car.findOne({ name: req.body.name })
        .exec((err, foundCar) => {
          if (err) {
            return next(err);
          }
          if (foundCar) {
            res.redirect(foundCar.url);
            return;
          } else {
            car.save((err) => {
              if (err) { return next(err) }
              res.redirect(car.url);
            })
          }
        })
    }

};

const carUpdateGet = (req, res, next) => {
  async.parallel ({
    car: (callback) => {
          Car.findById(req.params.id)
             .exec(callback)
    },
    categories: (callback) => {
        Category.find({}, '_id name')
          .exec(callback)
    }
  }, (err, results) => {
    if (err) { return next(err) }
    res.render('carForm', {title: 'Update Car Detail', car: results.car, categories: results.categories });
  })
};

const carUpdatePost = (req, res, next) => {
  body('name')
    .isLength({min: 3, max: 25}).withMessage('Name should be greater than 3 and lass than 25')
    .trim()
    .escape().required
  body('description')
    .isLength({min: 10, max: 255}).withMessage('Name should be greater than 3 and lass than 25')
    .trim()
    .escape().required
  body('model').required
  body('price').required
  body('numberInStock').required

  const errors = validationResult(req);

  const car = new Car ({
    _id: req.params.id,
    name: req.body.name,
    model: req.body.model,
    price: req.body.price,
    numberInStock: req.body.numberInStock,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
  })

  if (!errors.isEmpty()) {
    res.render('carForm', { title: 'Update Car', car, errors: errors.array() });
    return;
  }

  Car.findByIdAndUpdate(req.params.id, car, {}, (err, foundCar) => {
    console.log('I reach here', foundCar)
    if (err) { return next(err) }
    res.redirect(foundCar.url)
  })
};

// const carDeleteGet = (req, res) => {
//   res.send('Car Delete Get');
// };

const carDeletePost = (req, res, next) => {
  Car.findByIdAndDelete(req.params.id)
    .exec((err) => {
      if (err) {
        return next(err)
      }
      res.redirect('/catalog/cars')
    })

};

export {
  carList,
  carDetail,
  carCreateGet,
  carCreatePost,
  carUpdateGet,
  carUpdatePost,
  carCheckout,
  carDeletePost };