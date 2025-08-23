export type TableData<TData = any> = {
  /** Table content/rows */
  content: TData[];
  /** Total number of pages */
  totalPages: number;
  /** Total number of elements */
  totalElements: number;
  /** Current page */
  page: number;
  /** Page size */
  size: number;
};
