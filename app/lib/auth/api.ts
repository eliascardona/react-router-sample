import type { AuthResponse } from '~/lib/api/auth';
import { apiClient } from '~/lib/api/client';
import type { SignupRequestBody } from '../shopping/types';

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
  requestBody: SignupRequestBody
): Promise<AuthResponse> {
  try {
    const result = await apiClient.post<AuthResponse>('/auth/shopping-signup', {
      username: requestBody.body.username,
      email: requestBody.body.email,
      password: requestBody.body.password,
    });
    return result;
  } catch (error) {
    console.error('Error in signup:', error);
    throw error;
  }
}
