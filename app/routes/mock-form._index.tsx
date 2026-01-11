import { FormProvider, useForm } from 'react-hook-form';
import { FormDecorator } from '~/components/forms/form-decorator';
import { FieldTypeEnum, type FieldConfig } from '~/lib/forms/retrieving/types';
import { serverActionHandler } from '~/lib/forms/submission/server';
import type { Route } from './+types/mock-form._index';
import { CheckoutFormDemo } from '~/components/forms/proposal/checkout-demo';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Administración básica de una B.D. NO SQL' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export default function EntityManagementRoute() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <div className="grid w-full place-items-center">
        <div className="mt-12 w-1/2 rounded-md p-4 shadow-md">
          <CheckoutFormDemo />
        </div>
      </div>
    </FormProvider>
  );
}
