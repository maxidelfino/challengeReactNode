import type { IViaje } from "../models/Viaje";
import { ViajeRepository } from "../repositories/viaje.repository";

export interface ViajeStats {
  total: number;
  enTransito: number;
  finalizados: number;
  cancelados: number;
  totalLitros: number;
  combustibles: Record<string, number>;
}

export class ViajeService {
  private repo = new ViajeRepository();

  async listAll(page?: number, limit?: number, filters?: Record<string, any>) {
    return this.repo.findAll(page, limit, filters);
  }

  async getAllViajes(filters?: Record<string, any>) {
    return this.repo.findAllWithoutPagination(filters);
  }

  async getViajeById(id: string) {
    const viaje = await this.repo.findById(id);
    if (!viaje) throw new Error("Viaje no encontrado");
    return viaje;
  }

  async createViaje(data: Partial<IViaje>) {
    if (data.origen === data.destino)
      throw new Error("El origen y el destino no pueden ser iguales");
    return this.repo.create(data);
  }

  async updateViaje(id: string, data: Partial<IViaje>) {
    const updated = await this.repo.update(id, data);
    if (!updated) throw new Error("Viaje no encontrado");
    return updated;
  }

  async cancelViaje(id: string) {
    const canceled = await this.repo.cancel(id);
    if (!canceled) throw new Error("Viaje no encontrado");
    return canceled;
  }

  async getViajesStats(): Promise<ViajeStats> {
    const viajes = await this.repo.findAllWithoutPagination();
    const stats: ViajeStats = {
      total: viajes.length,
      enTransito: viajes.filter((v) => v.estado === "En tránsito").length,
      finalizados: viajes.filter((v) => v.estado === "Finalizado").length,
      cancelados: viajes.filter((v) => v.estado === "Cancelado").length,
      totalLitros: viajes.reduce((sum, v) => sum + v.cantidad_litros, 0),
      combustibles: {},
    };
    viajes.forEach((v) => {
      stats.combustibles[v.combustible] =
        (stats.combustibles[v.combustible] || 0) + 1;
    });
    return stats;
  }
}
