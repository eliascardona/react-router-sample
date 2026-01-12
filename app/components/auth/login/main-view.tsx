import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { FormDecorator } from '~/components/forms/form-decorator';
import { FieldTypeEnum, type FieldConfig } from '~/lib/forms/retrieving/types';

const formFields: FieldConfig[] = [
  {
    name: 'username',
    label: 'Enter you username',
    type: FieldTypeEnum.enum.text,
    order: 1,
  },
  {
    name: 'email',
    label: 'Enter you email',
    type: FieldTypeEnum.enum.text,
    order: 2,
  },
  {
    name: 'password',
    label: 'Enter you password',
    type: FieldTypeEnum.enum.pass,
    order: 3,
  },
];

export function MainViewLogin({ actionData }: { actionData: any }) {
  useEffect(() => {
    if (actionData) {
      toast.success('Operación realizada', {
        description: actionData.message,
        duration: 2000,
      });
    }
  }, [actionData]);

  const schema = z.any();
  type TForm = z.infer<typeof schema>;
  const form = useForm<TForm>();

  return (
    <div className="grid w-full place-items-center pt-8">
      <div className="w-1/2 rounded border">
        <h3 className="text-xl font-medium">Enter your credentials bro</h3>
        <FormProvider {...form}>
          <FormDecorator formFields={formFields} />
        </FormProvider>
      </div>
    </div>
  );
}
