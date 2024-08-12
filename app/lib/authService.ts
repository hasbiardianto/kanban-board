import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export interface LoginResponse {
  auth_token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
  return response.data;
};
