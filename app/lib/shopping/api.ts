import type { ApiClient } from '../api/client';
import {
  ChargeInfoDtoSchema,
  type ChargeInfoDto,
  type CheckoutSessionItemDto,
  type CreateCheckoutSessionCommand,
  type CreateOrderFromCheckoutSessionCommand,
  type PaymentIntentResponseDto,
} from './types';

/**
 * @TODO
 * Add the triggers for the following endpoints:
 *      /api/checkout-session
 *                /create
 *                /append-item
 *                /lock
 * 
 *      /api/orders
 *                /create
 */

export async function searchStripePriceByProductId(
  productId: string,
  client: ApiClient
): Promise<ChargeInfoDto> {
  try {
    const response = await client.get<ChargeInfoDto>(
      `/stripe/price/search`,
      {},
      { productId }
    );

    return ChargeInfoDtoSchema.parse(response);
  } catch (error) {
    console.error('Error searching stripe price:', error);
    throw error;
  }
}

export async function createPaymentIntent(
  priceId: string,
  productId: string,
  client: ApiClient
): Promise<PaymentIntentResponseDto> {
  try {
    const response = await client.post<PaymentIntentResponseDto>(
      `/stripe/intent/create`,
      {
        priceId,
        productId,
      }
    );
    console.log('\n----------- PAYMENT INTENT RESPONSE IS \n', response);

    return response;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function createCheckoutSession(
  command: CreateCheckoutSessionCommand,
  items: CheckoutSessionItemDto[] | null,
  client: ApiClient
): Promise<any> {
  try {
    const payload = {
      command,
      items,
    };
    console.log(payload);

    const response = await client.post<any>(
      `/checkout-session/create`,
      payload
    );
    console.log('\n----------- CHECKOUT SESSION RESPONSE IS \n', response);

    return response;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createOrderFromCheckoutSession(
  command: CreateOrderFromCheckoutSessionCommand,
  client: ApiClient
): Promise<any> {
  try {
    console.log(command);

    const response = await client.post<any>(
      `/orders/create`,
      command
    );
    console.log('\n----------- ORDER CREATION RESPONSE IS \n', response);

    return response;
  } catch (error) {
    console.error('Error creating order FROM checkout session:', error);
    throw error;
  }
}