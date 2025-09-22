import { createApiClient } from '~/lib/api/client';
import { getGlobalStorage } from '../server/global-context';

export const createAuthenticatedServerClient = () => {
  const getAuthToken = async () => {
    const store = getGlobalStorage();
    const token = store.token;

    if (!token) {
      throw new Error('No access token found');
    }
    return token;
  };
  return createApiClient(getAuthToken);
};

export const authenticatedServerClient = createAuthenticatedServerClient();
