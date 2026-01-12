import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useActionData, useSubmit } from 'react-router';
import { useShoppingContext } from '~/lib/shopping/context';
import { triggerOrderConfirmation } from '~/lib/shopping/utils';
import { getProductIdFromPathname } from '~/lib/utils/utils';
import type { action } from '~/routes/course.$productId.checkout';
import { StripeLogicForm } from './logic-form';
import type { CreateOrderFromCheckoutSessionCommand } from '~/lib/shopping/types';
import { TENANT_ID } from '~/lib/TESTING_MOCKS';
const stripePromise = loadStripe(
  'pk_test_51HcCgTEb4AhOvqGQtNkDDt9pLoIjJEBpbmmRJZgIz0y3vdcrJDAYDP5DndpSrROfCs5jG7c0VKDNhjgDv5Au2Csv00ihRhpqpm'
);

export function ReadyPaymentForm({
  userId
}: {
  userId: string;
}) {
  const productIdFromPathname = getProductIdFromPathname();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [hasRequestedOrderCreation, setHasRequestedOrderCreation] = useState(false);
  const { chargeInfo } = useShoppingContext();
  const priceId = chargeInfo?.priceId;
  const productId = chargeInfo?.productId;
  const { checkoutSessionInfo } = useShoppingContext();
  const checkoutSessionId = checkoutSessionInfo?.id
  const submit = useSubmit();

  console.log(checkoutSessionId);

  const actionData = useActionData<typeof action>();

  useEffect(() => {
    const { submitForm } = triggerOrderConfirmation({
      method: 'POST' as const,
      action: `/course/${productIdFromPathname}/checkout`,
      contentType: 'application/json',
      submit,
    });

    if (!hasRequestedOrderCreation) {
      if (checkoutSessionId) {
        console.log("we're going to create an order for: ", );

        submitForm({
          checkoutSessionId: checkoutSessionInfo?.id || 'UUID',
          tenantId: TENANT_ID,
          userId,
        } as CreateOrderFromCheckoutSessionCommand);
        setHasRequestedOrderCreation(true);
      }
    }
  }, [hasRequestedOrderCreation, checkoutSessionId]);

  useEffect(() => {
    if (actionData && actionData.success) {
      console.log('create payment intent endpoint response', actionData.data);
      // setClientSecret(payload?.clientSecret);
    }
    return;
  }, [actionData]);

  /*  stripe payment element custom styling  */
  const appearance = {
    theme: 'stripe' as const,
    variables: {
      fontSizeBase: '14px',
      borderRadius: '5px',
    },
    rules: {
      '.Input': {
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        borderColor: '#ddd',
        boxShadow: '0px',
      },
    },
  };

  return (
    <>
      STRIPE FORM SHOULD BE HERE
      {/* {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance,
          }}>
          <StripeLogicForm />
        </Elements>
      )} */}
    </>
  );
}
