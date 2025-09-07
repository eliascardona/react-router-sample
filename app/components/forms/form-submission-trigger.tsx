import { useFormContext } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import type { FieldConfig } from '~/lib/forms/retrieving/types';
import { cn } from '~/lib/utils';
import { FormField } from './fields/form-field';

interface FormProps {
  fieldArray: FieldConfig[];
  formId?: string;
  submitLabel?: string;
  className?: string;
  containerClassName?: string;
  showSubmitButton?: boolean;
  children?: React.ReactNode;
  onSubmit: (data: any) => void;
}

export function FormTrigger({
  fieldArray,
  formId = 'generic-form',
  submitLabel = 'Submit',
  className,
  containerClassName,
  showSubmitButton = true,
  children,
  onSubmit,
}: FormProps) {
  const { handleSubmit } = useFormContext();

  return (
    <div className={cn('w-full', containerClassName)}>
      <form onSubmit={handleSubmit(onSubmit)} id={formId} className={className}>
        <div className="grid gap-4">
          <fieldset className="grid gap-4">
            {children}
            {fieldArray
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((field, idx) => (
                <div key={field.name || idx}>
                  <FormField fieldConfig={field} />
                </div>
              ))}
          </fieldset>

          {showSubmitButton && (
            <Button type="submit" form={formId}>
              {false ? 'Submitting...' : submitLabel}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
