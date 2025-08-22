import { z } from 'zod';
import type { FieldValues } from 'react-hook-form';
import { PaginationSettingsSchema } from '~/lib/pagination/types';
import { ISODateTimeOptionalNullable } from '../datetime/types';
import { SubmissionStatusSchema } from '../user/types';

type SortDirection = 'ASC' | 'DESC'

/* Components' Props */
interface SubmissionManagementUIProps {
  submissionManagementView: any;
}

export interface WithdrawUIProps extends SubmissionManagementUIProps {
  programId: string;
}

interface SubmissionManagementBulkUIProps {
  submissionManagementView: any[];
}

export interface BulkWithdrawalUIProps extends SubmissionManagementBulkUIProps {
  programId: string;
}

export interface SubmissionManagementFormsProps {
  defaultValues?: FieldValues | undefined;
  formFields?: any[] | undefined;
  programId: string;
}

export interface SingleWithdrawFormProps
  extends SubmissionManagementFormsProps {
  submissionId: string;
  submissionIdentifier: string;
}

export interface BulkWithdrawalFormProps
  extends SubmissionManagementFormsProps {
  submissionIds: string[];
}

export interface SubmissionsManagementFormProps<T extends FieldValues> {
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
export const AdminSubmissionFilterSchema = z.object({
  // Base filters
  status: z.array(SubmissionStatusSchema).optional(),
  assignedFrom: ISODateTimeOptionalNullable,
  assignedTo: ISODateTimeOptionalNullable,
  createdFrom: ISODateTimeOptionalNullable,
  createdTo: ISODateTimeOptionalNullable,
  deadlineFrom: ISODateTimeOptionalNullable,
  deadlineTo: ISODateTimeOptionalNullable,
  programId: z.string().uuid().optional(),
  submissionIdentifier: z.string().optional(),
  // Special ones
  sortDirection: SortDirection,
  sortByJsonField: z.string().optional(),
  query: z.string().optional(),
});
export type AdminSubmissionFilter = z.infer<typeof AdminSubmissionFilterSchema>;

export const PaginatedSubmissionsSchema = PaginationSettingsSchema.extend({
  content: z.any().array(),
});
export type PaginatedSubmissions = z.infer<typeof PaginatedSubmissionsSchema>;

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const SubmissionManagementActionEnum = z.enum([
  'WITHDRAW_SUBMISSION',
  'DELETE_SUBMISSION',
  'BULK_WITHDRAWAL',
  'BULK_DELETION',
  'PREVIEW',
]);
export type SubmissionManagementAction = z.infer<
  typeof SubmissionManagementActionEnum
>;

const SubmissionManagementContextSchema = z.object({
  submissionIdentifier: z.string(),
});

const WithdrawBodySchema = z.object({
  context: SubmissionManagementContextSchema,
  payload: z.object({
    submissionId: z.string(),
  }),
});

const BulkWithdrawalBodySchema = z.object({
  payload: z.object({
    submissionIds: z.string().array(),
  }),
});

/*
  POLYMORPHIC REQUEST SCHEMA
*/
const SubmissionManagementRequestBaseSchema = z.object({
  intent: SubmissionManagementActionEnum,
});

export const WithdrawSchema = SubmissionManagementRequestBaseSchema.extend({
  intent: z.literal(SubmissionManagementActionEnum.enum.WITHDRAW_SUBMISSION),
  body: WithdrawBodySchema,
});
export type WithdrawRequestBody = z.infer<typeof WithdrawSchema>;

export const BulkWithdrawalSchema =
  SubmissionManagementRequestBaseSchema.extend({
    intent: z.literal(SubmissionManagementActionEnum.enum.BULK_WITHDRAWAL),
    body: BulkWithdrawalBodySchema,
  });
export type BulkWithdrawalRequestBody = z.infer<typeof BulkWithdrawalSchema>;

export const DeletionSchema = SubmissionManagementRequestBaseSchema.extend({
  intent: z.literal(SubmissionManagementActionEnum.enum.DELETE_SUBMISSION),
  body: WithdrawBodySchema,
});
export type AdminSubmissionDeletion = z.infer<typeof DeletionSchema>;

export const BulkDeletionSchema = SubmissionManagementRequestBaseSchema.extend({
  intent: z.literal(SubmissionManagementActionEnum.enum.BULK_DELETION),
  body: BulkWithdrawalBodySchema,
});
export type AdminSubmissionBulkDeletionRequestBody = z.infer<
  typeof BulkDeletionSchema
>;

export const SubmissionManagementRequestBodySchema = z.discriminatedUnion(
  'intent',
  [WithdrawSchema, BulkWithdrawalSchema, DeletionSchema, BulkDeletionSchema]
);
export type SubmissionManagementRequestBody = z.infer<
  typeof SubmissionManagementRequestBodySchema
>;
