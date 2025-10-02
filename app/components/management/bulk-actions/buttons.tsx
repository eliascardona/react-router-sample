import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import type { BulkActionItem } from '../table/table-toolbar';

interface BulkActionsButtonsProps {
  bulkActions: BulkActionItem[];
}

export function BulkActionsButtons({ bulkActions }: BulkActionsButtonsProps) {
  return (
    <>
      {bulkActions.map((action) => (
        <Button
          key={action.alias}
          variant="outline"
          size="sm"
          className={cn(
            'border border-dashed',
            action.action === 'DELETE'
              ? 'border-red-600 bg-red-200 text-red-800 hover:bg-red-200 hover:text-red-900'
              : 'border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-300 hover:text-blue-800'
          )}
          onClick={action.onClick}>
          {action.alias}
        </Button>
      ))}
    </>
  );
}
