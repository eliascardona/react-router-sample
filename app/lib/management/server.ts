import { authenticatedServerClient } from '~/lib/api/client.server';
import type { GenericServerResponse } from '../api/types';
import { deleteProduct, updateProduct } from './api';
import type {
  ProductDeletionRequestBody,
  ProductEditionRequestBody,
  ProductManagementRequestBody,
} from './types';

export async function productManagementActionHandler(
  requestBody: ProductManagementRequestBody
): Promise<GenericServerResponse> {
  const intent = requestBody.intent;
  if (!requestBody) return null;

  try {
    switch (intent) {
      case 'UPDATE': {
        const serviceResponse = await updateProduct(
          requestBody as ProductEditionRequestBody,
          authenticatedServerClient
        );
        return {
          success: true,
          message: 'The product has been successfully updated',
        };
      }

      case 'DELETE': {
        const serviceResponse = await deleteProduct(
          requestBody as ProductDeletionRequestBody,
          authenticatedServerClient
        );
        return serviceResponse;
      }

      default:
        return {
          success: false,
          message: 'Modo de asignación no válido',
        };
    }
  } catch (error) {
    console.error(
      'Error performing the submission management operation task:',
      error
    );
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return null;
  }
}
