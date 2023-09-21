import { Router } from 'express';

import {
    getResumeServiceTurnos,
    getResumeServiceByTurno,
    createResumeServiceTurnos

} from '../controllers/resumeServiceTurnos.controller.js';

import { authRequired } from '../middlewares/validateToken.js';
// import { validateSchema } from '../middlewares/validator.middleware.js';
// import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router();

router.get('/resumeServiceTurnos', authRequired, getResumeServiceTurnos);
router.get('/resumeServicesByTurno', authRequired, getResumeServiceByTurno);
router.post(
    '/resumeServiceTurnos', authRequired, createResumeServiceTurnos
);

export default router;