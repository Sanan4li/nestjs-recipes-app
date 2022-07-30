import * as bcrypt from 'bcrypt';
export const hashPassword = (password: string) => {
  const HASH = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, HASH);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  const isMatched = bcrypt.compareSync(password, hashedPassword);
  return isMatched;
};
