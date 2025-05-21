import { Request, Response } from 'express';
import { Viaje } from '../models/Viaje';
import { viajeSchema } from '../validations/viaje.schema';

export const getViajes = async (_req: Request, res: Response): Promise<void> => {
  const viajes = await Viaje.find();
  res.json(viajes);
};

export const createViaje = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = viajeSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({ message: 'Datos inválidos', errors: error.details.map(e => e.message) });
    return;
  }

  try {
    const viaje = new Viaje(value);
    const saved = await viaje.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el viaje', error: err });
  }
};

export const updateViaje = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = viajeSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({ message: 'Datos inválidos', errors: error.details.map(e => e.message) });
    return;
  }

  try {
    const updated = await Viaje.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updated) {
      res.status(404).json({ message: 'Viaje no encontrado' });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el viaje', error: err });
  }
};

export const deleteViaje = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Viaje.findByIdAndUpdate(req.params.id, { estado: 'Cancelado' }, { new: true });
    if (!updated) {
      res.status(404).json({ message: 'Viaje no encontrado' });
      return;
    }
    res.json({ message: 'Viaje cancelado', viaje: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error al cancelar el viaje', error: err });
  }
};
