import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} from '../controllers/tasks.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post(
    '/tasks', 
    authRequired, 
    validateSchema(createTaskSchema), createTask
);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, updateTask);

/* router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.post(
    '/tasks',validateSchema(createTaskSchema), createTask
);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);
 */
export default router;