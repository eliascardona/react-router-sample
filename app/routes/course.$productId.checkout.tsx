import { data } from 'react-router';
import { CheckoutController } from '~/components/shopping/proposal';
import { apiClient } from '~/lib/api/client';
import { createAuthenticatedClientForAction } from '~/lib/api/client.server';
import { searchStripePriceByProductId } from '~/lib/shopping/api';
import { ShoppingContextProvider } from '~/lib/shopping/context';
import { shoppingServerActionHandler } from '~/lib/shopping/server';
import { ShoppingRequestBodySchema } from '~/lib/shopping/types';
import type { Route } from './+types/course.$productId.checkout';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Administración básica de una B.D. NO SQL' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export async function action(args: Route.ActionArgs) {
  const formData = await args.request.json();

  if (!formData) throw new Error("You didn't send a request body");

  const authenticatedApiClient = createAuthenticatedClientForAction(args);

  const requestBody = ShoppingRequestBodySchema.parse(formData);

  const transactionResult = await shoppingServerActionHandler(
    requestBody,
    authenticatedApiClient,
    args
  );
  if (!transactionResult) {
    return {
      success: true,
      message: 'UNRESOLVED_ACTION',
    };
  }

  return transactionResult;
}

export async function loader(args: Route.LoaderArgs) {
  const { productId } = args.params;
  const priceSearchResult = await searchStripePriceByProductId(
    productId,
    apiClient
  );

  return data({
    chargeInfo: priceSearchResult,
  });
}

export default function CheckoutPage() {
  return (
    <ShoppingContextProvider>
      <CheckoutController />
    </ShoppingContextProvider>
  );
}
