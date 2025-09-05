import type { ApiClient, QueryParams } from '~/lib/api/client';
import type { TableParams } from '~/lib/pagination/types';
import type { GenericServerResponse } from '../api/types';
import {
  PaginatedManagementEntitySchema,
  type BulkTransactionRequestBody,
  type ManagementEntityServerSchema,
  type PaginatedManagementEntity,
  type WithdrawRequestBody,
} from './types';

/**
 * Paginated submissions with advanced filtering. Ready to be watched by an admin.
 */
export async function listMachines(
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

    const response = await client.get<ManagementEntityServerSchema>(
      `/machines/get`,
      {},
      queryParams
    );

    if (!response.success) return null;

    return PaginatedManagementEntitySchema.parse(response.data);
  } catch (error) {
    console.error('Error listing all machines:', error);
    throw error;
  }
}

/**
 * Withdraw a any. For staff and admin roles
 */
export async function withdrawSubmissionAsAdmin(
  withdrawalRequestBody: WithdrawRequestBody,
  client: ApiClient
): Promise<any> {
  try {
    const payload = withdrawalRequestBody.body.payload;
    const submissionId = payload.submissionId;

    const response = await client.post<any>(
      `/submissions/${submissionId}/withdraw`,
      {}
    );
    return response;
  } catch (error) {
    console.error('Error withdrawing any:', error);
    throw error;
  }
}

/**
 * Perform a bulk withdrawal operation only over valid submissions.
 * If an invalid one is present in request body, the transaction will
 * be inmediatly aborted on the server.
 */
export async function doBulkTransactionOfSubmissions(
  bulkWithdrawalRequestBody: BulkTransactionRequestBody,
  client: ApiClient
): Promise<GenericServerResponse> {
  try {
    const payload = bulkWithdrawalRequestBody.body.payload;
    const submissionIds = payload.submissionIds;

    const response = await client.post(
      `/submissions/withdraw/bulk`,
      submissionIds
    );
    if (response != null) {
      return {
        success: true,
        message: `Retiraste ${submissionIds.length} solicitudes exitosamente`,
      };
    } else {
      return { success: false, message: 'error desconocido' };
    }
  } catch (error) {
    console.error('Error performing the bulk withdrawal:', error);
    throw error;
  }
}
