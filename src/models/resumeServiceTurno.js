import mongoose from 'mongoose';

const resumeServiceTurnoSchema = new mongoose.Schema({
    nombreRecepcionista:{
        type: String,
        required: true,
    },
    turno: {
        type: String,
        required: true,
    },
    totalSoftware: {
        type: Number,
        required: true,
    },

    totalRecepcionista: {
        type: Number,
        required: true,
    },
    diferencia: {
        type: Number,
        required: true,
    },
    totalFinal: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
},{
    timestamps: true
});
export default mongoose.model('ResumeServiceTurno', resumeServiceTurnoSchema);