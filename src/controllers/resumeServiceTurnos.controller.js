import ResumeServiceTurno from '../models/resumeServiceTurno.js';
import User from "../models/user.model.js";
import Room from "../models/room.model.js";
import { now } from 'mongoose';

export const getResumeServiceTurnos = async (req, res) => {
    const resumeServiceTurnos = await ResumeServiceTurno.find().populate('user');
    res.json(resumeServiceTurnos);
};
export const getResumeServiceByTurno = async (req, res) => {

    // Buscar el turno del usuario en la base de datos utilizando el ID
    console.log('req by turno service');
    //console.log(req);
    const usuario = await User.findById(req.user.payload.id);

    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    // Buscar documentos en un rango de horas
    // Calcular las horas límite (6 AM y 2 PM)
    const now = new Date();
    let startHour, endHour;
    switch (usuario.turno) {
        case '1':
            startHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0).toISOString();
            endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0).toISOString();
            break;
        case '2':
            startHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0).toISOString();
            endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0).toISOString();
            break;
        case '3':
            startHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0).toISOString();
            endHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 0).toISOString();
            break;
        
        default:
            break;
    }

    const resumeserviceTurnos = await ResumeServiceTurno.find({
        user: req.user.payload.id, createdAt: {
            $gte: startHour,
            $lt: endHour
        }
    }).populate('user')
    console.log(resumeserviceTurnos)
    res.json(resumeserviceTurnos);
};
export const createResumeServiceTurnos = async (req, res) => {
    const {
        nombreRecepcionista,
        turno,
        totalSoftware,
        totalRecepcionista,
        diferencia,
        totalFinal
    } = req.body;
    console.log(req.user.payload)
    let userId = req.user.payload.id;
    const userFound = await User.findById(userId);
    console.log(userFound.username);
    
    const newService = new ResumeServiceTurno({
        nombreRecepcionista: userFound.username,
        turno: userFound.turno,
        totalSoftware,
        totalRecepcionista,
        diferencia,
        totalFinal,
        //TODO:cambiar para postman por req.user.payload.id y para la app por req.body.user.id
        user: req.user.payload.id
        // user: req.body.user.id
    });

   
    console.log('new service')
    //console.log(newService)
    const savedService = await newService.save();
    res.json(savedService);
};
export const getService = async (req, res) => {
    const Service = await Service.findById(req.params.id);
    if (!Service) return res.status(404).json({ message: 'Service not found' });
    res.json(Service);
};
export const deleteService = async (req, res) => {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    return res.sendStatus(204);
};
export const updateService = async (req, res) => {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
};