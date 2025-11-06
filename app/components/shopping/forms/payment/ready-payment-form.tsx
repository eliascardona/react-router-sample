import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useActionData } from 'react-router';
import { useShoppingContext } from '~/lib/shopping/context';
import { triggerPaymentIntentCreation } from '~/lib/shopping/utils';
import { getProductIdFromPathname } from '~/lib/utils/utils';
import type { action } from '~/routes/course.$productId.checkout';
import { StripeLogicForm } from './logic-form';
const stripePromise = loadStripe(
  'pk_test_51HcCgTEb4AhOvqGQtNkDDt9pLoIjJEBpbmmRJZgIz0y3vdcrJDAYDP5DndpSrROfCs5jG7c0VKDNhjgDv5Au2Csv00ihRhpqpm'
);

export function ReadyPaymentForm() {
  const productId = getProductIdFromPathname();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { chargeInfo } = useShoppingContext();
  const actionData = useActionData<typeof action>();
  const { submitForm, isSubmitting } = triggerPaymentIntentCreation({
    method: 'POST' as const,
    action: `/course/${productId}/checkout`,
    contentType: 'application/json',
  });

  useEffect(() => {
    console.log('chargeInfo via context is ', chargeInfo);

    submitForm({
      priceId: chargeInfo?.priceId || 'price123',
      productId: chargeInfo?.productId || 'prod123',
    });
  }, []);

  useEffect(() => {
    if (actionData && actionData.success) {
      const payload = actionData.data as {
        clientSecret: string;
        paymentIntentId: string;
      };

      console.log('create payment intent endpoint response', payload);
      setClientSecret(payload?.clientSecret);
    }
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
          <p>pagar ahora</p>
          <StripeLogicForm />
        </Elements>
      )}
    </>
  );
}
