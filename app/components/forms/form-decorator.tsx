import type { FieldConfig } from '~/lib/forms/retrieving/types';
import { useSubmitFromReactRouter } from '~/lib/forms/submission/utils';
import { FormTrigger } from './form-submission-trigger';

export function FormDecorator({ formFields }: { formFields: FieldConfig[] }) {
  const { submitForm, isSubmitting } = useSubmitFromReactRouter({
    method: 'POST',
    action: `/mock-form`,
    contentType: 'application/json',
  });

  return (
    <FormTrigger
      fieldArray={formFields}
      onSubmit={submitForm}
      submitLabel={'Enviar formulario'}
      disabled={isSubmitting}
    />
  );
}
