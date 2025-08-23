import type { Row } from '@tanstack/react-table';
import { Copy, MoreHorizontal, UserPlus } from 'lucide-react';
import { useMemo } from 'react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import type { SubmissionManagementAction } from '~/lib/management/types';
import { useSubmissionManagementModal } from '~/lib/management/utils/management-data-context';
import {
  disableDropdownMenuItem,
  type MenuItem,
} from '~/lib/management/utils/utils';

interface DataTableRowActionsHandlerProps<TData> {
  row: Row<TData>;
  hideActions: boolean;
  canWithdrawSubmission: boolean;
}

export function DataTableRowActionsHandler<TData>({
  row,
  hideActions,
  canWithdrawSubmission,
}: DataTableRowActionsHandlerProps<TData>) {
  if (hideActions) return null;
  return (
    <DataTableRowActions
      row={row}
      canWithdrawSubmission={canWithdrawSubmission}
    />
  );
}

function DataTableRowActions<TData>({
  row,
  canWithdrawSubmission,
}: {
  row: Row<TData>;
  canWithdrawSubmission: boolean;
}) {
  const { openSingleModal } = useSubmissionManagementModal();
  const submission = row.original as any;

  const menuItems = useMemo(
    () => [
      {
        label: 'Retirar solicitud',
        icon: <UserPlus className="mr-2 h-4 w-4" />,
        action: 'WITHDRAW_SUBMISSION' as SubmissionManagementAction,
      },
      {
        label: 'Eliminar solicitud',
        icon: <UserPlus className="mr-2 h-4 w-4" />,
        action: 'DELETE_SUBMISSION' as SubmissionManagementAction,
      },
    ],
    []
  ) as MenuItem[];

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          {menuItems.map((item, idx) => (
            <DropdownMenuItem
              key={idx}
              disabled={disableDropdownMenuItem(item, canWithdrawSubmission)}
              onClick={() => {
                openSingleModal(item.action, submission);
              }}>
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Otras acciones</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText('No disponible')}>
            <Copy className="size-4" />
            Copiar el folio de la solicitud
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
