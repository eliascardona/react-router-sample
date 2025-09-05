import { ArrowUpDown } from 'lucide-react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { PaginationSettingsSchema } from '~/lib/pagination/types';
import type { TableData } from '~/lib/table/types';
import type { SubmissionStatus } from '../types';

export function getSubmissionStatusBadgeColors(status: SubmissionStatus) {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    case 'SUBMITTED':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'IN_REVIEW':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'APPROVED':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'REJECTED':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'WITHDRAWN':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
}

const PaginatedanySchema = PaginationSettingsSchema.extend({
  content: z.any().array(),
});
export type PaginatedData = z.infer<typeof PaginatedanySchema>;

export function transformPaginatedResultToTableData<T>(
  apiResponse: PaginatedData
): TableData<T> {
  return {
    content: apiResponse.content as T[],
    totalPages: apiResponse.totalPages,
    totalElements: apiResponse.totalElements || 0,
    page: apiResponse.number || 0,
    size: apiResponse.size,
  };
}

export function mapToEntityTableData(originalData: PaginatedData): any[] {
  return originalData.content;
}

// Memoized column header creator
export function createSortableHeader(title: string) {
  return ({ column }: any) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      className="h-auto p-0 font-medium hover:bg-transparent">
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export type DateRangeValue = {
  from: string;
  to: string;
};

export type DateRange = {
  label: string;
  fromParam: string;
  toParam: string;
  getValue: () => DateRangeValue;
};

const createDateRange = (
  daysAgo: number,
  label: string,
  fromParam: string,
  toParam: string
): DateRange => ({
  label,
  fromParam,
  toParam,
  getValue: () => ({}) as DateRangeValue,
});

export const generalDateRanges = [
  createDateRange(0, 'Hoy', 'createdFrom', 'createdTo'),
  createDateRange(1, 'Ayer', 'createdFrom', 'createdTo'),
  createDateRange(7, 'Últimos 7 días', 'createdFrom', 'createdTo'),
  createDateRange(30, 'Últimos 30 días', 'createdFrom', 'createdTo'),
  createDateRange(90, 'Últimos 3 meses', 'createdFrom', 'createdTo'),
  {
    label: 'Este año',
    fromParam: 'createdFrom',
    toParam: 'createdTo',
    getValue: () => {},
  },
  {
    label: 'Año pasado',
    fromParam: 'createdFrom',
    toParam: 'createdTo',
    getValue: () => {},
  },
];
