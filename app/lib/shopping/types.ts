import { z } from 'zod';
import {
  checkoutSessionId,
  priceId,
  productId,
  tenantId,
  userId,
} from '../shared/types';

/*
  API RESPONSES
*/

/* Checkout session Response DTO schema */
export const CheckoutSessionResponseDtoSchema = z.object({
  sessionId: z.string().uuid(),
});
export type CheckoutSessionResponseDto = z.infer<
  typeof CheckoutSessionResponseDtoSchema
>;

/* Create order Response DTO schema */
export const OrderResponseDtoSchema = z.object({
  orderId: z.string().uuid(),
  internalPaymentIntentId: z.string().uuid(),
  externalPaymentIntentId: z.string(),
  stripeClientSecret: z.string(),
});
export type OrderResponseDto = z.infer<typeof OrderResponseDtoSchema>;

/* Charge information retrieval schema */
export const ChargeInfoDtoSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  priceId: z.string(),
  active: z.boolean(),
  unitAmount: z.number(),
  currency: z.string(),
});
export type ChargeInfoDto = z.infer<typeof ChargeInfoDtoSchema>;

/* Payment intent creation response */
export const PaymentIntentResponseDtoSchema = z.object({
  clientSecret: z.string(),
  paymentIntentId: z.string(),
});
export type PaymentIntentResponseDto = z.infer<
  typeof PaymentIntentResponseDtoSchema
>;

/*
  SCHEMAS AND TYPES FOR ACTIONS
*/
export const ShoppingActionEnum = z.enum([
  'SIGNUP',
  'PAYMENT_INTENT',
  'PAYMENT_CONFIRMATION',
  'CREATE_CHECKOUT_SESSION',
  'CREATE_ORDER',
]);
export type ShoppingAction = z.infer<typeof ShoppingActionEnum>;

const SignupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const PaymentIntentSchema = z.object({
  priceId: priceId,
  productId: productId,
});

/*
  CHECKOUT SESSIONS
*/
const CreateCheckoutSessionCommandSchema = z.object({
  userId: userId,
  tenantId: tenantId,
  currency: z.string(),
});
export type CreateCheckoutSessionCommand = z.infer<
  typeof CreateCheckoutSessionCommandSchema
>;

const CheckoutSessionItemDtoSchema = z.object({
  productId: productId,
  priceId: priceId,
  quantity: z.number(),
  operation: z.string(),
});
export type CheckoutSessionItemDto = z.infer<
  typeof CheckoutSessionItemDtoSchema
>;

const CreateCheckoutSessionDtoSchema = z.object({
  command: CreateCheckoutSessionCommandSchema,
  items: CheckoutSessionItemDtoSchema.array().nullable(),
});
export type CreateCheckoutSessionDto = z.infer<
  typeof CreateCheckoutSessionDtoSchema
>;

/*
  ORDERS
*/
const CreateOrderFromCheckoutSessionCommandSchema = z.object({
  checkoutSessionId: checkoutSessionId,
  userId: userId,
  tenantId: tenantId,
});
export type CreateOrderFromCheckoutSessionCommand = z.infer<
  typeof CreateOrderFromCheckoutSessionCommandSchema
>;

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

export const CheckoutSessionRequestSchema = ShoppingRequestBaseSchema.extend({
  intent: z.literal(ShoppingActionEnum.enum.CREATE_CHECKOUT_SESSION),
  body: CreateCheckoutSessionDtoSchema,
});
export type CreateCheckoutSessionRequestBody = z.infer<
  typeof CheckoutSessionRequestSchema
>;

export const OrderCreationRequestSchema = ShoppingRequestBaseSchema.extend({
  intent: z.literal(ShoppingActionEnum.enum.CREATE_ORDER),
  body: CreateOrderFromCheckoutSessionCommandSchema,
});
export type OrderCreationRequestBody = z.infer<
  typeof OrderCreationRequestSchema
>;

export const ShoppingRequestBodySchema = z.discriminatedUnion('intent', [
  SignupRequestSchema,
  PaymentIntentRequestSchema,
  CheckoutSessionRequestSchema,
  OrderCreationRequestSchema,
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
