import { FormProvider, useForm } from 'react-hook-form';
import { CheckoutFormDemo } from '~/components/forms/proposal/checkout-demo';
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
