import { EntityManagementSampleTable } from '~/components/management/entity-dashboard';
import { authenticatedServerClient } from '~/lib/api/client.server';
import { listProducts } from '~/lib/management/api';
import { productManagementActionHandler } from '~/lib/management/server';
import type { ProductManagementRequestBody } from '~/lib/management/types';
import { parseSearchParamsToApiFilters } from '~/lib/management/utils/utils';
import { generateBlankPage } from '~/lib/pagination/utils';
import type { Route } from './+types/management-table._index';

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

  const requestBody = formData as ProductManagementRequestBody;
  const transactionResult = await productManagementActionHandler(requestBody);

  return formData;
}

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const { filter, params } = parseSearchParamsToApiFilters(url.searchParams);

  const response = await listProducts(
    filter,
    params,
    authenticatedServerClient
  );
  console.log(response);

  return {
    dataPage: response || generateBlankPage(),
  };
}

export default function EntityManagementRoute() {
  return <EntityManagementSampleTable />;
}
