import type { PaginatedData } from '../management/utils/table';

export function generateDataPageBaseFormat(response: any) {
  const dataPageBaseFormat = {
    totalPages: 1,
    totalElements: response.length,
    size: 20,
    number: 0,
    first: true,
    last: false,
    numberOfElements: response.length,
    empty: false,
    content: [],
  } as PaginatedData;

  return dataPageBaseFormat;
}
