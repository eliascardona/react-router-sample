import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { cn } from '~/lib/utils';

interface CheckboxGroupFilterProps {
  name: string;
  title: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  className?: string;
  columns?: number;
  applyLabel?: string;
  cancelLabel?: string;
  clearLabel?: string;
}

export function CheckboxGroupFilter({
  name,
  title,
  options,
  className = '',
  columns = 1,
  applyLabel = 'Aplicar',
  cancelLabel = 'Cancelar',
  clearLabel = 'Limpiar',
}: CheckboxGroupFilterProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentValue = searchParams.get(name) || '';
  const urlSelectedValues = currentValue ? currentValue.split(',') : [];

  // Local state for optimistic updates
  const [pendingValues, setPendingValues] =
    useState<string[]>(urlSelectedValues);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync pending values when URL changes
  useEffect(() => {
    setPendingValues(urlSelectedValues);
    setHasChanges(false);
  }, [currentValue]);

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

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const newValues = checked
      ? [...pendingValues, value]
      : pendingValues.filter((v) => v !== value);

    setPendingValues(newValues);

    // Check if there are changes from the URL state
    const hasChangesFromUrl =
      JSON.stringify(newValues.sort()) !==
      JSON.stringify(urlSelectedValues.sort());
    setHasChanges(hasChangesFromUrl);
  };

  const handleApply = () => {
    updateSearchParams(pendingValues);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setPendingValues(urlSelectedValues);
    setHasChanges(false);
  };

  const handleClear = () => {
    setPendingValues([]);
    setHasChanges(urlSelectedValues.length > 0);
  };

  const gridClass =
    columns > 1 ? `grid grid-cols-${columns} gap-2` : 'space-y-2';
  const pendingSet = new Set(pendingValues);

  return (
    <div
      className={cn(
        className,
        hasChanges && 'rounded-lg p-2 ring-2 ring-orange-500/20'
      )}>
      <Label className="text-sm font-medium">{title}</Label>

      <div className={`mt-2 ${gridClass}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`${name}-${option.value}`}
              checked={pendingSet.has(option.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(option.value, checked as boolean)
              }
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="cursor-pointer text-sm font-normal">
              {option.label}
            </Label>
          </div>
        ))}
      </div>

      {/* Action buttons - only show when there are changes */}
      {hasChanges && (
        <div className="mt-3 flex gap-2">
          {pendingValues.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="text-destructive hover:bg-destructive/10">
              {clearLabel}
            </Button>
          )}
          <div className="ml-auto flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}>
              {cancelLabel}
            </Button>
            <Button type="button" size="sm" onClick={handleApply}>
              {applyLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
