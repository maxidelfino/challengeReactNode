import { Schema, model, Document } from 'mongoose';

export interface IViaje extends Document {
  camion: string;
  conductor: string;
  origen: string;
  destino: string;
  combustible: string;
  cantidad_litros: number;
  fecha_salida: Date;
  estado: 'En tránsito' | 'Finalizado' | 'Cancelado';
  createdAt: Date;
  updatedAt: Date;
}

const ViajeSchema = new Schema<IViaje>(
  {
    camion: { type: String, required: true },
    conductor: { type: String, required: true },
    origen: { type: String, required: true },
    destino: { type: String, required: true },
    combustible: { type: String, required: true },
    cantidad_litros: { type: Number, required: true, min: 0, max: 30000 },
    fecha_salida: { type: Date, required: true },
    estado: { type: String, enum: ['En tránsito', 'Finalizado', 'Cancelado'], default: 'En tránsito' }
  },
  { timestamps: true }
);

export const Viaje = model<IViaje>('Viaje', ViajeSchema);
