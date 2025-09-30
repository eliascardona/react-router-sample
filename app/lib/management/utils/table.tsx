import { ArrowUpDown } from 'lucide-react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { PaginationSettingsSchema } from '~/lib/pagination/types';
import type { TableData } from '~/lib/table/types';

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
