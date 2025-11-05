import { useEffect, useState } from 'react';
import type { GenericServerResponse } from '~/lib/api/types';
import { ProductPriceSummary } from './(ui)/summary';
import { AccountInfo } from './forms/account/main-view';
import { ReadyPaymentForm } from './forms/payment/ready-payment-form';

export function MainViewCheckoutPage({
  actionData,
}: {
  actionData: GenericServerResponse;
}) {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (actionData && actionData.success) {
      setActiveTab(2);
    }
  }, [actionData]);

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
            <ReadyPaymentForm />
          ) : (
            <span>no tab</span>
          )}
        </span>
      </div>
    </div>
  );
}
