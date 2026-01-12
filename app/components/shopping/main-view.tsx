import { useEffect, useState } from 'react';
import type { GenericServerResponse } from '~/lib/api/types';
import { useShoppingContext } from '~/lib/shopping/context';
import { ProductPriceSummary } from './(ui)/summary';
import { AccountInfo } from './forms/account/main-view';
import { ReadyPaymentForm } from './forms/payment/ready-payment-form';
import { triggerCheckoutSessionCreation } from '~/lib/shopping/utils';
import { getProductIdFromPathname } from '~/lib/utils/utils';
import type { loader } from '~/routes/course.$productId.checkout';
import { useLoaderData, useSubmit } from 'react-router';
import { PRICE_ID, PRODUCT_ID, TENANT_ID } from '~/lib/TESTING_MOCKS';
import { ShoppingActionEnum } from '~/lib/shopping/types';

export function MainViewCheckoutPage({
  actionData,
}: {
  actionData: GenericServerResponse<any>;
}) {
  const { userId } = useLoaderData<typeof loader>();
  const productIdFromPathname = getProductIdFromPathname();
  const [activeTab, setActiveTab] = useState(1);
  const [hasRequestedCheckoutSession, setHasRequestedCheckoutSession] = useState(false);
  const submit = useSubmit();
  const { setCheckoutSessionInfo } = useShoppingContext();

  useEffect(() => {
    const { submitForm } = triggerCheckoutSessionCreation({
      method: 'POST' as const,
      action: `/course/${productIdFromPathname}/checkout`,
      contentType: 'application/json',
      submit,
    });

    if (!hasRequestedCheckoutSession) {
      const createCheckoutSessionCommand = {
        userId,
        tenantId: TENANT_ID,
        currency: 'MXN'
      };

      const checkoutSessionItems = [
        {
          productId: PRODUCT_ID,
          priceId: PRICE_ID,
          quantity: 1,
          operation: 'ADD' as const
        }
      ];

      submitForm({
        command: createCheckoutSessionCommand,
        items: checkoutSessionItems
      });
      setHasRequestedCheckoutSession(true);
    }
  }, [hasRequestedCheckoutSession]);

  useEffect(() => {
    if (actionData && actionData.success) {
      console.log('SUCCESS WHILE CREATING CHECKOUT');

      if (actionData.message ===
        ShoppingActionEnum.enum.CREATE_CHECKOUT_SESSION) {

        console.log('CHECKOUT MSG', actionData.message);

        setCheckoutSessionInfo({ id: actionData.data.sessionId });
        setActiveTab(2);
      }
      // setActiveTab(2);
    }
  }, [actionData, setCheckoutSessionInfo]);

  /**
   * 	@TODO
   * 	Colocar un paso previo en nuestras tabs
   * 	en el cual se le indique al usuario que,
   * 	compre el curso tendrá acceso a él.
   *
   * 	Habrá un botón para proceder con el pago,
   * 	además de una casilla en donde se acpetan
   * 	los términos y condiciones de servicio.
   *
   **/

  return (
    <div className={'grid w-full'}>
      <div className={'grid w-[90%] grid-cols-2 gap-2 justify-self-center'}>
        <ProductPriceSummary />
        <span className={'p-4'}>
          {activeTab === 1 ? (
            <AccountInfo />
          ) : activeTab === 2 ? (
            <ReadyPaymentForm userId={userId} />
          ) : (
            <span>no tab</span>
          )}
        </span>
      </div>
    </div>
  );
}
