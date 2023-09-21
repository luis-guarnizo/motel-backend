import { Router } from 'express';

import {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/products.controller.js';

import { authRequired } from '../middlewares/validateToken.js';
// import { validateSchema } from '../middlewares/validator.middleware.js';
// import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post(
    '/products', createProduct
);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

export default router;