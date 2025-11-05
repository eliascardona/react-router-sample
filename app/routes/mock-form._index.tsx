import { FormProvider, useForm } from 'react-hook-form';
import { FormDecorator } from '~/components/forms/form-decorator';
import { FieldTypeEnum, type FieldConfig } from '~/lib/forms/retrieving/types';
import { serverActionHandler } from '~/lib/forms/submission/server';
import type { Route } from './+types/mock-form._index';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Administración básica de una B.D. NO SQL' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export async function action(args: Route.ActionArgs) {
  const formData = await args.request.json();

  if (!formData) throw new Error("You didn't send a request body");

  const transactionResult = await serverActionHandler(formData);

  return transactionResult;
}

export default function EntityManagementRoute() {
  const formFields: FieldConfig[] = [
    {
      name: 'campo-1',
      label: 'Enter a value for campo 1',
      type: FieldTypeEnum.enum.text,
      order: 1,
    },
    {
      name: 'campo-2',
      label: 'Enter a value for campo 2',
      type: FieldTypeEnum.enum.text,
      order: 2,
    },
  ];
  const form = useForm();

  return (
    <FormProvider {...form}>
      <div className="grid w-full place-items-center">
        <div className="mt-12 w-1/2 rounded-md p-4 shadow-md">
          <FormDecorator formFields={formFields} />
        </div>
      </div>
    </FormProvider>
  );
}
