import { authenticatedServerClient } from '~/lib/api/client.server';
import { setAuthSession } from '../api/auth';
import type { GenericServerResponse } from '../api/types';
import { performSignup } from '../auth/api';
import { createPaymentIntent } from './api';
import type { ShoppingRequestBody } from './types';

export async function shoppingServerActionHandler(
  requestBody: ShoppingRequestBody
): Promise<GenericServerResponse> {
  const intent = requestBody.intent;
  if (!requestBody) return null;

  try {
    switch (intent) {
      case 'SIGNUP': {
        const serviceResponse = await performSignup(requestBody);
        setAuthSession(serviceResponse);
        return {
          success: true,
          message: 'The product has been successfully updated',
        };
      }

      case 'PAYMENT_INTENT': {
        const serviceResponse = await createPaymentIntent(
          requestBody.body.priceId,
          authenticatedServerClient
        );
        return serviceResponse;
      }

      default:
        return {
          success: false,
          message: 'Invalid server action intent',
        };
    }
  } catch (error: any) {
    console.error(
      'Error performing shopping server action:',
      error.message || 'null'
    );
    return null;
  }
}
