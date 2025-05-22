import { Request, Response } from 'express';
import { ViajeService } from '../services/viaje.service';
import { viajeSchema } from '../validations/viaje.schema';

const service = new ViajeService();

export const getViajes = async (_req: Request, res: Response) => {
  const viajes = await service.listAll();
  res.json(viajes);
};

export const createViaje = async (req: Request, res: Response) => {
  const { error, value } = viajeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ message: 'Datos inválidos', errors: error.details.map(e => e.message) });
  }
  try {
    const newViaje = await service.createViaje(value);
    res.status(201).json(newViaje);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateViaje = async (req: Request, res: Response) => {
  const { error, value } = viajeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).json({ message: 'Datos inválidos', errors: error.details.map(e => e.message) });
  }
  try {
    const updatedViaje = await service.updateViaje(req.params.id, value);
    res.json(updatedViaje);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteViaje = async (req: Request, res: Response) => {
  try {
    const canceled = await service.cancelViaje(req.params.id);
    res.json({ message: 'Viaje cancelado', viaje: canceled });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
