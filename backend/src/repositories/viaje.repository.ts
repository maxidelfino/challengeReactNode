import { type IViaje, Viaje } from "../models/Viaje";

export class ViajeRepository {
  async findAll(
    page = 1,
    limit = 10,
    filters: { conductor?: string; combustible?: string; estado?: string } = {}
  ): Promise<{ viajes: IViaje[]; total: number; pages: number }> {
    const query: Record<string, any> = {};
    if (filters.conductor) {
      query.conductor = { $regex: filters.conductor, $options: "i" };
    }
    if (filters.combustible) {
      query.combustible = filters.combustible;
    }
    if (filters.estado) {
      query.estado = filters.estado;
    }

    const total = await Viaje.countDocuments(query);

    const skip = (page - 1) * limit;
    const pages = Math.ceil(total / limit);

    const viajes = await Viaje.find(query).skip(skip).limit(limit).exec();

    return { viajes, total, pages };
  }

  async findAllWithoutPagination(): Promise<IViaje[]> {
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
    return Viaje.findByIdAndUpdate(
      id,
      { estado: "Cancelado" },
      { new: true }
    ).exec();
  }
}
