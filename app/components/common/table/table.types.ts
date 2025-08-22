import type { ColumnDef } from '@tanstack/react-table';

export interface BaseTableFilter {
  search?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any;
}

export interface TableData<TData> {
  content: TData[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

export interface SimpleDataTableProps<TData> {
  data: TableData<TData>;
  columns: ColumnDef<TData>[];
  filterComponent?: React.ComponentType<{ table: any }>;
  emptyMessage?: string;
  title?: string;
  actions?: React.ReactNode;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}
