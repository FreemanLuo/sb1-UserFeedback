import { AdminCredentials } from './types';

export const adminCredentials: AdminCredentials = {
  username: 'admin',
  password: 'admin'
};

export function validateAdmin(credentials: AdminCredentials): boolean {
  return (
    credentials.username === adminCredentials.username &&
    credentials.password === adminCredentials.password
  );
}