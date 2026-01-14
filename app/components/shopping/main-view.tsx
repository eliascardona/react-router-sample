import { useCallback, useEffect, useState } from 'react';
import { useLoaderData, useSubmit } from 'react-router';
import { TENANT_ID } from '~/lib/TESTING_MOCKS';
import type { GenericServerResponse } from '~/lib/api/types';
import { useShoppingContext } from '~/lib/shopping/context';
import { ShoppingActionEnum } from '~/lib/shopping/types';
import { triggerCheckoutSessionCreation } from '~/lib/use-case/action-triggers';
import { getProductIdFromPathname } from '~/lib/utils/utils';
import type { loader } from '~/routes/course.$productId.checkout';
import { ProductPriceSummary } from './(ui)/summary';
import { AccountInfo } from './forms/account/main-view';
import { PaymentFormWrapper } from './forms/payment/payment-form-wrapper';

type CheckoutPhase =
  | 'INIT'
  | 'CHECKOUT_SESSION_CREATING'
  | 'CHECKOUT_SESSION_CREATED'
  | 'ORDER_CREATING'
  | 'ORDER_CREATED';

export function MainViewCheckoutPage({
  actionData,
}: {
  actionData: GenericServerResponse<any>;
}) {
  const { userId } = useLoaderData<typeof loader>();
  const productIdFromPathname = getProductIdFromPathname();
  const [phase, setPhase] = useState<CheckoutPhase>('INIT');

  const submit = useSubmit();
  const { setCheckoutSessionInfo } = useShoppingContext();

  const createCheckoutSession = useCallback(() => {
    const commandB = {
      userId,
      tenantId: TENANT_ID,
      currency: 'MXN',
    };

    triggerCheckoutSessionCreation(productIdFromPathname, commandB, submit);

    setPhase('CHECKOUT_SESSION_CREATING');
  }, [submit, userId, productIdFromPathname]);

  useEffect(() => {
    if (phase === 'INIT') {
      createCheckoutSession();
    }
  }, [phase, createCheckoutSession]);

  // Server responses handling
  useEffect(() => {
    if (!actionData || !actionData.success) return;

    switch (actionData.message) {
      case ShoppingActionEnum.enum.CREATE_CHECKOUT_SESSION: {
        const checkoutSessionId = actionData.data.sessionId;

        setCheckoutSessionInfo({ id: checkoutSessionId });
        setPhase('CHECKOUT_SESSION_CREATED');
        break;
      }

      case ShoppingActionEnum.enum.CREATE_ORDER: {
        setPhase('ORDER_CREATED');
        break;
      }
    }
  }, [actionData, setCheckoutSessionInfo]);

  return (
    <div className={'grid w-full'}>
      <div className={'grid w-[90%] grid-cols-2 gap-2 justify-self-center'}>
        <ProductPriceSummary />
        <span className={'p-4'}>
          {phase === 'INIT' || phase === 'CHECKOUT_SESSION_CREATING' ? (
            <AccountInfo />
          ) : (
            <PaymentFormWrapper />
          )}
        </span>
      </div>
    </div>
  );
}
