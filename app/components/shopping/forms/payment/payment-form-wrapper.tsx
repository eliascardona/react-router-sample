import { useShoppingContext } from '~/lib/shopping/context';
import type { loader } from '~/routes/course.$productId.checkout';
import { useLoaderData, useSubmit } from 'react-router';
import { useCallback } from 'react';
import { triggerOrderCreation } from '~/lib/use-case/action-triggers';
import { TENANT_ID } from '~/lib/TESTING_MOCKS';
import { getProductIdFromPathname } from '~/lib/utils/utils';
import { ReadyPaymentForm } from './ready-payment-form';

export function PaymentFormWrapper() {
  const { checkoutSessionInfo } = useShoppingContext();
  const checkoutSessionId = checkoutSessionInfo?.id;
  const submit = useSubmit();
  const { userId } = useLoaderData<typeof loader>();
  const productIdFromPathname = getProductIdFromPathname();

  if (!checkoutSessionId)
    return <>awaiting checkout authorization...</>

  const createOrderFromCheckoutSession = useCallback((checkoutSessionId: string) => {
    const commandA = {
      checkoutSessionId,
      tenantId: TENANT_ID,
      userId,
    };

    triggerOrderCreation(
      productIdFromPathname,
      commandA,
      submit,
    );
  }, [submit, userId, productIdFromPathname]);

  createOrderFromCheckoutSession(checkoutSessionId);

  return (
    <ReadyPaymentForm clientSecret='' />
  );
}
