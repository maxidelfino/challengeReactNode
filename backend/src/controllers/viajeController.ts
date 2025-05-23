import type { Request, Response } from "express";
import { ViajeService } from "../services/viaje.service";
import { viajeSchema } from "../validations/viaje.schema";

const service = new ViajeService();

export const getViajes = async (req: Request, res: Response) => {
  const page = req.query.page ? Number.parseInt(req.query.page as string) : 1;
  const limit = req.query.limit
    ? Number.parseInt(req.query.limit as string)
    : 10;

  const filters: Record<string, any> = {};

  if (req.query.conductor) {
    filters.conductor = { $regex: req.query.conductor, $options: "i" };
  }

  if (req.query.combustible) {
    filters.combustible = req.query.combustible;
  }

  if (req.query.estado) {
    filters.estado = req.query.estado;
  }

  const result = await service.listAll(page, limit, filters);
  res.json(result);
};

// Agregar esta nueva función después de getViajes
export const getAllViajes = async (req: Request, res: Response) => {
  try {
    const filters: Record<string, any> = {};

    if (req.query.conductor) {
      filters.conductor = { $regex: req.query.conductor, $options: "i" };
    }

    if (req.query.combustible) {
      filters.combustible = req.query.combustible;
    }

    if (req.query.estado) {
      filters.estado = req.query.estado;
    }

    const viajes = await service.getAllViajes(filters);
    res.json(viajes);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createViaje = async (req: Request, res: Response) => {
  const { error, value } = viajeSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({
      message: "Datos inválidos",
      errors: error.details.map((e) => e.message),
    });
  }
  try {
    const newViaje = await service.createViaje(value);
    res.status(201).json(newViaje);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateViaje = async (req: Request, res: Response) => {
  const { error, value } = viajeSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({
      message: "Datos inválidos",
      errors: error.details.map((e) => e.message),
    });
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
    res.json({ message: "Viaje cancelado", viaje: canceled });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getViajeById = async (req: Request, res: Response) => {
  try {
    const viaje = await service.getViajeById(req.params.id);
    if (!viaje) {
      res.status(404).json({ message: "Viaje no encontrado" });
    }
    res.json(viaje);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getViajesStats = async (_req: Request, res: Response) => {
  try {
    const stats = await service.getViajesStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
