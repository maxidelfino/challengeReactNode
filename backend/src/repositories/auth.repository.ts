import { User } from '../models/User';

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const createUser = async (email: string, hashedPassword: string, role: string) => {
  const user = new User({ email, password: hashedPassword, role });
  return user.save();
};
