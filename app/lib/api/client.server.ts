import { createApiClient } from '~/lib/api/client';
import { getGlobalStorage } from '../server/global-context';

export const createAuthenticatedServerClient = () => {
  const getAuthToken = async () => {
    const store = getGlobalStorage();
    const accessToken = store.accessToken;

    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  };
  return createApiClient(getAuthToken);
};

export const authenticatedServerClient = createAuthenticatedServerClient();
