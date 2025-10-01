import type { AuthResponse } from '~/lib/api/auth';
import { apiClient } from '~/lib/api/client';

export async function performLogin(
  formData: Record<string, any>
): Promise<AuthResponse> {
  try {
    const result = await apiClient.post<AuthResponse>('/auth/login', formData);
    return result;
  } catch (error) {
    console.error('Error login user:', error);
    throw error;
  }
}

export async function performSignup(
  formData: Record<string, any>
): Promise<AuthResponse> {
  try {
    const result = await apiClient.post<AuthResponse>('/auth/signup', formData);
    return result;
  } catch (error) {
    console.error('Error in signup:', error);
    throw error;
  }
}
