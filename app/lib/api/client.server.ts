// import { AsyncLocalStorage } from 'node:async_hooks';
// import { createApiClient } from '~/lib/api/client';
// import {
//     createCookieSessionStorage,
//     type Session,
//     type unstable_MiddlewareFunction
// } from 'react-router';
// import { getAuthSessionFromContext } from './auth';

// const globalStorage = new AsyncLocalStorage<{
//     authSession: Session;
//     accessToken?: string;
//     refreshToken?: string;
//     expiresAt?: number;
// }>();

// export const getGlobalStorage = () => {
//     const store = globalStorage.getStore();
//     if (!store) {
//         throw new Error('Global storage is not initialized');
//     }
//     return store;
// };

// export const getAuthSession = () => {
//     const store = getGlobalStorage();
//     return store.authSession;
// }

// export const createAuthenticatedServerClient = () => {
//     const getAuthToken = async () => {
//         const store = getGlobalStorage();
//         const accessToken = store.accessToken;

//         if (!accessToken) {
//             throw new Error('No access token found');
//         }
//         return accessToken;
//     };
//     return createApiClient(getAuthToken);
// };

// export const authenticatedServerClient = createAuthenticatedServerClient();

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

// export const globalStorageMiddleware: unstable_MiddlewareFunction<
//     Response
// > = async ({ context }, next) => {
//     const authSession = getAuthSessionFromContext(context);
//     return new Promise((resolve) => {
//         globalStorage.run(
//             {
//                 authSession,
//                 accessToken: authSession.get('accessToken') as string | undefined,
//                 refreshToken: authSession.get('refreshToken') as string | undefined,
//                 expiresAt: authSession.get('expiresAt') as number | undefined,
//             },
//             () => {
//                 resolve(next());
//             }
//         );
//     });
// };
