import { AsyncLocalStorage } from 'node:async_hooks';
import { type MiddlewareFunction, type Session } from 'react-router';
import { getAuthSessionFromContext } from '../api/auth';

const globalStorage = new AsyncLocalStorage<{
  authSession: Session;
  token?: string;
  expiresAt?: number;
}>();

export const getGlobalStorage = () => {
  const store = globalStorage.getStore();
  if (!store) {
    throw new Error('Global storage is not initialized');
  }
  return store;
};

export const getAuthSession = () => {
  const store = getGlobalStorage();
  return store.authSession;
};

export const globalStorageMiddleware: MiddlewareFunction<Response> = async (
  { context },
  next
) => {
  const authSession = getAuthSessionFromContext(context);
  return new Promise((resolve) => {
    globalStorage.run(
      {
        authSession,
        token: authSession.get('token') as string | undefined,
        expiresAt: authSession.get('expiresAt') as number | undefined,
      },
      () => {
        resolve(next());
      }
    );
  });
};
