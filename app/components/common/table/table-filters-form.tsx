import { Form, useNavigation } from 'react-router';
import { cn } from '~/lib/utils';
import { TableToolbar } from './table-toolbar';

interface TableFiltersFormProps {
  children?: React.ReactNode; // For ProgramSwitcher, etc.
  searchPlaceholder?: string;
  searchName?: string;
  showSearch?: boolean;
  showAdvancedToggle?: boolean;
  showClearFilters?: boolean;
  mainFilters?: React.ReactNode;
  advancedFilters?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  formClassName?: string;
  submitButton?: React.ReactNode;
  autoSubmitInputs?: boolean;
}

export function TableFiltersForm({
  children,
  searchPlaceholder = 'Buscar...',
  searchName = 'search',
  showSearch = true,
  showAdvancedToggle = true,
  showClearFilters = true,
  mainFilters,
  advancedFilters,
  actions,
  className = '',
  formClassName = '',
  submitButton,
  autoSubmitInputs = true,
}: TableFiltersFormProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className={className}>
      <Form method="get" className={cn('space-y-4', formClassName)}>
        {/* Hidden inputs for pagination reset */}
        <input type="hidden" name="page" value="0" />

        <TableToolbar
          searchPlaceholder={searchPlaceholder}
          searchName={searchName}
          showSearch={showSearch}
          showClearFilters={showClearFilters}
          mainFilters={mainFilters}
          actions={actions}>
          {children}
        </TableToolbar>

        {/* Optional submit button */}
        {submitButton && <div className="flex justify-end">{submitButton}</div>}
      </Form>
    </div>
  );
}
