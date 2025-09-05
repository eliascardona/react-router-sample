import { z } from 'zod';

export const errorResponseSchema = z.object({
  success: z.boolean(),
  error: z.string(),
  code: z.string().optional(),
  details: z.string().optional(),
  request_id: z.string().optional(),
  timestamp: z.string(),
});

export type GenericServerResponse =
  | {
      success: boolean;
      message: string;
    }
  | null
  | undefined;

export const GenericServerResponseWithDataSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type GenericServerResponseWithData = z.infer<
  typeof GenericServerResponseWithDataSchema
>;
