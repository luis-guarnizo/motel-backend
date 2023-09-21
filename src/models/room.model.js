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
    idService: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: false
    },
},{
    timestamps: true
});
export default mongoose.model('Room', roomSchema);