import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => {
    console.error("Error al conectar MongoDB", err);
    process.exit(1);
  });

app.get('/', (_req: Request, res: Response) => {
  res.send('API funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
