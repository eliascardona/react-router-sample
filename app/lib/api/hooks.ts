import { useAuth } from '@clerk/clerk-react';
import { useMemo } from 'react';
import { createApiClient } from '../api/client';

/**
 * Hook to create an authenticated API client using Clerk
 * @returns An authenticated API client instance
 */
export function useAuthenticatedApi() {
  const { getToken } = useAuth();

  const api = useMemo(() => {
    return createApiClient(async () => {
      try {
        return await getToken();
      } catch (error) {
        console.error('Error getting auth token in hook:', error);
        return null;
      }
    });
  }, [getToken]);

  return api;
}

/**
 * Hook to create an authenticated API client for a specific resource
 * with convenience methods for standard CRUD operations
 * @param resourcePath - The API path for the resource
 * @returns An object with CRUD methods for the resource
 */
export function useResourceApi<T>(resourcePath: string) {
  const api = useAuthenticatedApi();

  return useMemo(
    () => ({
      getAll: () => api.get<T[]>(resourcePath),
      getById: (id: string) => api.get<T>(`${resourcePath}/${id}`),
      create: (data: Partial<T>) => api.post<T>(resourcePath, data),
      update: (id: string, data: Partial<T>) =>
        api.put<T>(`${resourcePath}/${id}`, data),
      patch: (id: string, data: Partial<T>) =>
        api.patch<T>(`${resourcePath}/${id}`, data),
      remove: (id: string) => api.delete<void>(`${resourcePath}/${id}`),
    }),
    [api, resourcePath]
  );
}
