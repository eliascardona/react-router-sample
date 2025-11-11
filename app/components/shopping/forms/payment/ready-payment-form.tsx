import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useActionData, useSubmit } from 'react-router';
import { useShoppingContext } from '~/lib/shopping/context';
import { triggerPaymentIntentCreation } from '~/lib/shopping/utils';
import { getProductIdFromPathname } from '~/lib/utils/utils';
import type { action } from '~/routes/course.$productId.checkout';
import { StripeLogicForm } from './logic-form';
const stripePromise = loadStripe(
  'pk_test_51HcCgTEb4AhOvqGQtNkDDt9pLoIjJEBpbmmRJZgIz0y3vdcrJDAYDP5DndpSrROfCs5jG7c0VKDNhjgDv5Au2Csv00ihRhpqpm'
);

export function ReadyPaymentForm() {
  const productIdFromPathname = getProductIdFromPathname();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [hasRequestedIntent, setHasRequestedIntent] = useState(false);
  const { chargeInfo } = useShoppingContext();
  const priceId = chargeInfo?.priceId;
  const productId = chargeInfo?.productId;
  const submit = useSubmit();

  const actionData = useActionData<typeof action>();

  useEffect(() => {
    const { submitForm } = triggerPaymentIntentCreation({
      method: 'POST' as const,
      action: `/course/${productIdFromPathname}/checkout`,
      contentType: 'application/json',
      submit,
    });

    if (priceId && productId) {
      if (!hasRequestedIntent) {
        console.log("we're going to generate payment intent for: ", priceId);

        submitForm({
          priceId: priceId || 'price123',
          productId: productId || 'prod123',
        });
        setHasRequestedIntent(true);
      }
    }
  }, [priceId, productId]);

  useEffect(() => {
    if (actionData && actionData.success) {
      const payload = actionData.data as {
        clientSecret: string;
        paymentIntentId: string;
      };

      console.log('create payment intent endpoint response', payload);
      setClientSecret(payload?.clientSecret);
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
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance,
          }}>
          <StripeLogicForm />
        </Elements>
      )}
    </>
  );
}
