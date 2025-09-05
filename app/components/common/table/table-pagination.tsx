import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

interface TablePaginationProps {
  // Required data props
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;

  // Optional customization
  pageSizeOptions?: number[];
  showSelection?: boolean;
  selectedCount?: number;
  isLoading?: boolean;
  isPlaceholderData?: boolean;
  className?: string;

  // Optional callbacks - if not provided, will use URL parameters
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  // Labels for internationalization
  labels?: {
    rowsPerPage?: string;
    page?: string;
    showing?: string;
    results?: string;
    selected?: string;
    of?: string;
    goToFirst?: string;
    goToPrevious?: string;
    goToNext?: string;
    goToLast?: string;
  };
}

export function TablePagination({
  currentPage,
  pageSize,
  totalPages,
  totalCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
  showSelection = false,
  selectedCount = 0,
  isLoading = false,
  isPlaceholderData = false,
  className = '',
  onPageChange,
  onPageSizeChange,
  labels = {},
}: TablePaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultLabels = {
    rowsPerPage: 'Filas por página',
    page: 'Página',
    showing: 'Mostrando',
    results: 'resultados',
    selected: 'seleccionados',
    of: 'de',
    goToFirst: 'Ir a la primera página',
    goToPrevious: 'Ir a la página anterior',
    goToNext: 'Ir a la siguiente página',
    goToLast: 'Ir a la última página',
    ...labels,
  };

  const startIndex = totalCount > 0 ? currentPage * pageSize + 1 : 0;
  const endIndex = Math.min((currentPage + 1) * pageSize, totalCount);

  const canPrevious = currentPage > 0;
  const canNext = currentPage < totalPages - 1;

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('page', (newPage + 1).toString());
      setSearchParams(newParams);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('size', newSize.toString());
      newParams.set('page', '1');
      setSearchParams(newParams);
    }
  };

  return (
    <div
      className={`bg-muted/20 flex items-center justify-between border-t px-4 py-3 ${className}`}>
      {/* Left side: Results info */}
      <div className="text-muted-foreground flex-1 text-sm">
        {totalCount > 0 ? (
          <>
            {defaultLabels.showing} {startIndex} a {endIndex} {defaultLabels.of}{' '}
            {totalCount.toLocaleString()} {defaultLabels.results}
          </>
        ) : (
          'Sin resultados'
        )}
        {showSelection && selectedCount > 0 && (
          <span className="ml-2">
            ({selectedCount} {defaultLabels.selected})
          </span>
        )}
      </div>

      {/* Right side: Pagination controls */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* Page size selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            {defaultLabels.rowsPerPage}
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
            disabled={isLoading}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="flex min-w-[120px] items-center justify-center text-sm font-medium">
          {defaultLabels.page} {currentPage + 1} {defaultLabels.of}{' '}
          {totalPages || 1}
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-2">
          {/* First page */}
          <Button
            variant="outline"
            size="sm"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(0)}
            disabled={!canPrevious || isLoading}>
            <span className="sr-only">{defaultLabels.goToFirst}</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!canPrevious || isLoading}>
            <span className="sr-only">{defaultLabels.goToPrevious}</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Next page */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!canNext || isLoading || isPlaceholderData}>
            <span className="sr-only">{defaultLabels.goToNext}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            size="sm"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={!canNext || isLoading || isPlaceholderData}>
            <span className="sr-only">{defaultLabels.goToLast}</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
