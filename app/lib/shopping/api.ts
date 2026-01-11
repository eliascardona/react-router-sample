import type { ApiClient } from '../api/client';
import {
  ChargeInfoDtoSchema,
  type ChargeInfoDto,
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
