import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User, IUser } from '../models/User';
import { IViaje, Viaje } from '../models/Viaje';

dotenv.config();

if (process.env.NODE_ENV === 'production') {
  console.error('❌ No puedes ejecutar el seeder en producción');
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('🔌 Conectado a MongoDB para seeding');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB:', err);
    process.exit(1);
  }
}

async function clearCollections() {
  try {
    await User.deleteMany({});
    console.log('🗑️ Colección usuarios limpiada');

    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.some(c => c.name === 'viajes')) {
      await mongoose.connection.db.dropCollection('viajes');
      console.log('🗑️ Colección viajes eliminada');
    } else {
      console.log('ℹ️ Colección viajes no existe, no se elimina');
    }
  } catch (err) {
    console.error('❌ Error al limpiar colecciones:', err);
    process.exit(1);
  }
}

async function seedUsers() {
  try {
    const passwordAdmin = await bcrypt.hash('123456', 10);
    const usersData: Partial<IUser>[] = [
      { email: 'admin@example.com', password: passwordAdmin, role: 'admin' },
      { email: 'user1@example.com', password: await bcrypt.hash('password1', 10), role: 'user' },
      { email: 'user2@example.com', password: await bcrypt.hash('password2', 10), role: 'user' }
    ];

    const createdUsers = await User.insertMany(usersData);
    console.log(`✅ Usuarios creados: ${createdUsers.length}`);
  } catch (err) {
    console.error('❌ Error al crear usuarios:', err);
    process.exit(1);
  }
}

function generateRandomViaje(): Partial<IViaje> {
  return {
    camion: faker.vehicle.vin().slice(0, 7).toUpperCase(),
    conductor: faker.person.fullName(),
    origen: faker.location.city(),
    destino: faker.location.city(),
    combustible: faker.helpers.arrayElement(['Diésel', 'Nafta', 'GNC']),
    cantidad_litros: faker.number.int({ min: 1000, max: 30000 }),
    fecha_salida: faker.date.soon({ days: 10 }),
    estado: faker.helpers.arrayElement(['En tránsito', 'Finalizado', 'Cancelado']),
  };
}

async function seedViajes() {
  try {
    const viajesData: Partial<IViaje>[] = Array.from({ length: 10 }, generateRandomViaje);
    const createdViajes = await Viaje.insertMany(viajesData);
    console.log(`✅ Viajes creados: ${createdViajes.length}`);
  } catch (err) {
    console.error('❌ Error al crear viajes:', err);
    process.exit(1);
  }
}

async function seed() {
  await connectDB();
  await clearCollections();
  await seedUsers();
  await seedViajes();

  console.log('🏁 Seed finalizado con éxito');
  process.exit(0);
}

seed();
