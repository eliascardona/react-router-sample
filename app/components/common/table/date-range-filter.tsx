import { CalendarIcon, X } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/lib/utils';

interface DateRangeFilterProps {
  title?: string;
  fromName?: string;
  toName?: string;
  fromLabel?: string;
  toLabel?: string;
  className?: string;
  triggerClassName?: string;
  placeholder?: {
    from?: string;
    to?: string;
  };
}

export function DateRangeFilter({
  title = 'Fecha',
  fromName = 'dateFrom',
  toName = 'dateTo',
  fromLabel = 'Fecha desde',
  toLabel = 'Fecha hasta',
  className = '',
  triggerClassName = 'h-9 border-dashed transition-all duration-200 hover:bg-accent hover:text-accent-foreground',
  placeholder = {},
}: DateRangeFilterProps) {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  // Get current values from URL
  const fromValue = searchParams.get(fromName) || '';
  const toValue = searchParams.get(toName) || '';
  const hasDateFilter = fromValue || toValue;

  // Convert backend date format to date input format (YYYY-MM-DD)
  const getDateInputValue = (dateString: string): string => {
    if (!dateString) return '';
    try {
      // Handle both ISO strings and LocalDateTime format
      return dateString.split('T')[0];
    } catch {
      return '';
    }
  };

  // Format date for display in badge
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Get display text for the button
  const getDisplayText = (): string => {
    if (fromValue && toValue) {
      return `${formatDateForDisplay(fromValue)} - ${formatDateForDisplay(toValue)}`;
    } else if (fromValue) {
      return `Desde ${formatDateForDisplay(fromValue)}`;
    } else if (toValue) {
      return `Hasta ${formatDateForDisplay(toValue)}`;
    }
    return title;
  };

  const clearDates = () => {
    // Clear the input values and close popover
    const form = document.querySelector(
      'form[method="get"]'
    ) as HTMLFormElement;
    if (form) {
      const fromInput = form.querySelector(
        `input[name="${fromName}"]`
      ) as HTMLInputElement;
      const toInput = form.querySelector(
        `input[name="${toName}"]`
      ) as HTMLInputElement;
      if (fromInput) fromInput.value = '';
      if (toInput) toInput.value = '';
    }
    setOpen(false);
  };

  const handleApply = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={hasDateFilter ? 'secondary' : 'outline'}
            size="sm"
            className={cn(
              triggerClassName,
              hasDateFilter &&
                'border-primary/20 bg-primary/5 text-primary hover:bg-primary/10',
              'max-w-[200px] min-w-0 justify-start text-left font-normal'
            )}>
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">{getDisplayText()}</span>
            {hasDateFilter && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 w-5 shrink-0 p-0 text-xs">
                1
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-foreground text-sm font-medium">{title}</h4>
              {hasDateFilter && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearDates}
                  className="text-muted-foreground hover:text-foreground h-8 px-2 text-xs">
                  <X className="mr-1 h-3 w-3" />
                  Limpiar
                </Button>
              )}
            </div>
            <div className={cn('space-y-4', className)}>
              <div className="space-y-2">
                <Label
                  htmlFor={`${fromName}-input`}
                  className="text-sm font-medium">
                  {fromLabel}
                </Label>
                <Input
                  id={`${fromName}-input`}
                  name={fromName}
                  type="date"
                  defaultValue={getDateInputValue(fromValue)}
                  placeholder={placeholder.from}
                  className="h-9"
                  onKeyDown={(e) => {
                    // Prevent form submission when pressing Enter in date inputs
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor={`${toName}-input`}
                  className="text-sm font-medium">
                  {toLabel}
                </Label>
                <Input
                  id={`${toName}-input`}
                  name={toName}
                  type="date"
                  defaultValue={getDateInputValue(toValue)}
                  placeholder={placeholder.to}
                  className="h-9"
                  onKeyDown={(e) => {
                    // Prevent form submission when pressing Enter in date inputs
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                />
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-end">
              <Button
                type="button"
                size="sm"
                onClick={handleApply}
                className="h-8">
                Aplicar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
