import { FormProvider, useForm } from 'react-hook-form';
import { AccountInfoForm } from './account-info-form';

export function AccountInfo() {
  const form = useForm();
  return (
    <div className={'containerLy'}>
      <FormProvider {...form}>
        <AccountInfoForm />
        {/* billing UI will Render intaed the signup form, once user has created */}
      </FormProvider>
    </div>
  );
}
