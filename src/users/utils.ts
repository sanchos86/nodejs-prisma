import bcryptjs from 'bcryptjs';

const { compare, hash } = bcryptjs;
export const hashPassword = (
  password: string,
  salt: number,
): Promise<string> => hash(password, salt);

export const comparePasswords = (
  passwordToCheck: string,
  hashedPassword: string,
): Promise<boolean> => compare(passwordToCheck, hashedPassword);
