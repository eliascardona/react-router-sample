import { CalendarIcon, Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import type { DateRange } from '~/lib/management/utils/table';
import { cn } from '~/lib/utils';
import { ProgramSwitcher } from './program-switcher';

interface TableToolbarProps {
  children?: React.ReactNode;
  searchPlaceholder?: string;
  searchName?: string;
  showSearch?: boolean;
  showClearFilters?: boolean;
  showDateRanges?: boolean;
  mainFilters?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  searchClassName?: string;
  clearFiltersLabel?: string;
  showProgramSwitcher?: boolean;
  dateRanges?: DateRange[];
  dateRangeLabel?: string;
}

const defaultDateRanges: DateRange[] = [
  {
    label: 'Hoy',
    fromParam: 'createdFrom',
    toParam: 'createdTo',
    getValue: () => {
      const today = new Date();
      // Set to start of day for 'from' and end of day for 'to'
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      );

      // Format as LocalDateTime (YYYY-MM-DDTHH:mm:ss) without timezone
      const formatLocalDateTime = (date: Date) => {
        return (
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0') +
          'T' +
          String(date.getHours()).padStart(2, '0') +
          ':' +
          String(date.getMinutes()).padStart(2, '0') +
          ':' +
          String(date.getSeconds()).padStart(2, '0')
        );
      };

      return {
        from: formatLocalDateTime(startOfDay),
        to: formatLocalDateTime(endOfDay),
      };
    },
  },
  {
    label: 'Últimos 7 días',
    fromParam: 'createdFrom',
    toParam: 'createdTo',
    getValue: () => {
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      // Start of week ago day, end of today
      const startOfWeekAgo = new Date(
        weekAgo.getFullYear(),
        weekAgo.getMonth(),
        weekAgo.getDate()
      );
      const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      );

      const formatLocalDateTime = (date: Date) => {
        return (
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0') +
          'T' +
          String(date.getHours()).padStart(2, '0') +
          ':' +
          String(date.getMinutes()).padStart(2, '0') +
          ':' +
          String(date.getSeconds()).padStart(2, '0')
        );
      };

      return {
        from: formatLocalDateTime(startOfWeekAgo),
        to: formatLocalDateTime(endOfToday),
      };
    },
  },
  {
    label: 'Últimos 30 días',
    fromParam: 'createdFrom',
    toParam: 'createdTo',
    getValue: () => {
      const today = new Date();
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      const startOfMonthAgo = new Date(
        monthAgo.getFullYear(),
        monthAgo.getMonth(),
        monthAgo.getDate()
      );
      const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      );

      const formatLocalDateTime = (date: Date) => {
        return (
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0') +
          'T' +
          String(date.getHours()).padStart(2, '0') +
          ':' +
          String(date.getMinutes()).padStart(2, '0') +
          ':' +
          String(date.getSeconds()).padStart(2, '0')
        );
      };

      return {
        from: formatLocalDateTime(startOfMonthAgo),
        to: formatLocalDateTime(endOfToday),
      };
    },
  },
  {
    label: 'Últimos 3 meses',
    fromParam: 'createdFrom',
    toParam: 'createdTo',
    getValue: () => {
      const today = new Date();
      const threeMonthsAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        today.getDate()
      );
      const startOfThreeMonthsAgo = new Date(
        threeMonthsAgo.getFullYear(),
        threeMonthsAgo.getMonth(),
        threeMonthsAgo.getDate()
      );
      const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      );

      const formatLocalDateTime = (date: Date) => {
        return (
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0') +
          'T' +
          String(date.getHours()).padStart(2, '0') +
          ':' +
          String(date.getMinutes()).padStart(2, '0') +
          ':' +
          String(date.getSeconds()).padStart(2, '0')
        );
      };

      return {
        from: formatLocalDateTime(startOfThreeMonthsAgo),
        to: formatLocalDateTime(endOfToday),
      };
    },
  },
  {
    label: 'Este año',
    fromParam: 'createdFrom',
    toParam: 'createdTo',
    getValue: () => {
      const today = new Date();
      const yearStart = new Date(today.getFullYear(), 0, 1); // January 1st
      const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      );

      const formatLocalDateTime = (date: Date) => {
        return (
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0') +
          'T' +
          String(date.getHours()).padStart(2, '0') +
          ':' +
          String(date.getMinutes()).padStart(2, '0') +
          ':' +
          String(date.getSeconds()).padStart(2, '0')
        );
      };

      return {
        from: formatLocalDateTime(yearStart),
        to: formatLocalDateTime(endOfToday),
      };
    },
  },
  {
    label: 'Año pasado',
    fromParam: 'createdFrom',
    toParam: 'createdTo',
    getValue: () => {
      const thisYear = new Date().getFullYear();
      const lastYearStart = new Date(thisYear - 1, 0, 1); // January 1st of last year
      const lastYearEnd = new Date(thisYear - 1, 11, 31, 23, 59, 59); // December 31st of last year

      const formatLocalDateTime = (date: Date) => {
        return (
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0') +
          'T' +
          String(date.getHours()).padStart(2, '0') +
          ':' +
          String(date.getMinutes()).padStart(2, '0') +
          ':' +
          String(date.getSeconds()).padStart(2, '0')
        );
      };

      return {
        from: formatLocalDateTime(lastYearStart),
        to: formatLocalDateTime(lastYearEnd),
      };
    },
  },
];

export function TableToolbar({
  children,
  searchPlaceholder = 'Buscar...',
  searchName = 'query',
  showSearch = true,
  showClearFilters = true,
  showDateRanges = true,
  mainFilters,
  actions,
  className = '',
  searchClassName,
  clearFiltersLabel,
  showProgramSwitcher = true,
  dateRanges = defaultDateRanges,
  dateRangeLabel = 'Período',
}: TableToolbarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Check if any filters are active (excluding pagination and sorting)
  const hasActiveFilters = Array.from(searchParams.keys()).some(
    (key) =>
      !['page', 'size', 'sortBy', 'sortOrder'].includes(key) &&
      searchParams.get(key)
  );

  // Get active date range if any
  const getActiveDateRange = (): DateRange | null => {
    for (const range of dateRanges) {
      const fromValue = searchParams.get(range.fromParam);
      const toValue = searchParams.get(range.toParam);

      if (fromValue && toValue) {
        const rangeValues = range.getValue();
        if (fromValue === rangeValues.from && toValue === rangeValues.to) {
          return range;
        }
      }
    }
    return null;
  };

  const activeDateRange = getActiveDateRange();

  const handleClearFilters = () => {
    // Keep only pagination, sorting, and programId params when clearing
    const newParams = new URLSearchParams();
    const page = searchParams.get('page');
    const size = searchParams.get('size');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');
    const programId = searchParams.get('programId');

    if (page) newParams.set('page', '0'); // Reset to first page
    if (size) newParams.set('size', size);
    if (sortBy) newParams.set('sortBy', sortBy);
    if (sortOrder) newParams.set('sortOrder', sortOrder);
    if (programId) newParams.set('programId', programId);

    setSearchParams(newParams, { replace: true });

    // Clear the search input value manually
    const searchInput = document.querySelector(
      `input[name="${searchName}"]`
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  };

  const handleDateRangeSelect = (range: DateRange) => {
    const values = range.getValue();
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(range.fromParam, values.from);
    newSearchParams.set(range.toParam, values.to);
    newSearchParams.set('page', '0'); // Reset pagination

    setSearchParams(newSearchParams, { replace: true });
  };

  const handleClearDateRange = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Remove all possible date range parameters
    dateRanges.forEach((range) => {
      newSearchParams.delete(range.fromParam);
      newSearchParams.delete(range.toParam);
    });

    newSearchParams.set('page', '0');
    setSearchParams(newSearchParams, { replace: true });
  };

  return (
    <div className={cn('space-y-3', className)}>
      {/* First row: Program Switcher + Custom children + Search */}
      <div className="flex items-center gap-4">
        {/* Program Switcher */}
        {showProgramSwitcher && (
          <div className="max-w-sm min-w-0 shrink-0">
            <ProgramSwitcher />
          </div>
        )}

        {/* Custom children */}
        {children && <div className="min-w-0 flex-1">{children}</div>}
        {/* Search input */}
        {showSearch && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const searchValue = formData.get(searchName)?.toString() || '';

              const newSearchParams = new URLSearchParams(searchParams);
              if (searchValue.trim()) {
                newSearchParams.set(searchName, searchValue);
              } else {
                newSearchParams.delete(searchName);
              }
              newSearchParams.set('page', '0');

              setSearchParams(newSearchParams, { replace: true });
            }}
            className={cn('relative w-80 max-w-sm shrink-0', searchClassName)}>
            <div className="group relative flex items-center">
              <Search className="text-muted-foreground pointer-events-none absolute left-2 z-10 h-4 w-4" />
              <Input
                name={searchName}
                placeholder={searchPlaceholder}
                defaultValue={searchParams.get(searchName) || ''}
                key={searchParams.get(searchName) || 'empty'}
                className="h-8 w-full pr-12 pl-8 transition-all duration-200"
              />
              <Button
                type="submit"
                size="sm"
                variant="default"
                className="hover:bg-primary hover:text-primary-foreground absolute right-1 h-6 w-6 p-0 transition-colors">
                <Search className="h-3 w-3" />
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Second row: Date Range + Main filters + Actions */}
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Date Range + Main filters */}
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1">
          {/* Date Range Dropdown */}
          {showDateRanges && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    'h-8 min-w-fit border-dashed transition-colors',
                    activeDateRange &&
                      'border-primary bg-primary/10 text-primary'
                  )}>
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {activeDateRange ? activeDateRange.label : dateRangeLabel}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel className="text-muted-foreground text-xs">
                  Seleccionar período
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dateRanges.map((range, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleDateRangeSelect(range)}
                    className={cn(
                      'cursor-pointer text-sm',
                      activeDateRange?.label === range.label &&
                        'bg-accent text-accent-foreground'
                    )}>
                    {range.label}
                  </DropdownMenuItem>
                ))}
                {activeDateRange && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleClearDateRange}
                      className="text-destructive focus:text-destructive cursor-pointer text-sm">
                      <X className="mr-2 h-3 w-3" />
                      Limpiar período
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Main filters */}
          {mainFilters}
        </div>

        {/* Right side: Clear + Custom Actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Clear all filters button */}
          {showClearFilters && hasActiveFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilters}
              size="sm"
              className="text-destructive hover:bg-destructive/10 hover:border-destructive/20 h-8 transition-all duration-200">
              <X className="mr-1 h-4 w-4" />
              {clearFiltersLabel && (
                <span className="hidden sm:inline">{clearFiltersLabel}</span>
              )}
              {!clearFiltersLabel && <span className="sm:hidden">Limpiar</span>}
            </Button>
          )}

          {/* Custom actions */}
          {actions}
        </div>
      </div>
    </div>
  );
}
