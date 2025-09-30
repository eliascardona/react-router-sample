import type { JSX } from 'react';
import { useNavigation, useSubmit } from 'react-router';
import type { TableParams } from '~/lib/pagination/types';
import {
  type EntityManagementAction,
  type EntityManagementFilter,
  type ProductManagementRequestBody,
} from '../types';

/**
 * Utility to parse search params back to filter and table params
 * This is useful for React Router v7 loaders
 */
export const parseSearchParamsToApiFilters = (
  searchParams: URLSearchParams
): { filter: Partial<EntityManagementFilter>; params: TableParams } => {
  const filter: Partial<EntityManagementFilter> = {};

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const zeroBasedPage = Math.max(0, pageFromUrl - 1); // Convert 1-based to 0-based

  const params: TableParams = {
    page: zeroBasedPage,
    size: parseInt(searchParams.get('size') || '10', 10),
    sort: searchParams.get('sort') || undefined,
    direction: (searchParams.get('direction') as 'asc' | 'desc') || undefined,
  };

  // Parse string filter fields
  const query = searchParams.get('query');
  if (query) filter.query = query;

  // Parse array fields
  const statuses = searchParams.getAll('status');
  if (statuses.length > 0) {
    filter.status = [...statuses] as string[];
  }

  // Parse date fields - keeping them as ISO strings since that's what your schema expects
  const dateFields = ['createdFrom', 'createdTo'] as const;

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

export function useEntityManagementActionTrigger(programId: string) {
  const submit = useSubmit();
  const navigation = useNavigation();

  const triggerAction = (formValues: ProductManagementRequestBody) => {
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
  action: EntityManagementAction;
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
