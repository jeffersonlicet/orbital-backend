import bcrypt from 'bcrypt';

const DEFAULT_SALT_ROUND = 10;

export const encrypt = (password) => bcrypt.hash(password, DEFAULT_SALT_ROUND);

export const compare = (plainPassword, encryptedPassword) => bcrypt.compare(
  plainPassword,
  encryptedPassword,
);
