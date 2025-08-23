import { SubmissionsDashboard } from '~/components/management/submissions-dashboard';
import { createTokenClient } from '~/lib/api/client';
import { parseSearchParamsToSubmissionFilters } from '~/lib/management/utils/utils';
import { generateDataPageBaseFormat } from '~/lib/pagination/utils';
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

  if (!formData) throw new Error('Error in request body');

  console.log(formData);

  return formData;
}

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const { filter, params } = parseSearchParamsToSubmissionFilters(
    url.searchParams
  );

  const customTokenClient = createTokenClient(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGE2NDJhMTE3OWJiMjVkOGU3MGM1MjgiLCJ1c2VybmFtZSI6ImVsaWFzY2FyZG9uYXJvZCIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzU1OTE1MTMxLCJleHAiOjE3NTU5MTg3MzF9.K6ElUbGW08JFI4DVRHrzUYQuAQDNhyLYUcN1wslgMYA'
  );
  const response = await customTokenClient.get<any>(`/machines/get`);
  console.log(response.content);

  const pageFormat = {
    ...generateDataPageBaseFormat(response),
    content: response.success ? response.content : [],
  };
  return {
    dataPage: pageFormat,
  };
}

export default function NoSqlManagementTable() {
  return <SubmissionsDashboard />;
}
