import { EntityManagementSampleTable } from '~/components/management/entity-dashboard';
import { authenticatedServerClient } from '~/lib/api/client.server';
import { listMachines } from '~/lib/management/api';
import { parseSearchParamsToApiFilters } from '~/lib/management/utils/utils';
import { generateBlankPage } from '~/lib/pagination/utils';
import type { Route } from './+types/management-table._index';
import { createTokenClient } from '~/lib/api/client';

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

  if (!formData) throw new Error('Error in request body');

  return formData;
}

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const { filter, params } = parseSearchParamsToApiFilters(url.searchParams);

  const token = process.env.VITE_TK || ''
  const client = createTokenClient(token);

  const response = await listMachines(
    filter,
    params,
    client
  );
  console.log(response);

  return {
    dataPage: response || generateBlankPage(),
  };
}

export default function EntityManagementRoute() {
  return <EntityManagementSampleTable />;
}
