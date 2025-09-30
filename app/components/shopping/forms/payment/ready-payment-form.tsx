import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useShoppingContext } from '~/lib/shopping/context';
import { StripeLogicForm } from './logic-form';
const stripePromise = loadStripe(process.env.VITE_PP || 'pk');

export function ReadyPaymentForm() {
  const [clientSecret, setClientSecret] = useState('');
  const { chargeInfo, customerInfo } = useShoppingContext();
  const paymentReference = {
    priceRefer: chargeInfo?.priceId,
    customerRefer: customerInfo?.customerId,
  };

  async function initPaymentProcess() {
    try {
      const r = await fetch('/api/stripe/intents/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentReference),
      });
      const j = await r.json();
      const load = j.responsePayload;
      setClientSecret(load.clientSecret);
    } catch (err) {
      console.error('error on payment intent', err);
    }
  }

  useEffect(() => {
    if (
      paymentReference.priceRefer!.includes('price') &&
      paymentReference.customerRefer!.includes('cus')
    ) {
      localStorage.setItem('localPriceId', chargeInfo?.priceId || 'price_id');
      localStorage.setItem(
        'localCustomerId',
        customerInfo?.customerId || 'cus_id'
      );
      initPaymentProcess();
    } else {
      console.log('MUST TO PARSE THE PRICE ID AND CUSTOMER ID');
    }
  }, [paymentReference]);

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
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeLogicForm />
        </Elements>
      )}
    </>
  );
}
