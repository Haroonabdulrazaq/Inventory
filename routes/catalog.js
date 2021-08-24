import { Router } from 'express';
import {
  catalogController,
  categoryList,
  categoryDetail,
  categoryCreateGet,
  categoryCreatePost,
  categoryCarListGet,
  categoryUpdateGet,
  categoryUpdatePost,
  categoryDeleteGet, categoryDeletePost } from '../controllers/categoryController.js';

  import {
    carList,
    carDetail,
    carCreateGet,
    carCreatePost,
    carUpdateGet,
    carUpdatePost,
    carDeletePost } from '../controllers/carController.js';

const router = Router();

router.get('/', catalogController);

//  Category Routes
router.get('/categories', categoryList);

router.get('/category/create', categoryCreateGet);
router.post('/category/create', categoryCreatePost);

router.get('/category/:id/update', categoryUpdateGet);
router.post('/category/:id/update', categoryUpdatePost);

router.get('/category/:id/cars', categoryCarListGet);

router.get('/category/:id/delete', categoryDeleteGet);
router.post('/category/:id/delete', categoryDeletePost);

router.get('/category/:id', categoryDetail);


//  Car Routes
router.get('/cars', carList);

router.get('/car/create', carCreateGet);
router.post('/car/create', carCreatePost);

router.get('/car/:id/update', carUpdateGet);
router.post('/car/:id/update', carUpdatePost);

// router.get('/car/:id/delete', carDeleteGet);
router.post('/car/:id/delete', carDeletePost);

router.get('/car/:id', carDetail);


export default router;
