import type {
  MiddlewareFunction,
  RouterContextProvider,
  Session,
  SessionStorage,
} from 'react-router';
import z from 'zod';

export const UserDetailsSchema = z.object({
  id: z.string(),
  email: z.string(),
  dispalyName: z.string(),
  username: z.string(),
});
export type UserDetails = z.infer<typeof UserDetailsSchema>;

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  user: UserDetailsSchema,
  expiresIn: z.number(),
});
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export type MiddlewareGetter<T> = (
  context: Readonly<RouterContextProvider>
) => T;

export type SessionStorageGetter<Data, FlashData> = (
  request: Request,
  context: Readonly<RouterContextProvider>
) => SessionStorage<Data, FlashData>;

export type ShouldCommitFunction<Data> = (
  prev: Partial<Data>,
  next: Partial<Data>
) => boolean;

export type CreateSessionMiddlewareReturnType<Data, FlashData> = [
  MiddlewareFunction<Response>,
  MiddlewareGetter<Session<Data, FlashData>>,
];
