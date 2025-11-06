import type { ApiClient } from '../api/client';
import { ChargeInfoDtoSchema, type ChargeInfoDto } from './types';

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
): Promise<any> {
  try {
    const response = await client.post<any>(`/stripe/intent/create`, {
      priceId,
      productId,
    });
    return response;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}
