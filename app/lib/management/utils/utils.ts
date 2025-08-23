import type { JSX } from 'react';
import { useNavigation, useSubmit } from 'react-router';
import type { TableParams } from '~/lib/pagination/types';
import {
  type AdminSubmissionFilter,
  type SubmissionManagementAction,
  type SubmissionManagementRequestBody,
  type SubmissionStatus,
} from '../types';

/**
 * Utility to parse search params back to filter and table params
 * This is useful for React Router v7 loaders
 */
export const parseSearchParamsToSubmissionFilters = (
  searchParams: URLSearchParams
): { filter: Partial<AdminSubmissionFilter>; params: TableParams } => {
  const filter: Partial<AdminSubmissionFilter> = {};
  // Parse pagination params - Convert from 1-based URL param to 0-based for backend
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const zeroBasedPage = Math.max(0, pageFromUrl - 1); // Convert 1-based to 0-based

  const params: TableParams = {
    page: zeroBasedPage, // 0-based page index for backend
    size: parseInt(searchParams.get('size') || '10', 10),
    sort: searchParams.get('sort') || undefined,
    direction: (searchParams.get('direction') as 'asc' | 'desc') || undefined,
  };

  // Parse string filter fields
  const query = searchParams.get('query');
  if (query) filter.query = query;

  const programId = searchParams.get('programId');
  if (programId) filter.programId = programId;

  const submissionIdentifier = searchParams.get('submissionIdentifier');
  if (submissionIdentifier) filter.submissionIdentifier = submissionIdentifier;

  // Parse array fields
  const statuses = searchParams.getAll('status');
  if (statuses.length > 0) {
    filter.status = [...statuses] as SubmissionStatus[];
  }

  // Parse date fields - keeping them as ISO strings since that's what your schema expects
  const dateFields = [
    'createdFrom',
    'createdTo',
    'assignedFrom',
    'assignedTo',
    'deadlineFrom',
    'deadlineTo',
  ] as const;

  dateFields.forEach((field) => {
    const value = searchParams.get(field);
    if (value) {
      // Validate it's a valid date string before assigning
      try {
        new Date(value); // Just to validate
        filter[field] = value; // Keep as string for your schema
      } catch (e) {
        console.warn(`Invalid date for ${field}:`, value);
      }
    }
  });

  return { filter, params };
};

export function getSubmissionStatusTranslation(status: SubmissionStatus) {
  switch (status) {
    case 'DRAFT':
      return 'Borrador';
    case 'SUBMITTED':
      return 'Enviado';
    case 'IN_REVIEW':
      return 'En revisión';
    case 'APPROVED':
      return 'Aprobado';
    case 'REJECTED':
      return 'Rechazado';
    case 'WITHDRAWN':
      return 'Retirado';
    default:
      return '-';
  }
}

export function useSubmissionManagementActionTrigger(programId: string) {
  const submit = useSubmit();
  const navigation = useNavigation();

  const triggerAction = (formValues: SubmissionManagementRequestBody) => {
    submit(formValues, {
      method: 'POST',
      action: `/app/programas/${programId}/solicitudes`,
      encType: 'application/json',
    });
  };
  const isSubmittingForm = navigation.state === 'submitting';

  return {
    triggerAction,
    isSubmittingForm,
  };
}

export type MenuItem = {
  label: string;
  icon: JSX.Element;
  action: SubmissionManagementAction;
};

export function disableDropdownMenuItem(
  item: MenuItem,
  canWithdrawSubmission: boolean
) {
  if (!canWithdrawSubmission && item.action === 'WITHDRAW_SUBMISSION') {
    return true;
  }

  if (!canWithdrawSubmission && item.action === 'BULK_WITHDRAWAL') {
    return true;
  }

  return false;
}
