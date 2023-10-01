
import { Router } from 'express';
import { createSaleAdmin, createSaleReception, createSaleClient, getSale, getSales, updateSale, deleteSale } from '../controllers/sale.controller.js';

const router = Router();

// Ruta para crear una venta
router.post('/sales/admin', createSaleAdmin);
router.post('/sales/reception', createSaleReception);
router.post('/sales/client', createSaleClient);

router.get('/sales', getSales);
router.get('/sales/:id', getSale);
router.delete('/sales/:id', deleteSale);
router.put('/sales/:id', updateSale);

export default router;
