import {z} from 'zod';

export const createRoomSchema = z.object({
    roomNumber: z.string({
        required_error: 'Title is required',
    }),
    availability: z.boolean({
        required_error: 'description must be a string',
    }),
});