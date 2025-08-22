import { Check, PlusCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '~/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';

interface MultiSelectFilterProps {
  name: string;
  title?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  className?: string;
  triggerClassName?: string;
  maxDisplayCount?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  clearLabel?: string;
  applyLabel?: string;
  cancelLabel?: string;
}

export function MultiSelectFilter({
  name,
  title,
  placeholder = 'Seleccionar...',
  options,
  className = '',
  triggerClassName = 'h-8 border-dashed transition-colors',
  maxDisplayCount = 2,
  searchPlaceholder,
  emptyMessage = 'No se encontraron resultados.',
  clearLabel = 'Limpiar',
  applyLabel = 'Aplicar',
  cancelLabel = 'Cancelar',
}: MultiSelectFilterProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Get current selected values from URL (comma-separated)
  const currentValue = searchParams.get(name) || '';
  const urlSelectedValues = currentValue ? currentValue.split(',') : [];

  // Local state for optimistic updates
  const [pendingValues, setPendingValues] =
    useState<string[]>(urlSelectedValues);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync pending values when URL changes (from external sources)
  useEffect(() => {
    setPendingValues(urlSelectedValues);
    setHasChanges(false);
  }, [currentValue]);

  // Use pending values for display (optimistic UI)
  const displayValues = pendingValues;
  const displaySet = new Set(displayValues);
  const hasSelections = displayValues.length > 0;

  const displayTitle = title || placeholder;

  const updateSearchParams = (newValues: string[]) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newValues.length > 0) {
      newSearchParams.set(name, newValues.join(','));
    } else {
      newSearchParams.delete(name);
    }

    // Reset pagination when filters change
    newSearchParams.set('page', '0');

    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handleSelect = (value: string) => {
    const newSet = new Set(pendingValues);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }

    const newValues = Array.from(newSet);
    setPendingValues(newValues);

    // Check if there are changes from the URL state
    const hasChangesFromUrl =
      JSON.stringify(newValues.sort()) !==
      JSON.stringify(urlSelectedValues.sort());
    setHasChanges(hasChangesFromUrl);
  };

  const handleApply = () => {
    updateSearchParams(pendingValues);
    setIsOpen(false);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setPendingValues(urlSelectedValues);
    setHasChanges(false);
    setIsOpen(false);
  };

  const handleClear = () => {
    setPendingValues([]);
    setHasChanges(urlSelectedValues.length > 0);
  };

  const getDisplayText = () => {
    if (!hasSelections) return displayTitle;

    if (displayValues.length <= maxDisplayCount) {
      const selectedLabels = displayValues
        .map((value) => options.find((opt) => opt.value === value)?.label)
        .filter(Boolean);
      return selectedLabels.join(', ');
    }

    return `${displayValues.length} seleccionados`;
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              triggerClassName,
              hasSelections && 'border-primary bg-primary/10 text-primary'
            )}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span className="truncate">{getDisplayText()}</span>
            {hasSelections && (
              <Badge
                variant="secondary"
                className={cn(
                  'ml-2 rounded-sm px-1 font-normal',
                  hasSelections && 'bg-primary/20'
                )}>
                {displayValues.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder={
                searchPlaceholder || `Buscar ${displayTitle.toLowerCase()}...`
              }
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = displaySet.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}>
                      <div
                        className={cn(
                          'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}>
                        <Check className="h-4 w-4" />
                      </div>
                      {option.icon && (
                        <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>

              {/* Action buttons */}
              <CommandSeparator />
              <CommandGroup>
                <div className="space-y-2 p-2">
                  {/* Clear button */}
                  {hasSelections && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClear}
                      className="text-destructive hover:bg-destructive/10 w-full">
                      <X className="mr-2 h-4 w-4" />
                      {clearLabel}
                    </Button>
                  )}

                  {/* Apply/Cancel buttons */}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="flex-1">
                      {cancelLabel}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleApply}
                      disabled={!hasChanges}
                      className="flex-1">
                      {applyLabel}
                    </Button>
                  </div>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
