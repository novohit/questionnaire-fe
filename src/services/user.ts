import { User } from '../model';
import http from './http';

export async function getUserInfo(_id: string) {
  const url = `/api/user/${_id}`;
  const user = (await http.get(url)) as User;
  return user;
}

export async function register(body: Partial<User>) {
  const url = '/api/user/register';
  const _id = (await http.post(url, body)) as string;
  return _id;
}

export async function login(body: { username: string; password: string }) {
  const url = '/api/user/login';
  const token = (await http.post(url, body)) as string;
  return token;
}
