import type { AuthResponse } from '~/lib/api/auth';
import { apiClient } from '~/lib/api/client';

/**
 * Log the user into the app
 */
export async function performLogin(
  formData: Record<string, any>
): Promise<AuthResponse> {
  try {
    const result = await apiClient.post<AuthResponse>('/auth/login', formData);
    return result;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
}
