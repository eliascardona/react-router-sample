import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripePaymentElement } from './stripe-payment-element';

const stripePromise = loadStripe(
  'pk_test_51HcCgTEb4AhOvqGQtNkDDt9pLoIjJEBpbmmRJZgIz0y3vdcrJDAYDP5DndpSrROfCs5jG7c0VKDNhjgDv5Au2Csv00ihRhpqpm'
);

export function ReadyPaymentForm({ clientSecret }: { clientSecret: string }) {
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
          <StripePaymentElement />
        </Elements>
      )}
    </>
  );
}
