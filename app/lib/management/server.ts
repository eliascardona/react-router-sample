import type { ApiClient } from '../api/client';
import type { GenericServerResponse } from '../api/types';
import { deleteProduct, updateProduct } from './api';
import type { ProductManagementRequestBody } from './types';

export async function productManagementActionHandler(
  requestBody: ProductManagementRequestBody,
  authenticatedApiClient: ApiClient
): Promise<GenericServerResponse<any>> {
  const intent = requestBody.intent;
  if (!requestBody) return null;

  try {
    switch (intent) {
      case 'UPDATE': {
        const serviceResponse = await updateProduct(
          requestBody,
          authenticatedApiClient
        );
        return {
          success: true,
          message: 'The product has been successfully updated',
        };
      }

      case 'DELETE': {
        const serviceResponse = await deleteProduct(
          requestBody,
          authenticatedApiClient
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
