import type { ApiClient, QueryParams } from '~/lib/api/client';
import type { TableParams } from '~/lib/pagination/types';
import {
  PaginatedSubmissionsSchema,
  type AdminSubmissionBulkDeletionRequestBody,
  type AdminSubmissionDeletion,
  type AdminSubmissionFilter,
  type BulkWithdrawalRequestBody,
  type PaginatedSubmissions,
  type WithdrawRequestBody,
} from './types';

type GenericServerResponse = {
  success: boolean,
  message: string
}

/**
 * Paginated submissions with advanced filtering. Ready to be watched by an admin.
 */
export async function getAllSubmissionsWithAdvancedFiltering(
  filter: Partial<any>,
  params: TableParams,
  client: ApiClient
): Promise<PaginatedSubmissions> {
  try {
    const queryParams: QueryParams = {
      page: params.page,
      size: params.size,
      sort: params.sort,
      direction: params.direction,

      // Filters - The API client will handle serialization
      ...filter,
    };

    const response = await client.get<PaginatedSubmissions>(
      `/submissions`,
      {},
      queryParams
    );

    return PaginatedSubmissionsSchema.parse(response);
  } catch (error) {
    console.error(
      'Error fetching admin submissions with advanced filtering:',
      error
    );
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
export async function doBulkWithdrawalOfSubmissions(
  bulkWithdrawalRequestBody: BulkWithdrawalRequestBody,
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

/**
 * Delete a any. For staff and admin roles
 */
export async function deleteSubmissionAsAdmin(
  withdrawalRequestBody: AdminSubmissionDeletion,
  client: ApiClient
): Promise<GenericServerResponse> {
  try {
    const context = withdrawalRequestBody.body.context;
    const payload = withdrawalRequestBody.body.payload;
    const submissionId = payload.submissionId;

    const response = await client.delete(`/submissions/${submissionId}`, {});
    if (response != null) {
      return {
        success: true,
        message: `La solicitud ${context.submissionIdentifier} ha sido eliminada`,
      };
    } else {
      return { success: false, message: 'error desconocido' };
    }
  } catch (error) {
    console.error('Error deleting any:', error);
    throw error;
  }
}

/**
 * Perform a bulk deletion over submissions (admin side)
 */
export async function doAdminSubmissionsBulkDeletion(
  bulkWithdrawalRequestBody: AdminSubmissionBulkDeletionRequestBody,
  client: ApiClient
): Promise<GenericServerResponse> {
  try {
    const payload = bulkWithdrawalRequestBody.body.payload;
    const submissionIds = payload.submissionIds;

    const response = await client.delete(
      `/submissions/delete/bulk`,
      submissionIds
    );
    if (response != null) {
      return {
        success: true,
        message: `Eliminaste ${submissionIds.length} solicitudes exitosamente`,
      };
    } else {
      return { success: false, message: 'error desconocido' };
    }
  } catch (error) {
    console.error('Error performing the bulk deletion of submissions:', error);
    throw error;
  }
}
