import type { FieldConfig } from '~/lib/forms/retrieving/types';
import { useSubmitFromReactRouter } from '~/lib/forms/submission/utils';
import { FormTrigger } from './form-submission-trigger';

export function FormDecorator({ formFields }: { formFields: FieldConfig[] }) {
  const { isSubmitting, submitForm } = useSubmitFromReactRouter({
    method: 'POST',
    action: `/login`,
    contentType: 'application/json',
  });

  const onSubmit = (data: any) => {
    submitForm(data);
  };

  return (
    <FormTrigger
      fieldArray={formFields}
      onSubmit={onSubmit}
      submitLabel={'Enviar formulario'}
    />
  );
}
