import {
  createCookieSessionStorage,
  type MiddlewareFunction,
} from 'node_modules/react-router/dist/production';
import { redirect } from 'react-router';
import { unstable_createSessionMiddleware as sessionMiddleware } from 'remix-utils/middleware/session';
import { z } from 'zod';
import { getAuthSession } from '../server/global-context';

const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__auth_session',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 3, // 3 hours
    secrets: [process.env.SESSION_SECRET || 'fallback-secret-for-dev'],
  },
});

const [authSessionMiddleware, getAuthSessionFromContext] =
  sessionMiddleware(authSessionStorage);

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: z.any(),
  expiresIn: z.number(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export const setAuthSession = async (response: AuthResponse) => {
  const authSession = getAuthSession();

  authSession.set('user', response.user);
  authSession.set('token', response.token);
  authSession.set('expiresAt', Date.now() + response.expiresIn);

  return new Response(null, {
    headers: {
      'Set-Cookie': await authSessionStorage.commitSession(authSession),
    },
  });
};

export const getUserFromAuthSession = () => {
  const authSession = getAuthSession();
  console.log(JSON.stringify({ user: authSession.data }));

  const user = authSession.get('user') as Record<string, any>;

  return user;
};

export const clearAuthSession = (
  authSession: ReturnType<typeof getAuthSessionFromContext>
) => {
  authSession.unset('token');
  authSession.unset('expiresAt');
};

const isTokenExpired = (expiresAt: number): boolean => {
  if (!expiresAt) return false;

  const buffer = 5 * 60 * 1000; // 5 minutes in milliseconds
  return Date.now() >= expiresAt - buffer;
};

export const validateTokenMiddleware: MiddlewareFunction<Response> = async (
  { context },
  next
) => {
  const authSession = getAuthSessionFromContext(context);
  const sessionData = authSession.data;

  if (!sessionData.user || !sessionData.token) {
    return next();
  }

  return next();
};

export const requireUser: MiddlewareFunction = ({ context }, next) => {
  const authSession = getAuthSessionFromContext(context);
  const user = authSession.get('user') as any;
  const expiresAt = authSession.get('expiresAt') as number;
  const token = authSession.get('token');

  if (!user || !token || isTokenExpired(expiresAt)) {
    throw redirect('/login');
  }

  return next();
};

export { authSessionMiddleware, getAuthSessionFromContext };
