import { authenticatedServerClient } from '~/lib/api/client.server';
import { setAuthSession } from '../api/auth';
import type { GenericServerResponse } from '../api/types';
import { performSignup } from '../auth/api';
import { createPaymentIntent } from './api';
import type { PaymentIntentResponseDto, ShoppingRequestBody } from './types';

export async function shoppingServerActionHandler(
  requestBody: ShoppingRequestBody
): Promise<GenericServerResponse<PaymentIntentResponseDto>> {
  const intent = requestBody.intent;
  if (!requestBody) return null;

  try {
    switch (intent) {
      case 'SIGNUP': {
        const serviceResponse = await performSignup(requestBody);
        setAuthSession(serviceResponse);
        return {
          success: true,
          message: 'A new customer has been registered',
        };
      }

      case 'PAYMENT_INTENT': {
        const serviceResponse = await createPaymentIntent(
          requestBody.body.priceId,
          requestBody.body.productId,
          authenticatedServerClient
        );
        return {
          success: true,
          message: 'Payment intent successfully created',
          data: serviceResponse,
        } as GenericServerResponse<PaymentIntentResponseDto>;
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
