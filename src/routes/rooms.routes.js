import { Router } from 'express';
//import { authRequired } from '../middlewares/validateToken.js';
import {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom
} from '../controllers/rooms.controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router();

router.get('/rooms', getRooms);
router.get('/rooms/:id', getRoom);
router.post(
    '/rooms', createRoom
);
// router.post(
//     '/tasks',as
//     validateSchema(createTaskSchema), createTask
// );
router.delete('/rooms/:id', deleteRoom);
router.put('/rooms/:id', updateRoom);

export default router;