import { Router } from 'express';
import {
  catalogController,
  categoryList,
  categoryDetail,
  categoryCreateGet,
  categoryCreatePost,
  categoryUpdateGet,
  categoryUpdatePost,
  categoryDeleteGet, categoryDeletePost } from '../controllers/categoryController.js';

const router = Router();

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



export default router;
