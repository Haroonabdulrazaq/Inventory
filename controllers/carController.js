// import Car from '../models/car.model.js';
// import multer from 'multer';

// const upload = multer({ dest: 'uploads/' })

const carList = (req, res) => {
  res.send('Car List');
};

const carDetail = (req, res) => {
  res.send('Car Detail');
};

const carCreateGet = (req, res) => {
  res.render('carForm', {title: 'Create a Car'});
};

const carCreatePost = (req, res) => {
  res.send('Car Create Post');
};

const carUpdateGet = (req, res) => {
  res.send('Car Update Get');
};

const carUpdatePost = (req, res) => {
  res.send('Car Update Post');
};

const carDeleteGet = (req, res) => {
  res.send('Car Delete Get');
};

const carDeletePost = (req, res) => {
  res.send('Car Delete Post');
};

export {
  carList,
  carDetail,
  carCreateGet,
  carCreatePost,
  carUpdateGet,
  carUpdatePost,
  carDeleteGet, carDeletePost };