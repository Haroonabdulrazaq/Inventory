import { Router } from 'express';
import { userController } from '../controllers/userController.js';

var router = Router();

/* GET users listing. */
router.get('/', userController);

export default router;
