import type { ApiClient } from '../api/client';

export async function searchStripePriceByProductId(
  productId: string,
  client: ApiClient
): Promise<any> {
  try {
    const response = await client.get<any>(`/stripe/price`, { productId });
    return response;
  } catch (error) {
    console.error('Error searching stripe price:', error);
    throw error;
  }
}

export async function createPaymentIntent(
  priceId: string,
  client: ApiClient
): Promise<any> {
  try {
    const response = await client.post<any>(`/stripe/intent/create`, {
      priceId,
    });
    return response;
  } catch (error) {
    console.error('Error searching stripe price:', error);
    throw error;
  }
}
