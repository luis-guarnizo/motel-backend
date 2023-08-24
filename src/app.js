import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from './routes/tasks.routes.js';
import roomRoutes from './routes/rooms.routes.js';
import serviceRoutes from './routes/services.routes.js';


const app = express();

//middlewares
app.use(cors({
    //origin: 'http://127.0.0.1:5173',
    origin: true,
    credentials: true,

}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//
/* app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With,' +
        'Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); */

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api', roomRoutes);
app.use('/api', serviceRoutes);

export default app;