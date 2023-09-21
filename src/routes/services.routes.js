import { Router } from 'express';

import {
    getServices,
    getServicesByTurno,
    getService,
    createService,
    deleteService,
    updateService
} from '../controllers/services.controller.js';

import { authRequired } from '../middlewares/validateToken.js';
// import { validateSchema } from '../middlewares/validator.middleware.js';
// import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router();

router.get('/services', authRequired, getServices);
router.get('/servicesByTurno', authRequired, getServicesByTurno);
router.get('/services/:id', authRequired, getService);
router.post(
    '/services',authRequired, createService
);
router.delete('/services/:id', authRequired, deleteService);
router.put('/services/:id', authRequired, updateService);

export default router;