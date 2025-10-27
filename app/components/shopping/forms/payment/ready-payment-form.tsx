import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
// import { useShoppingContext } from '~/lib/shopping/context';
import { Button } from '~/components/ui/button';
import { StripeLogicForm } from './logic-form';
const stripePromise = loadStripe(
  'pk_test_51HcCgTEb4AhOvqGQtNkDDt9pLoIjJEBpbmmRJZgIz0y3vdcrJDAYDP5DndpSrROfCs5jG7c0VKDNhjgDv5Au2Csv00ihRhpqpm'
);

export function ReadyPaymentForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  // const { chargeInfo, customerInfo } = useShoppingContext();
  const paymentReference = {
    priceRefer: 'chargeInfo?.priceId',
    customerRefer: 'customerInfo?.customerId',
  };

  async function initPaymentProcess() {
    try {
      const r = await fetch('http://localhost:8082/api/stripe/intent/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price123',
          productId: 'prod123',
          productName: 'product sample ',
        }),
      });
      const j = await r.json();
      const load = j.responsePayload;
      console.log('create payment intent endpoint response', load);
      setClientSecret(load.clientSecret);
    } catch (err) {
      console.error('error on payment intent', err);
    }
  }

  // useEffect(() => {
  //   if (
  //     paymentReference.priceRefer!.includes('price') &&
  //     paymentReference.customerRefer!.includes('cus')
  //   ) {
  //     localStorage.setItem('localPriceId', "chargeInfo?.priceId");
  //     localStorage.setItem(
  //       'localCustomerId',
  //       "customerInfo?.customerId"
  //     );
  //     initPaymentProcess();
  //   } else {
  //     console.log('MUST TO PARSE THE PRICE ID AND CUSTOMER ID');
  //   }
  // }, [paymentReference]);

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
      <Button type="button" onClick={initPaymentProcess}>
        iniciar pago
      </Button>
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
