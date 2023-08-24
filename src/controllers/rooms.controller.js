import Room from '../models/room.model.js';

export const getRooms = async (req, res) => {
    const rooms = await Room.find()
    res.json(rooms);
};
export const createRoom = async (req, res) => {
    const { roomNumber, availability } = req.body;

    const newRoom = new Room({
        roomNumber,
        availability,
    });
    const savedRoom = await newRoom.save();
    res.json(savedRoom);
};
export const getRoom = async (req, res) => { 
    const room = await Room.findById(req.params.id);
    if(!room) return res.status(404).json({message: 'Room not found'});
    res.json(room);
};
export const deleteRoom = async (req, res) => {
    const room = await Room.findByIdAndDelete(req.params.id);
    if(!room) return res.status(404).json({message: 'Room not found'});
    return res.sendStatus(204);
 };
export const updateRoom = async (req, res) => { 
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if(!room) return res.status(404).json({message: 'Room not found'});
    res.json(room);
};