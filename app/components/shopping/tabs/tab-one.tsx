import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { useShoppingContext } from '~/lib/shopping/context';
import { ProductPriceSummary } from '../(ui)/summary';
import { AccountInfo } from '../forms/account/main-view';
import { ReadyPaymentForm } from '../forms/payment/ready-payment-form';

export default function TabOneShopping() {
  const { setChargeInfo } = useShoppingContext();
  const location = useLocation();
  const pathnameArray = location.pathname;
  let coursePathname = pathnameArray[2];
  let priceMetadataRefer = {};
  const [activeTab, setActiveTab] = useState(1);

  const memoizedPathname = useMemo(() => {
    priceMetadataRefer = { priceMetadata: `${coursePathname}` };
    return priceMetadataRefer;
  }, [coursePathname]);

  useEffect(() => {
    async function queryPrice() {
      try {
        const r = await fetch('/api/stripe/prices/retrieve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memoizedPathname),
        });
        const j = await r.json();
        const load = j.responsePayload;
        setChargeInfo({
          priceId: load.price_id,
          unitAmount: load.price_unit_amount,
          currency: load.price_currency,
        });
      } catch (err) {
        console.log("err handling 'price query' promise: ", err);
      }
    }
    queryPrice();
  }, []);

  useEffect(() => {
    return () => {
      setActiveTab((t) => t);
    };
  }, [activeTab]);
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
      <div className={'grid grid-cols-2 gap-2'}>
        <ProductPriceSummary />
        <span className={'p-4'}>
          {activeTab === 1 ? (
            <AccountInfo setActiveTab={setActiveTab} />
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
