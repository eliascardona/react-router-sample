import type { Route } from '.react-router/types/app/routes/+types/app.programas.$programId.solicitudes._index';
import { authenticatedServerClient } from '~/lib/api/client.server';
import type { ActionHandlerResponse } from '~/lib/api/types';
import {
  deleteSubmissionAsAdmin,
  doAdminSubmissionsBulkDeletion,
  doBulkWithdrawalOfSubmissions,
  withdrawSubmissionAsAdmin,
} from './api';
import type {
  AdminSubmissionBulkDeletionRequestBody,
  AdminSubmissionDeletion,
  BulkWithdrawalRequestBody,
  SubmissionManagementRequestBody,
  WithdrawRequestBody,
} from './types';

export async function submissionManagementActionHandler(
  requestBody: SubmissionManagementRequestBody,
  request: Route.ActionArgs
): Promise<ActionHandlerResponse> {
  const intent = requestBody.intent;
  if (!requestBody) return null;

  try {
    switch (intent) {
      case 'WITHDRAW_SUBMISSION': {
        const serviceResponse = await withdrawSubmissionAsAdmin(
          requestBody as WithdrawRequestBody,
          authenticatedServerClient
        );
        return {
          success: true,
          message: `La solicitud ${serviceResponse.submissionIdentifier} ha sido retirada`,
        };
      }

      case 'BULK_WITHDRAWAL': {
        const serviceResponse = await doBulkWithdrawalOfSubmissions(
          requestBody as BulkWithdrawalRequestBody,
          authenticatedServerClient
        );
        return serviceResponse;
      }

      case 'DELETE_SUBMISSION': {
        const serviceResponse = await deleteSubmissionAsAdmin(
          requestBody as AdminSubmissionDeletion,
          authenticatedServerClient
        );
        return serviceResponse;
      }

      case 'BULK_DELETION': {
        const serviceResponse = await doAdminSubmissionsBulkDeletion(
          requestBody as AdminSubmissionBulkDeletionRequestBody,
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
