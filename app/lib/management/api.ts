import type { ApiClient, QueryParams } from '~/lib/api/client';
import type { TableParams } from '~/lib/pagination/types';
import type { GenericServerResponse } from '../api/types';
import {
  PaginatedManagementEntitySchema,
  type PaginatedManagementEntity,
  type ProductDeletionRequestBody,
  type ProductEditionRequestBody,
} from './types';

/**
 * Paginated submissions with advanced filtering. Ready to be watched by an admin.
 */
export async function listProducts(
  filter: Partial<any>,
  params: TableParams,
  client: ApiClient
): Promise<PaginatedManagementEntity | null> {
  try {
    const queryParams: QueryParams = {
      page: params.page,
      size: params.size,
      sort: params.sort,
      direction: params.direction,

      // Filters - The API client will handle serialization
      ...filter,
    };

    const response = await client.get(`/products`, {}, queryParams);

    return PaginatedManagementEntitySchema.parse(response);
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw error;
  }
}

export async function updateProduct(
  requestBody: ProductEditionRequestBody,
  client: ApiClient
): Promise<any> {
  try {
    const productId = requestBody.body.productId;
    const payload = requestBody.body.newProductData;

    const response = await client.put<any>(
      `/product/${productId}/update`,
      payload
    );
    return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(
  requestBody: ProductDeletionRequestBody,
  client: ApiClient
): Promise<GenericServerResponse> {
  try {
    const productId = requestBody.body.productId;

    const response = await client.delete<any>(`/product/${productId}`);
    if (!response) {
      return {
        message: 'Error deleting product',
        success: false,
      };
    }

    return {
      message: 'Product successfully deleted',
      success: true,
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}
