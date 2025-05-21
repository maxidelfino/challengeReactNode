import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'No se proporcionó token' });
    return;
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    ((req as unknown) as AuthRequest).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
};
