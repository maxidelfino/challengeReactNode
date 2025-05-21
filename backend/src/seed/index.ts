import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User, IUser } from '../models/User';
import { IViaje, Viaje } from '../models/Viaje';

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  console.error('❌ No puedes ejecutar el seeder en producción');
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🔌 Conectado a MongoDB para seeding');

    await User.deleteMany({});
    try {
      await mongoose.connection.db.dropCollection('viajes');
      console.log('🗑️ Dropped viajes collection');
    } catch (err) {
    }
    await Viaje.deleteMany({});

    const passwordAdmin = await bcrypt.hash('123456', 10);
    const usersData: Partial<IUser>[] = [
      { email: 'admin@example.com', password: passwordAdmin, role: 'admin' },
      { email: 'user1@example.com', password: await bcrypt.hash('password1', 10), role: 'user' },
      { email: 'user2@example.com', password: await bcrypt.hash('password2', 10), role: 'user' }
    ];
    const createdUsers = await User.insertMany(usersData);
    console.log(`✅ Usuarios creados: ${createdUsers.length}`);

    const viajesData: Partial<IViaje>[] = [
      {
        camion: 'ABC123',
        conductor: 'Juan Pérez',
        origen: 'Planta X',
        destino: 'Estación Y',
        combustible: 'Diésel',
        cantidad_litros: 15000,
        fecha_salida: new Date(Date.now() + 3600 * 1000),
        estado: 'En tránsito'
      },
      {
        camion: 'DEF456',
        conductor: 'María López',
        origen: 'Puerto A',
        destino: 'Planta Z',
        combustible: 'Nafta',
        cantidad_litros: 20000,
        fecha_salida: new Date(Date.now() + 7200 * 1000),
        estado: 'Finalizado'
      },
      {
        camion: 'GHI789',
        conductor: 'Carlos Ruiz',
        origen: 'Depósito B',
        destino: 'Refinería C',
        combustible: 'GNC',
        cantidad_litros: 12000,
        fecha_salida: new Date(Date.now() + 10800 * 1000),
        estado: 'Cancelado'
      }
    ];
    const createdViajes = await Viaje.insertMany(viajesData);
    console.log(`✅ Viajes creados: ${createdViajes.length}`);

    console.log('🏁 Seed finalizado con éxito');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en el seed:', err);
    process.exit(1);
  }
}

seed();
