import type { ApiClient } from '../api/client';
import { PriceSearchResultSchema, type PriceSearchResult } from './types';

export async function searchStripePriceByProductId(
  productId: string,
  client: ApiClient
): Promise<PriceSearchResult> {
  try {
    const response = await client.get<PriceSearchResult>(
      `/stripe/price/search`,
      {},
      { productId }
    );
    return PriceSearchResultSchema.parse(response);
  } catch (error) {
    console.error('Error searching stripe price:', error);
    throw error;
  }
}

export async function createPaymentIntent(
  priceId: string,
  productId: string,
  productName: string,
  client: ApiClient
): Promise<any> {
  try {
    const response = await client.post<any>(`/stripe/intent/create`, {
      priceId,
      productId,
      productName,
    });
    return response;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}
