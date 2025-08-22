import { useActionData } from 'react-router';
import { SubmissionsDashboard } from '~/components/management/submissions-dashboard';
import { parseSearchParamsToSubmissionFilters } from '~/lib/management/utils/utils';
import type { Route } from './+types/management-table._index';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'GS Portal del Diseñador de programas' },
    { name: 'description', content: 'Bienvenido al Portal del diseñador' },
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

  const { filter, params } = parseSearchParamsToSubmissionFilters(url.searchParams);

  return {};
}

export default function ReviewerAssignationRouteComponent() {
  const actionData = useActionData<typeof action>();

  return <SubmissionsDashboard actionData={actionData} />;
}
