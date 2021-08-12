import { Router } from 'express';
import multer from 'multer';
import {
  catalogController,
  categoryList,
  categoryDetail,
  categoryCreateGet,
  categoryCreatePost,
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
    carDeleteGet, carDeletePost } from '../controllers/carController.js';

const router = Router();
const upload = multer({ dest: 'uploads/' })

router.get('/', catalogController);

//  Category Routes
router.get('/categories', categoryList);

router.get('/category/create', categoryCreateGet);
router.post('/category/create', categoryCreatePost);

router.get('/category/:id/update', categoryUpdateGet);
router.post('/category/:id/update', categoryUpdatePost);

router.get('/category/:id/delete', categoryDeleteGet);
router.post('/category/:id/delete', categoryDeletePost);

router.get('/category/:id', categoryDetail);


//  Car Routes
router.get('/cars', carList);

router.get('/car/create', carCreateGet);
router.post('/car/create',  upload.single('image'), carCreatePost);

router.get('/car/:id/update', carUpdateGet);
router.post('/car/:id/update', carUpdatePost);

router.get('/car/:id/delete', carDeleteGet);
router.post('/car/:id/delete', carDeletePost);

router.get('/car/:id', carDetail);


export default router;
