import { IViaje, Viaje } from '../models/Viaje';

export class ViajeRepository {
  async findAll(): Promise<IViaje[]> {
    return Viaje.find().exec();
  }

  async findById(id: string): Promise<IViaje | null> {
    return Viaje.findById(id).exec();
  }

  async create(data: Partial<IViaje>): Promise<IViaje> {
    const viaje = new Viaje(data);
    return viaje.save();
  }

  async update(id: string, data: Partial<IViaje>): Promise<IViaje | null> {
    return Viaje.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async cancel(id: string): Promise<IViaje | null> {
    return Viaje.findByIdAndUpdate(id, { estado: 'Cancelado' }, { new: true }).exec();
  }
}
