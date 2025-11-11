import { type FormEncType, type HTMLFormMethod } from 'react-router';
import { toast } from 'sonner';
import type { SubmissionOptions } from '../forms/submission/utils';
import {
  ShoppingActionEnum,
  type ChargeInfoDto,
  type PaymentIntentRequestBody,
} from '../shopping/types';

export const splitPrice = (chargeInfo: ChargeInfoDto) => {
  let realUnitAmount = chargeInfo.unitAmount / 100;
  let initialUnitAmount = (chargeInfo.unitAmount / 100) * 0.84;
  let tax = initialUnitAmount * 0.16;
  let taxFmt = tax.toPrecision(2);

  let parsedAmount = initialUnitAmount.toString();
  let finalAmount = realUnitAmount.toString();

  const priceFmt = {
    parsedAmount: parsedAmount,
    finalAmount: finalAmount,
    taxFmt: taxFmt,
  };

  return priceFmt;
};

export function triggerPaymentIntentCreation({
  action,
  method = 'post',
  contentType = 'application/json',
  onError,
  submit,
}: SubmissionOptions) {
  const submitForm = async (formValues: any) => {
    const data = { ...formValues };

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
      if (submit) {
        await submit(paymentIntentRequestBody, {
          method: submitMethod,
          action: submitAction,
          encType: submitContentType,
        });
      }
    } catch (error: any) {
      onError?.(error.message);
      throw new Error(error.message);
    }
  };

  return {
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
