import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../repositories/auth.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (email: string, password: string, role: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('EMAIL_IN_USE');

  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser(email, hashed, role);

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    message: 'Usuario creado correctamente',
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('INVALID_CREDENTIALS');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('INVALID_CREDENTIALS');

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    message: 'Login exitoso',
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
