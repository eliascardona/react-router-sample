import { useActionData } from 'react-router';
import { MainViewCheckoutPage } from '~/components/shopping/main-view';
import { apiClient } from '~/lib/api/client';
import { searchStripePriceByProductId } from '~/lib/shopping/api';
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

  const requestBody = ShoppingRequestBodySchema.parse(formData);

  console.log(requestBody);

  const transactionResult = await shoppingServerActionHandler<any, any>(
    requestBody
  );

  return transactionResult;
}

export async function loader(args: Route.LoaderArgs) {
  const { productId } = args.params;

  const priceSearchResult = await searchStripePriceByProductId(
    productId,
    apiClient
  );

  return {
    chargeInfo: priceSearchResult,
  };
}

export default function CheckoutPage() {
  const actionData = useActionData<typeof action>();

  return <MainViewCheckoutPage actionData={actionData} />;
}
