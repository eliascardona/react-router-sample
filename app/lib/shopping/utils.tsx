import { type FormEncType, type HTMLFormMethod } from 'react-router';
import { toast } from 'sonner';
import type { SubmissionOptions } from '../forms/submission/utils';
import {
  ShoppingActionEnum,
  type ChargeInfoDto,
  type CreateCheckoutSessionPayload,
  type CreateCheckoutSessionRequestBody,
  type CreateOrderFromCheckoutSessionCommand,
  type OrderCreationRequestBody,
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

export function triggerCheckoutSessionCreation({
  action,
  method = 'post',
  contentType = 'application/json',
  onError,
  submit,
}: SubmissionOptions) {
  /**
   * It's mandatory to wrap this callback with the
   * _handleSubmit_ function of React Hook Form as it 
   * provides all values for the fields that were marked as required
   * at the moment of the submission.
   * Also is highly recommended to use this function alongside a server action handler, that's to say:
   * It's needed to write a server or client action to receive the request
   * It won't make sense to write an action to handle the request if the response of the action
   * is not properly handled in the frontend component.
   * 
   * Often, the component responsible for the handling of the action response is the _Owner Component_
   * of the form that triggered this function.
   * 
   * @param {object} formValues form values provided by the _handleSubmit_ function of RHF library
   * 
   */
  const submitForm = async (formValues: any) => {
    const data = { ...formValues };

    const submitMethod = method as HTMLFormMethod;
    const submitAction = action;
    const submitContentType = contentType as FormEncType;

    const paymentIntentRequestBody: CreateCheckoutSessionRequestBody = {
      intent: ShoppingActionEnum.enum.CREATE_CHECKOUT_SESSION,
      body: data as CreateCheckoutSessionPayload,
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

export function triggerCheckoutSessionItemAppend({
  action,
  method = 'post',
  contentType = 'application/json',
  onError,
  submit,
}: SubmissionOptions) {
  /**
   * It's mandatory to wrap this callback with the
   * _handleSubmit_ function of React Hook Form as it 
   * provides all values for the fields that were marked as required
   * at the moment of the submission.
   * Also is highly recommended to use this function alongside a server action handler, that's to say:
   * It's needed to write a server or client action to receive the request
   * It won't make sense to write an action to handle the request if the response of the action
   * is not properly handled in the frontend component.
   * 
   * Often, the component responsible for the handling of the action response is the _Owner Component_
   * of the form that triggered this function.
   * 
   * @param {object} formValues form values provided by the _handleSubmit_ function of RHF library
   * 
   */
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

export function triggerCheckoutSessionLock({
  action,
  method = 'post',
  contentType = 'application/json',
  onError,
  submit,
}: SubmissionOptions) {
  /**
   * It's mandatory to wrap this callback with the
   * _handleSubmit_ function of React Hook Form as it 
   * provides all values for the fields that were marked as required
   * at the moment of the submission.
   * Also is highly recommended to use this function alongside a server action handler, that's to say:
   * It's needed to write a server or client action to receive the request
   * It won't make sense to write an action to handle the request if the response of the action
   * is not properly handled in the frontend component.
   * 
   * Often, the component responsible for the handling of the action response is the _Owner Component_
   * of the form that triggered this function.
   * 
   * @param {object} formValues form values provided by the _handleSubmit_ function of RHF library
   * 
   */
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

export function triggerOrderConfirmation({
  action,
  method = 'post',
  contentType = 'application/json',
  onError,
  submit,
}: SubmissionOptions) {
  /**
   * It's mandatory to wrap this callback with the
   * _handleSubmit_ function of React Hook Form as it 
   * provides all values for the fields that were marked as required
   * at the moment of the submission.
   * Also is highly recommended to use this function alongside a server action handler, that's to say:
   * It's needed to write a server or client action to receive the request
   * It won't make sense to write an action to handle the request if the response of the action
   * is not properly handled in the frontend component.
   * 
   * Often, the component responsible for the handling of the action response is the _Owner Component_
   * of the form that triggered this function.
   * 
   * @param {object} formValues form values provided by the _handleSubmit_ function of RHF library
   * 
   */
  const submitForm = async (formValues: any) => {
    const data = { ...formValues };

    const submitMethod = method as HTMLFormMethod;
    const submitAction = action;
    const submitContentType = contentType as FormEncType;

    const paymentIntentRequestBody: OrderCreationRequestBody = {
      intent: ShoppingActionEnum.enum.CREATE_ORDER,
      body: data as CreateOrderFromCheckoutSessionCommand,
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

export async function resultHandlerForShoppingServerAction(
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
