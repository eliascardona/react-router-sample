import type { CheckoutState } from '~/lib/shopping/reducers/checkoutReducer';
import { ProductPriceSummary } from './(ui)/summary';
import { ReadyPaymentForm } from './forms/payment/ready-payment-form';

export function CheckoutViewHandler({ state }: { state: CheckoutState }) {
  const renderComp = () => {
    switch (state.phase) {
      case 'CREATING_CHECKOUT_SESSION':
        return <ProductPriceSummary />;

      case 'ORDER_READY': {
        const clientSecret = state.stripeClientSecret || null;

        if (!clientSecret) {
          return <>loading payment configuration...</>
        }

        return <ReadyPaymentForm clientSecret={clientSecret} />;
      }

      default:
        return <>Loading…</>;
    }
  };
  return (
    <div className="grid w-full place-items-center">
      <div className="w-1/2 rounded-md border border-gray-200 px-4 py-6">
        {renderComp()}
      </div>
    </div>
  );
}
