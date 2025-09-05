import type { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { PaginationSettingsSchema } from '~/lib/pagination/types';
import { GenericServerResponseWithDataSchema } from '../api/types';
import { ISODateTimeOptionalNullable } from '../datetime/types';

export const SubmissionStatusSchema = z.enum([
  'COMPLETED',
  'REJECTED',
  'DRAFT',
  'SUBMITTED',
  'IN_REVIEW',
  'APPROVED',
  'REJECTED',
  'WITHDRAWN',
]);
export type SubmissionStatus = z.infer<typeof SubmissionStatusSchema>;

export const SortDirectionEnum = z.enum(['ASC', 'DESC']);

export type SortDirection = z.infer<typeof SortDirectionEnum>;

/* Components' Props */
interface EntityManagementUIProps {
  submissionManagementView: any;
}

export interface WithdrawUIProps extends EntityManagementUIProps {
  programId: string;
}

interface EntityManagementBulkUIProps {
  submissionManagementView: any[];
}

export interface BulkTransactionUIProps extends EntityManagementBulkUIProps {
  programId: string;
}

export interface EntityManagementFormsProps {
  defaultValues?: FieldValues | undefined;
  formFields?: any[] | undefined;
  programId: string;
}

export interface SingleTransactionFormProps extends EntityManagementFormsProps {
  submissionId: string;
  submissionIdentifier: string;
}

export interface BulkTransactionFormProps extends EntityManagementFormsProps {
  submissionIds: string[];
}

export interface EntityManagementFormProps<T extends FieldValues> {
  formId: string;
  submitLabel: string;
  className?: string;
  containerClassName?: string;
  buttonClassName: string;
  children?: React.ReactNode;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

/*
  Schemas and types to handle business logic
*/
export const EntityManagementFilterSchema = z.object({
  // Base filters
  status: z.string().array().optional(),
  createdFrom: ISODateTimeOptionalNullable,
  createdTo: ISODateTimeOptionalNullable,
  // Special ones
  sortDirection: SortDirectionEnum,
  sortByJsonField: z.string().optional(),
  query: z.string().optional(),
});
export type EntityManagementFilter = z.infer<
  typeof EntityManagementFilterSchema
>;

export const PaginatedManagementEntitySchema = PaginationSettingsSchema.extend({
  content: z.any().array(),
});
export type PaginatedManagementEntity = z.infer<
  typeof PaginatedManagementEntitySchema
>;

const ManagementEntityServerZodSchema =
  GenericServerResponseWithDataSchema.extend({
    data: z.any().optional(),
  });
export type ManagementEntityServerSchema = z.infer<
  typeof ManagementEntityServerZodSchema
>;

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const EntityManagementActionEnum = z.enum([
  'WITHDRAW_SUBMISSION',
  'DELETE_SUBMISSION',
  'BULK_WITHDRAWAL',
  'BULK_DELETION',
  'PREVIEW',
]);
export type EntityManagementAction = z.infer<typeof EntityManagementActionEnum>;

const EntityManagementContextSchema = z.object({
  submissionIdentifier: z.string(),
});

const WithdrawBodySchema = z.object({
  context: EntityManagementContextSchema,
  payload: z.object({
    submissionId: z.string(),
  }),
});

const BulkTransactionBodySchema = z.object({
  payload: z.object({
    submissionIds: z.string().array(),
  }),
});

/*
  POLYMORPHIC REQUEST SCHEMA
*/
const EntityManagementRequestBaseSchema = z.object({
  intent: EntityManagementActionEnum,
});

export const WithdrawSchema = EntityManagementRequestBaseSchema.extend({
  intent: z.literal(EntityManagementActionEnum.enum.WITHDRAW_SUBMISSION),
  body: WithdrawBodySchema,
});
export type WithdrawRequestBody = z.infer<typeof WithdrawSchema>;

export const BulkTransactionSchema = EntityManagementRequestBaseSchema.extend({
  intent: z.literal(EntityManagementActionEnum.enum.BULK_WITHDRAWAL),
  body: BulkTransactionBodySchema,
});
export type BulkTransactionRequestBody = z.infer<typeof BulkTransactionSchema>;

export const DeletionSchema = EntityManagementRequestBaseSchema.extend({
  intent: z.literal(EntityManagementActionEnum.enum.DELETE_SUBMISSION),
  body: WithdrawBodySchema,
});
export type AdminSubmissionDeletion = z.infer<typeof DeletionSchema>;

export const BulkDeletionSchema = EntityManagementRequestBaseSchema.extend({
  intent: z.literal(EntityManagementActionEnum.enum.BULK_DELETION),
  body: BulkTransactionBodySchema,
});
export type AdminSubmissionBulkDeletionRequestBody = z.infer<
  typeof BulkDeletionSchema
>;

export const EntityManagementRequestBodySchema = z.discriminatedUnion(
  'intent',
  [WithdrawSchema, BulkTransactionSchema, DeletionSchema, BulkDeletionSchema]
);
export type EntityManagementRequestBody = z.infer<
  typeof EntityManagementRequestBodySchema
>;
