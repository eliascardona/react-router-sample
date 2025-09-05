import { z } from 'zod';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormDecorator } from '~/components/forms/form-decorator';

const formFields = [
    {
        name: "username",
        label: "Enter you username",
    },
    {
        name: "password",
        label: "Enter you password",
    },
]

export function MainViewLogin({
    actionData
}: {
    actionData: any;
}) {
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
        <div className="w-full grid place-items-center pt-8">
            <div className="w-1/2 border rounded">
                <h3 className="text-xl font-medium">
                    Enter your credentials bro
                </h3>
                <FormProvider {...form}>
                    <FormDecorator formFields={formFields} />
                </FormProvider>
            </div>
        </div>
    )
}