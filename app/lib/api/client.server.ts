import { AsyncLocalStorage } from 'node:async_hooks';
import { createApiClient } from '~/lib/api/client';
import { type unstable_MiddlewareFunction, createCookieSessionStorage } from 'react-router';
import { unstable_createSessionMiddleware as sessionMiddleware } from 'remix-utils/middleware/session';


type GlobalStorage = {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
};

const globalStorage = new AsyncLocalStorage<GlobalStorage>();

const getGlobalStorage = () => {
    const store = globalStorage.getStore();
    if (!store) {
        throw new Error('Global storage is not initialized');
    }
    return store;
};

export const getOptionalAccessToken = () => {
    const store = getGlobalStorage();
    return store.accessToken;
};

export const createAuthenticatedServerClient = () => {
    const getAuthToken = async () => {
        const accessToken = getOptionalAccessToken();
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    };
    return createApiClient(getAuthToken);
};

export const authenticatedServerClient = createAuthenticatedServerClient();



const authSessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__auth_session',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secrets: [process.env.SESSION_SECRET || 'fallback-secret-for-dev'],
    },
});

const [authSessionMiddleware, getAuthSessionFromContext] = sessionMiddleware(authSessionStorage);

export { authSessionMiddleware, getAuthSessionFromContext };

export const globalStorageMiddleware: unstable_MiddlewareFunction<
    Response
> = async ({ context }, next) => {
    const authSession = getAuthSessionFromContext(context);
    return new Promise((resolve) => {
        globalStorage.run(
            {
                accessToken: authSession.get('accessToken') as string | undefined,
                refreshToken: authSession.get('refreshToken') as string | undefined,
                expiresAt: authSession.get('expiresAt') as number | undefined,
            },
            () => {
                resolve(next());
            }
        );
    });
};