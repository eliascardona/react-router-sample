import { FormTrigger } from '~/components/forms/form-submission-trigger';
import { triggerSignUp } from '~/lib/auth/utils';
import { FieldTypeEnum, type FieldConfig } from '~/lib/forms/retrieving/types';
import { getProductIdFromPathname } from '~/lib/utils/utils';

export function AccountInfoForm() {
  const productId = getProductIdFromPathname();
  const { submitForm, isSubmitting } = triggerSignUp({
    method: 'POST' as const,
    action: `/course/${productId}/checkout`,
    contentType: 'application/json',
  });

  const formFields: FieldConfig[] = [
    {
      name: 'username',
      label: 'Enter a username',
      type: FieldTypeEnum.enum.text,
      order: 1,
    },
    {
      name: 'email',
      label: 'Ingress your email',
      type: FieldTypeEnum.enum.text,
      order: 2,
    },
    {
      name: 'password',
      label: 'Type a password',
      type: FieldTypeEnum.enum.pass,
      order: 3,
    },
  ];

  return (
    <FormTrigger
      fieldArray={formFields}
      onSubmit={submitForm}
      submitLabel={'Crear cuenta'}
      disabled={isSubmitting}
    />
  );
}
