
import { Router } from 'express';
import { createSale }  from '../controllers/sale.controller.js';

const router = Router();

// Ruta para crear una venta
router.post('/sales', createSale);

export default router;
