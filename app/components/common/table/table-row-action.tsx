import { MoreHorizontal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

// Generic action item interface
export interface TableRowAction<TData = any> {
  type: 'item' | 'separator' | 'label' | 'sub' | 'radio-group';
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  onClick?: (data: TData) => void;
  disabled?: boolean | ((data: TData) => boolean);
  variant?: 'default' | 'destructive';
  className?: string;
  // For sub menus
  children?: TableRowAction<TData>[];
  // For radio groups
  value?: string | ((data: TData) => string);
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  onValueChange?: (value: string, data: TData) => void;
}

interface TableRowActionsProps<TData> {
  data: TData;
  actions: TableRowAction<TData>[];
  triggerClassName?: string;
  contentClassName?: string;
  contentWidth?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  triggerLabel?: string;
}

export function TableRowActions<TData>({
  data,
  actions,
  triggerClassName = 'data-[state=open]:bg-muted flex h-8 w-8 p-0',
  contentClassName = '',
  contentWidth = 'w-[200px]',
  align = 'end',
  side = 'bottom',
  triggerLabel = 'Open menu',
}: TableRowActionsProps<TData>) {
  const renderAction = (action: TableRowAction<TData>, index: number) => {
    const isDisabled =
      typeof action.disabled === 'function'
        ? action.disabled(data)
        : action.disabled;

    switch (action.type) {
      case 'separator':
        return <DropdownMenuSeparator key={index} />;

      case 'label':
        return (
          <DropdownMenuLabel key={index} className={action.className}>
            {action.label}
          </DropdownMenuLabel>
        );

      case 'radio-group':
        if (!action.options || !action.onValueChange) return null;

        const currentValue =
          typeof action.value === 'function'
            ? action.value(data)
            : action.value || '';

        return (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger disabled={isDisabled}>
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={currentValue}
                onValueChange={(value) => action.onValueChange!(value, data)}>
                {action.options.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );

      case 'sub':
        if (!action.children?.length) return null;

        return (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger disabled={isDisabled}>
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {action.children.map((child, childIndex) =>
                renderAction(child, childIndex)
              )}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );

      case 'item':
      default:
        return (
          <DropdownMenuItem
            key={index}
            onClick={() => action.onClick?.(data)}
            disabled={isDisabled}
            className={`${action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''} ${action.className || ''}`}>
            {action.icon && <action.icon className="mr-2 h-4 w-4" />}
            {action.label}
            {action.shortcut && (
              <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={triggerClassName}>
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{triggerLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={`${contentWidth} ${contentClassName}`}>
        {actions.map((action, index) => renderAction(action, index))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
