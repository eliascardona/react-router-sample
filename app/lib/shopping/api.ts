import { apiClient, type ApiClient } from '../api/client';
import {
  ChargeInfoDtoSchema,
  type ChargeInfoDto,
  type CheckoutSessionItemDto,
  type CheckoutSessionResponseDto,
  type CreateCheckoutSessionCommand,
  type CreateOrderFromCheckoutSessionCommand,
  type OrderResponseDto,
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

export async function createCheckoutSession(
  command: CreateCheckoutSessionCommand,
  items: CheckoutSessionItemDto[] | null,
  client: ApiClient
): Promise<CheckoutSessionResponseDto> {
  try {
    const payload = {
      command,
      items,
    };
    const response = await apiClient.post<CheckoutSessionResponseDto>(
      `/checkout-session/create`,
      payload
    );

    return response;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createOrderFromCheckoutSession(
  command: CreateOrderFromCheckoutSessionCommand,
  client: ApiClient
): Promise<OrderResponseDto> {
  try {
    const response = await apiClient.post<OrderResponseDto>(
      '/order/create/source/checkout-session',
      command
    );
    console.log(
      '--------- ORDER RESPONSE -------------',
      JSON.stringify(response),
      '\n'
    );

    return response;
  } catch (error) {
    console.error('Error creating order FROM checkout session:', error);
    throw error;
  }
}
