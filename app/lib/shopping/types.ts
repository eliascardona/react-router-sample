import { z } from 'zod';

/*
  API RESPONSES
*/
export const PriceSearchResultSchema = z.object({
  id: z.string(),
  unitAmount: z.number(),
  currency: z.string(),
});
export type PriceSearchResult = z.infer<typeof PriceSearchResultSchema>;

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const ShoppingActionEnum = z.enum([
  'SIGNUP',
  'PAYMENT_INTENT',
  'PAYMENT_CONFIRMATION',
]);
export type ShoppingAction = z.infer<typeof ShoppingActionEnum>;

const SignupSchema = z.object({
  name: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
});

const PaymentIntentSchema = z.object({
  priceId: z.string(),
});

/*
  POLYMORPHIC REQUEST SCHEMA
*/
const ShoppingRequestBaseSchema = z.object({
  intent: ShoppingActionEnum,
});

export const SignupRequestSchema = ShoppingRequestBaseSchema.extend({
  intent: z.literal(ShoppingActionEnum.enum.SIGNUP),
  body: SignupSchema,
});
export type SignupRequestBody = z.infer<typeof SignupRequestSchema>;

export const PaymentIntentRequestSchema = ShoppingRequestBaseSchema.extend({
  intent: z.literal(ShoppingActionEnum.enum.PAYMENT_INTENT),
  body: PaymentIntentSchema,
});
export type PaymentIntentRequestBody = z.infer<
  typeof PaymentIntentRequestSchema
>;

export const ShoppingRequestBodySchema = z.discriminatedUnion('intent', [
  SignupRequestSchema,
  PaymentIntentRequestSchema,
]);
export type ShoppingRequestBody = z.infer<typeof ShoppingRequestBodySchema>;

/*
  POLYMORPHIC SERVER ACTION'S RESULT TYPE
  TO AID THE SERVER RESULT HANDLING
*/

const ShoppingActionResultBaseSchema = z.object({
  type: ShoppingActionEnum,
});

export const ShoppingSignupResultSchema = ShoppingActionResultBaseSchema.extend(
  {
    type: z.literal(ShoppingActionEnum.enum.SIGNUP),
    body: z.string(),
  }
);
export type ShoppingSignupResult = z.infer<typeof ShoppingSignupResultSchema>;

export const PaymentIntentResultSchema = ShoppingActionResultBaseSchema.extend({
  type: z.literal(ShoppingActionEnum.enum.PAYMENT_INTENT),
  body: z.string(),
});
export type PaymentIntentResult = z.infer<typeof PaymentIntentResultSchema>;

export const PaymentConfirmationResultSchema =
  ShoppingActionResultBaseSchema.extend({
    type: z.literal(ShoppingActionEnum.enum.PAYMENT_CONFIRMATION),
    body: z.string(),
  });
export type PaymentConfirmationResult = z.infer<
  typeof PaymentConfirmationResultSchema
>;

export const ShoppingActionResultSchema = z.discriminatedUnion('type', [
  ShoppingSignupResultSchema,
  PaymentIntentResultSchema,
  PaymentConfirmationResultSchema,
]);

export type ShoppingActionResult = z.infer<typeof ShoppingActionResultSchema>;
