import { IViaje } from '../models/Viaje';
import { ViajeRepository } from '../repositories/viaje.repository';

export class ViajeService {
  private repo = new ViajeRepository();

  async listAll(): Promise<IViaje[]> {
    return this.repo.findAll();
  }

  async createViaje(data: Partial<IViaje>): Promise<IViaje> {
    if (data.origen === data.destino) {
      throw new Error('El origen y el destino no pueden ser iguales');
    }
    return this.repo.create(data);
  }

  async updateViaje(id: string, data: Partial<IViaje>): Promise<IViaje> {
    const updated = await this.repo.update(id, data);
    if (!updated) throw new Error('Viaje no encontrado');
    return updated;
  }

  async cancelViaje(id: string): Promise<IViaje> {
    const canceled = await this.repo.cancel(id);
    if (!canceled) throw new Error('Viaje no encontrado');
    return canceled;
  }
}
