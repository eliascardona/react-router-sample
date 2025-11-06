import {
  useNavigation,
  useSubmit,
  type FormEncType,
  type HTMLFormMethod,
} from 'react-router';
import { toast } from 'sonner';
import type { SubmissionOptions } from '../forms/submission/utils';
import {
  ShoppingActionEnum,
  type PaymentIntentRequestBody,
} from '../shopping/types';

export function triggerPaymentIntentCreation({
  action,
  method = 'post',
  contentType = 'application/json',
  onError,
}: SubmissionOptions) {
  const submit = useSubmit();
  const navigation = useNavigation();

  const submitForm = async (formValues: any) => {
    const data = { ...formValues };
    console.log('form data by RHF', data);

    const submitMethod = method as HTMLFormMethod;
    const submitAction = action;
    const submitContentType = contentType as FormEncType;

    const paymentIntentRequestBody: PaymentIntentRequestBody = {
      intent: ShoppingActionEnum.enum.PAYMENT_INTENT,
      body: {
        priceId: data.priceId,
        productId: data.productId,
      },
    };

    try {
      await submit(paymentIntentRequestBody, {
        method: submitMethod,
        action: submitAction,
        encType: submitContentType,
      });
    } catch (error: any) {
      onError?.(error.message);
      throw new Error(error.message);
    }
  };

  return {
    isSubmitting: navigation.state === 'submitting',
    submitForm,
  };
}

export async function shoppingServerActionResultHandler(
  serverActionResult: any
) {
  const resultType = serverActionResult.type;
  if (!resultType) return null;

  switch (resultType) {
    case 'SIGNUP': {
      toast.success('', {
        description: serverActionResult.message,
      });
    }

    case 'PAYMENT_INTENT': {
      toast.success('', {
        description: serverActionResult.message,
      });
    }

    default:
      toast.info("We didn't recieve any server action result");
  }
}
