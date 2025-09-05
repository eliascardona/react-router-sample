import z from 'zod';

export const FieldTypeEnum = z.enum(['text', 'pass']);
export type FieldType = z.infer<typeof FieldTypeEnum>;

export const FieldConfigSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: FieldTypeEnum,
  order: z.number(),
});

export type FieldConfig = z.infer<typeof FieldConfigSchema>;
