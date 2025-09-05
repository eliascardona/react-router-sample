import { apiClient } from '~/lib/api/client';

/**
 * Log the user into the app
 */
export async function performLogin(
  formData: Record<string, any>
): Promise<any> {
  try {
    const result = await apiClient.post('/auth/login', formData);
    return result;
  } catch (error) {
    console.error('Error creating form:', error);
    throw error;
  }
}
