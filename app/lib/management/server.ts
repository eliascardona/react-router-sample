import { authenticatedServerClient } from '~/lib/api/client.server';
import type { GenericServerResponse } from '../api/types';
import {
  doBulkTransactionOfSubmissions,
  withdrawSubmissionAsAdmin,
} from './api';
import type {
  BulkTransactionRequestBody,
  EntityManagementRequestBody,
  WithdrawRequestBody,
} from './types';

export async function submissionManagementActionHandler(
  requestBody: EntityManagementRequestBody
): Promise<GenericServerResponse> {
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
        const serviceResponse = await doBulkTransactionOfSubmissions(
          requestBody as BulkTransactionRequestBody,
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
