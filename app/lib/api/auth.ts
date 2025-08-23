// import {
//     createCookieSessionStorage,
//     redirect,
//     type unstable_MiddlewareFunction,
// } from 'react-router';
// import { unstable_createSessionMiddleware as sessionMiddleware } from 'remix-utils/middleware/session';
// import z from 'zod';
// import { apiClient } from '~/lib/api/client';
// import { getAuthSession } from './client.server';

// const authSessionStorage = createCookieSessionStorage({
//     cookie: {
//         name: '__auth_session',
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         maxAge: 60 * 60 * 24 * 7, // 7 days
//         secrets: [process.env.SESSION_SECRET || 'fallback-secret-for-dev'],
//     },
// });

// const [authSessionMiddleware, getAuthSessionFromContext] = sessionMiddleware(authSessionStorage);

// export const AuthResponseSchema = z.object({
//     accessToken: z.string(),
//     refreshToken: z.string(),
//     tokenType: z.string().default('Bearer'),
//     user: z.any(),
//     expiresIn: z.number(),
// });
// export type AuthResponse = z.infer<typeof AuthResponseSchema>

// export const setAuthSession = (response: AuthResponse) => {
//     const authSession = getAuthSession();
//     authSession.set('accessToken', response.accessToken);
//     authSession.set('refreshToken', response.refreshToken);
//     authSession.set('expiresAt', Date.now() + response.expiresIn);
// };

// export const clearAuthSession = (
//     authSession: ReturnType<typeof getAuthSessionFromContext>
// ) => {
//     authSession.unset('accessToken');
//     authSession.unset('refreshToken');
//     authSession.unset('expiresAt');
// };

// const isTokenExpired = (expiresAt: number): boolean => {
//     if (!expiresAt) return false;

//     const buffer = 5 * 60 * 1000; // 5 minutes in milliseconds
//     return Date.now() >= expiresAt - buffer;
// };

// const refreshAccessToken = async (
//     refreshToken: string
// ): Promise<AuthResponse | null> => {
//     try {
//         return await apiClient.post<AuthResponse>('/auth/refresh', {
//             refreshToken,
//         });
//     } catch (error) {
//         console.error('Token refresh failed:', error);
//         return null;
//     }
// };

// export const validateTokenMiddleware: unstable_MiddlewareFunction<
//     Response
// > = async ({ context }, next) => {
//     const authSession = getAuthSessionFromContext(context);
//     const sessionData = authSession.data;

//     if (!sessionData.user || !sessionData.accessToken) {
//         return next();
//     }

//     const expiresAt = sessionData.expiresAt as number;
//     const refreshToken = sessionData.refreshToken as string;

//     if (expiresAt && isTokenExpired(expiresAt)) {
//         console.log('Token expired, attempting refresh...');

//         if (refreshToken) {
//             const authResponse = await refreshAccessToken(refreshToken);

//             if (authResponse) {
//                 const newExpiresAt = Date.now() + authResponse.expiresIn;

//                 authSession.set('accessToken', authResponse.accessToken);
//                 authSession.set('refreshToken', authResponse.refreshToken);
//                 authSession.set('expiresAt', newExpiresAt);

//                 console.log('Token refreshed successfully');
//             } else {
//                 clearAuthSession(authSession);
//                 console.log('Token refresh failed, session cleared');
//             }
//         } else {
//             clearAuthSession(authSession);
//         }
//     }

//     return next();
// };

// export const requireUser: unstable_MiddlewareFunction = ({ context }, next) => {
//     const authSession = getAuthSessionFromContext(context);
//     const expiresAt = authSession.get('expiresAt') as number;
//     const accessToken = authSession.get('accessToken');

//     if (!accessToken || isTokenExpired(expiresAt)) {
//         throw redirect('/login');
//     }

//     return next();
// };

// export { authSessionMiddleware, getAuthSessionFromContext };
