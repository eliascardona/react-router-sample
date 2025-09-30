import { z } from 'zod';
import { PaginationSettingsSchema } from '~/lib/pagination/types';
import { ISODateTimeOptionalNullable } from '../datetime/types';

export const SortDirectionEnum = z.enum(['ASC', 'DESC']);

export type SortDirection = z.infer<typeof SortDirectionEnum>;

/* Components' Props */
export interface EntityManagementFormProps {
  children?: React.ReactNode;
  onSuccess?: (data: unknown) => void;
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

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const EntityManagementActionEnum = z.enum(['UPDATE', 'DELETE']);
export type EntityManagementAction = z.infer<typeof EntityManagementActionEnum>;

const EditionSchema = z.object({
  productId: z.string().uuid(),
  newProductData: z.any(),
});

const DeletionSchema = z.object({
  productId: z.string().uuid(),
});

/*
  POLYMORPHIC REQUEST SCHEMA
*/
const EntityManagementRequestBaseSchema = z.object({
  intent: EntityManagementActionEnum,
});

export const ProductEditionRequestSchema =
  EntityManagementRequestBaseSchema.extend({
    intent: z.literal(EntityManagementActionEnum.enum.UPDATE),
    body: EditionSchema,
  });
export type ProductEditionRequestBody = z.infer<
  typeof ProductEditionRequestSchema
>;

export const DeletionRequestSchema = EntityManagementRequestBaseSchema.extend({
  intent: z.literal(EntityManagementActionEnum.enum.DELETE),
  body: DeletionSchema,
});
export type ProductDeletionRequestBody = z.infer<typeof DeletionRequestSchema>;

export const ProductManagementRequestBodySchema = z.discriminatedUnion(
  'intent',
  [ProductEditionRequestSchema, DeletionRequestSchema]
);
export type ProductManagementRequestBody = z.infer<
  typeof ProductManagementRequestBodySchema
>;
