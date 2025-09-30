import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useLocation } from 'react-router';

export function StripeLogicForm() {
  const stripeClient = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const location = useLocation();
  const pathnameArray = location.pathname;
  let coursePathname = pathnameArray[2];

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    if (!stripeClient || !elements) return;

    const confirmationResponse = await stripeClient.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${coursePathname}/thanks`,
      },
    });

    if (
      confirmationResponse.error.type === 'card_error' ||
      confirmationResponse.error.type === 'validation_error'
    ) {
      setMessage(confirmationResponse.error?.message);
    } else {
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <form className={'grid pb-6'} onSubmit={handleSubmit}>
      <span className={'twoRemLine'}></span>
      <span className={'twoRemLine'}></span>
      <span className={'formTitle'}>Billing info</span>
      <span className={'twoRemLine'}></span>
      <PaymentElement />
      <span className={'oneRemLine'}></span>
      <button
        type="submit"
        disabled={!stripeClient || !elements}
        className={'paymentBtn'}>
        pay
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
