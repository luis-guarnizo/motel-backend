import Service from '../models/service.model.js';
import User from "../models/user.model.js";
import Room from "../models/room.model.js";
import { now } from 'mongoose';

export const getServices = async (req, res) => {
    const services = await Service.find({ user: req.user.payload.id }).populate('roomNumber').populate('user')
    res.json(services);
};
export const getServicesByTurno = async (req, res) => {


    // Buscar el turno del usuario en la base de datos utilizando el ID
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

    const services = await Service.find({
        user: req.user.payload.id, createdAt: {
            $gte: startHour,
            $lt: endHour
        }
    }).populate('roomNumber')
    console.log(services)
    res.json(services);
};
export const createService = async (req, res) => {
    const {
        serviceType,
        roomNumber,
        vehicle,
        guests,
        cost,
        starTime,
        endTime,
        date,
    } = req.body;
    //console.log(req.body)
    let startTimeDate, endTimeDate;

    switch (serviceType) {
        case '1 Hora - $ 12.000':
            // Calcular endTime sumando 4 horas a startTime
            startTimeDate = new Date();
            endTimeDate = new Date(startTimeDate.getTime() + 1 * 60 * 60 * 1000); // Sumar 1 horas en milisegundos
            break;
        case '4 Horas - $ 17.000':
            // Calcular endTime sumando 4 horas a startTime
            startTimeDate = new Date();
            endTimeDate = new Date(startTimeDate.getTime() + 4 * 60 * 60 * 1000); // Sumar 4 horas en milisegundos
            break;
        case '12 Horas - $ 25.000':
            // Calcular endTime sumando 4 horas a startTime
            startTimeDate = new Date();
            endTimeDate = new Date(startTimeDate.getTime() + 12 * 60 * 60 * 1000); // Sumar 12 horas en milisegundos
            break;
        default:
            break;
    }

    const newService = new Service({
        serviceType,
        roomNumber,
        vehicle,
        guests,
        cost,
        starTime: startTimeDate,
        endTime: endTimeDate,
        date,
        user: req.body.user.id
    });

    // Actualizar la disponibilidad de la habitación a false
    await Room.updateOne({ _id: roomNumber }, { $set: { availability: false, idService: newService._id} });
    console.log('new service')
    console.log(newService)
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