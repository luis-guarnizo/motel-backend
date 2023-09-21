import Room from '../models/room.model.js';

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('idService')
        res.json(rooms);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const createRoom = async (req, res) => {
    try {
        const { roomNumber, availability } = req.body;

        const newRoom = new Room({
            roomNumber,
            availability,
        });
        const savedRoom = await newRoom.save();
        res.json(savedRoom);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });
    }
};
export const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" });
    }
};
export const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
};
export const updateRoom = async (req, res) => {
    try {
        console.log(req.body)
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        console.log(room)
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
};