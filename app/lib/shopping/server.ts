import type { ActionFunctionArgs } from 'react-router';
import type { ApiClient } from '../api/client';
import { performSignup } from '../auth/api';
import { setAuthSession } from '../server/auth';
import type { GlobalContextData } from '../server/global-context';
import { createCheckoutSession, createOrderFromCheckoutSession } from './api';
import { ShoppingActionEnum, type ShoppingRequestBody } from './types';

export async function shoppingServerActionHandler(
  requestBody: ShoppingRequestBody,
  authenticatedApiClient: ApiClient,
  actionArgs: ActionFunctionArgs
) {
  const intent = requestBody.intent;
  const context = actionArgs.context;
  const ctx = context as unknown as GlobalContextData;

  if (!requestBody) return null;

  try {
    switch (intent) {
      case 'SIGNUP': {
        const serviceResponse = await performSignup(requestBody);
        setAuthSession(ctx.authSession, serviceResponse);
        return {
          success: true,
          message: ShoppingActionEnum.enum.SIGNUP,
        };
      }

      case 'CREATE_CHECKOUT_SESSION': {
        const serviceResponse = await createCheckoutSession(
          requestBody.body.command,
          requestBody.body.items,
          authenticatedApiClient
        );
        const checkoutSessionResponse = {
          success: true,
          message: ShoppingActionEnum.enum.CREATE_CHECKOUT_SESSION,
          data: serviceResponse,
        };
        return checkoutSessionResponse;
      }

      case 'CREATE_ORDER': {
        const serviceResponse = await createOrderFromCheckoutSession(
          requestBody.body,
          authenticatedApiClient
        );
        const orderResponse = {
          success: true,
          message: ShoppingActionEnum.enum.CREATE_ORDER,
          data: serviceResponse,
        };
        return orderResponse;
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
