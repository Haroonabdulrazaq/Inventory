import { Router } from 'express';
import { catalogController } from '../controllers/catalogController.js';

const router = Router();

router.get('/', catalogController);

export default router;
