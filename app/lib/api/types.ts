import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { z } from 'zod';
import type { createServerClient, createTokenClient } from './client';

export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    timestamp: z.string(),
    data: dataSchema,
  });

export const errorResponseSchema = z.object({
  success: z.boolean(),
  error: z.string(),
  code: z.string().optional(),
  details: z.string().optional(),
  request_id: z.string().optional(),
  timestamp: z.string(),
});

export type ApiResponse<T extends z.ZodType> = z.infer<
  ReturnType<typeof apiResponseSchema<T>>
>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

export type RouterFunctionArgs = LoaderFunctionArgs | ActionFunctionArgs;

export type ApiClient =
  | ReturnType<typeof createServerClient>
  | ReturnType<typeof createTokenClient>
  | undefined;
