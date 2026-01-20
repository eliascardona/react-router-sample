import { z } from 'zod';
import { FieldTypeEnum } from '~/lib/forms/retrieving/types';

export const FieldConfigSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: FieldTypeEnum,
  row: z.number(),
});

export type FieldConfig = z.infer<typeof FieldConfigSchema>;

export const GridColumnSchema = z.object({
  id: z.string().optional(),
  fieldIdentifier: z.string(),
});

export type GridColumn = z.infer<typeof GridColumnSchema>;

export const GridRowSchema = z.object({
  id: z.string().optional(),
  rowLabel: z.string().optional(),
  order: z.number().default(0),
  columnsQuantity: z.number().min(1).max(6),
  columns: GridColumnSchema.array(),
});

export type GridRow = z.infer<typeof GridRowSchema>;

export const FormLayoutSchema = z.object({
  rows: GridRowSchema.array().default([]),
  rowGap: z.string().default('gap-y-4'),
});

export type FormLayout = z.infer<typeof FormLayoutSchema>;

export const FormSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
  fields: FieldConfigSchema.array(),
  layout: FormLayoutSchema,
});

export type Form = z.infer<typeof FormSchema>;
