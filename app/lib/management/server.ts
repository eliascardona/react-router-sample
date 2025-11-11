import { authenticatedServerClient } from '~/lib/api/client.server';
import type { GenericServerResponse } from '../api/types';
import { deleteProduct, updateProduct } from './api';
import type { ProductManagementRequestBody } from './types';

export async function productManagementActionHandler(
  requestBody: ProductManagementRequestBody
): Promise<GenericServerResponse<any>> {
  const intent = requestBody.intent;
  if (!requestBody) return null;

  try {
    switch (intent) {
      case 'UPDATE': {
        const serviceResponse = await updateProduct(
          requestBody,
          authenticatedServerClient
        );
        return {
          success: true,
          message: 'The product has been successfully updated',
        };
      }

      case 'DELETE': {
        const serviceResponse = await deleteProduct(
          requestBody,
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
      'Error performing product management server action:',
      error.message || 'null'
    );
    return null;
  }
}
