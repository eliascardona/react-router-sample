import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigation, useSearchParams } from 'react-router';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { TablePagination } from './table-pagination';
import type { BaseTableFilter, SimpleDataTableProps } from './table.types';

export function GenericDataTable<TData>({
  data,
  columns,
  filterComponent: FilterComponent,
  emptyMessage = 'No se encontraron resultados',
  title,
  actions,
  columnLabels = {},
  showSelection = true,
  pageSizeOptions = [10, 20, 30, 40, 50],
  initialColumnVisibility,
  onPageChange,
  onPageSizeChange,
}: SimpleDataTableProps<TData> & {
  columnLabels?: Record<string, string>;
  showSelection?: boolean;
  pageSizeOptions?: number[];
  initialColumnVisibility?: VisibilityState;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const isNavigating = navigation.state === 'loading';

  const memoizedData = useMemo(() => data.content, [data.content]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const sort = searchParams.get('sort') || '';
  const direction = searchParams.get('direction') || 'asc';

  const sorting: SortingState = useMemo(
    () => (sort ? [{ id: sort, desc: direction === 'desc' }] : []),
    [sort, direction]
  );

  const pagination = useMemo(
    () => ({
      pageIndex: data.page,
      pageSize: data.size,
    }),
    [data.page, data.size]
  );

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialColumnVisibility || {}
  );

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: data.totalPages,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnVisibility,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      const newParams = new URLSearchParams(searchParams);

      if (newSorting.length === 0) {
        newParams.delete('sort');
        newParams.delete('direction');
      } else {
        const sort = newSorting[0];
        newParams.set('sort', sort.id);
        newParams.set('direction', sort.desc ? 'desc' : 'asc');
      }

      newParams.set('page', '1');
      setSearchParams(newParams);
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const selectedCount = showSelection
    ? table.getFilteredSelectedRowModel().rows.length
    : 0;
  const filters = useMemo(
    () => Object.fromEntries(searchParams) as BaseTableFilter,
    [searchParams]
  );

  return (
    <div className="space-y-6">
      {FilterComponent && <FilterComponent table={table} />}

      {actions && (
        <div className="flex items-center justify-between p-4">{actions}</div>
      )}
      <div className="bg-background rounded-md border">
        <div className="relative">
          {isNavigating && (
            <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center rounded-md">
              <div className="text-muted-foreground bg-background flex items-center gap-2 rounded-md border px-3 py-2 text-sm shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Cargando...
              </div>
            </div>
          )}

          <Table>
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={memoizedColumns.length}
                    className="text-muted-foreground h-24 text-center">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          currentPage={data.page}
          pageSize={data.size}
          totalPages={data.totalPages}
          totalCount={data.totalElements}
          pageSizeOptions={pageSizeOptions}
          showSelection={showSelection}
          selectedCount={selectedCount}
          isLoading={isNavigating}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
