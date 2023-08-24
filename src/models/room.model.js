import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: {
        type: Number,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
    },
},{
    timestamps: true
});
export default mongoose.model('Room', roomSchema);