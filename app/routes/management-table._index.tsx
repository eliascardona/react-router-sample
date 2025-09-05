import { EntityManagementSampleTable } from '~/components/management/entity-dashboard';
import { createTokenClient } from '~/lib/api/client';
import { parseSearchParamsToSubmissionFilters } from '~/lib/management/utils/utils';
import { generateDataPageBaseFormat } from '~/lib/pagination/utils';
import type { Route } from './+types/management-table._index';
import { listMachines } from '~/lib/management/api';
import { authenticatedServerClient } from '~/lib/api/client.server';

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

  console.log(formData);

  return formData;
}

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const { filter, params } = parseSearchParamsToSubmissionFilters(
    url.searchParams
  );

  const response = await listMachines(
    filter,
    params,
    authenticatedServerClient
  );
  console.log(response.content);

  return { dataPage: response };
}

export default function EntityManagementRoute() {
  return <EntityManagementSampleTable />;
}
