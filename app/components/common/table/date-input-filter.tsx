import { CalendarIcon, X } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

interface DateInputFilterProps {
  name: string;
  label: string;
  type?: 'date' | 'datetime-local' | 'time';
  className?: string;
  placeholder?: string;
  showIcon?: boolean;
  showClearButton?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export function DateInputFilter({
  name,
  label,
  type = 'date',
  className = '',
  placeholder,
  showIcon = true,
  showClearButton = true,
  size = 'sm',
}: DateInputFilterProps) {
  const [searchParams] = useSearchParams();
  const currentValue = searchParams.get(name) || '';
  const hasValue = Boolean(currentValue);

  const getDateInputValue = (dateString: string): string => {
    if (!dateString) return '';
    try {
      if (type === 'datetime-local') {
        // For datetime-local, we need YYYY-MM-DDTHH:MM format
        return dateString.substring(0, 16);
      }
      if (type === 'time') {
        // For time, we need HH:MM format
        const date = new Date(dateString);
        return date.toTimeString().substring(0, 5);
      }
      // For date, we need YYYY-MM-DD format
      return dateString.split('T')[0];
    } catch {
      return '';
    }
  };

  const clearValue = () => {
    const form = document.querySelector(
      'form[method="get"]'
    ) as HTMLFormElement;
    if (form) {
      const input = form.querySelector(
        `input[name="${name}"]`
      ) as HTMLInputElement;
      if (input) {
        input.value = '';
        // Trigger change event to update form state
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  const inputSizeClasses = {
    sm: 'h-8',
    default: 'h-9',
    lg: 'h-10',
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name} className="text-foreground text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        {showIcon && (
          <CalendarIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        )}
        <Input
          id={name}
          name={name}
          type={type}
          defaultValue={getDateInputValue(currentValue)}
          key={currentValue || 'empty'} // Force re-render when cleared
          placeholder={placeholder}
          className={cn(
            inputSizeClasses[size],
            showIcon && 'pl-10',
            showClearButton && hasValue && 'pr-8',
            'transition-all duration-200',
            hasValue && 'border-primary/20 bg-primary/5'
          )}
          onKeyDown={(e) => {
            // Prevent form submission when pressing Enter in date inputs
            if (e.key === 'Enter') {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
        {showClearButton && hasValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearValue}
            className="hover:bg-destructive/10 hover:text-destructive absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 transform p-0">
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      {hasValue && (
        <p className="text-muted-foreground text-xs">
          Filtro activo:{' '}
          {type === 'date'
            ? 'fecha'
            : type === 'datetime-local'
              ? 'fecha y hora'
              : 'hora'}{' '}
          seleccionada
        </p>
      )}
    </div>
  );
}
