import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    serviceType: {
        type:String,
        required: true,
    },
    roomNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    vehicle: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    starTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        default: Date.now,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{
    timestamps: true
});
export default mongoose.model('Service', serviceSchema);