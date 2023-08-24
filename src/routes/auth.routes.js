import { Router } from "express";
import { login, logout,  register, profile, verifyToken } from "../controllers/auth.controller.js";
import {authRequired } from "../middlewares/validateToken.js";
const router = Router();
import {validateSchema} from '../middlewares/validator.middleware.js';
import {registerSchema, loginSchema} from '../schemas/auth.schema.js';

router.post('/register', validateSchema(registerSchema),register);
router.post('/login', validateSchema(loginSchema),login);
router.get('/verify', verifyToken);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router;