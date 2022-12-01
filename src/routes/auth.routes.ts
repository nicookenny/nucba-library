import { Router } from 'express';
import { AuthController } from '../controllers/Auth.controller';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/validate/:token', AuthController.validateEmail);

export default router;
