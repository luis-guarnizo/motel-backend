import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    turno: {
        type: String,
        required: false,
    },
    estadoTurno: {
        type: Boolean,
        required: false,
    }
},
{
    timestamps:true,
    
}
);

export default mongoose.model('User', userSchema);