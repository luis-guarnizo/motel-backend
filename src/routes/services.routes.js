import { Router } from 'express';

import {
    getServices,
    getService,
    createService,
    deleteService,
    updateService
} from '../controllers/services.controller.js';
// import { validateSchema } from '../middlewares/validator.middleware.js';
// import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router();

router.get('/services', getServices);
router.get('/services/:id', getService);
router.post(
    '/services', createService
);
router.delete('/services/:id', deleteService);
router.put('/services/:id', updateService);

export default router;