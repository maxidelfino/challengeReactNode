import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;

  try {
    const result = await registerUser(email, password, role);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof Error && err.message === 'EMAIL_IN_USE') {
      res.status(400).json({ message: 'Email ya en uso' });
    } else {
      res.status(500).json({ message: 'Error al registrar usuario', error: err });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
      res.status(400).json({ message: 'Credenciales inválidas' });
    } else {
      res.status(500).json({ message: 'Error al iniciar sesión', error: err });
    }
  }
};
