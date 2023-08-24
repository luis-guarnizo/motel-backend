import Service from '../models/service.model.js';

export const getServices = async (req, res) => {
    const services = await Service.find().populate('roomNumber')
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

    const newService = new Service({
        serviceType, 
        roomNumber, 
        vehicle, 
        guests, 
        cost, 
        starTime, 
        endTime, 
        date, 
    });
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
    if ( !service) return res.status(404).json({ message: 'Service not found' });
    return res.sendStatus(204);
};
export const updateService = async (req, res) => {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
};