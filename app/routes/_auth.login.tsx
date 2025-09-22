import { useActionData } from 'react-router';
import { MainViewLogin } from '~/components/auth/login/main-view';
import { setAuthSession } from '~/lib/api/auth';
import { performLogin } from '~/lib/auth/login/api';
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

  const result = await performLogin(formData);

  if (result) {
    setAuthSession(result);
    return {
      message: 'Thanks, we have recieved your submission',
    };
  }
  return { message: 'We got an internal error' };
}

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();

  return <MainViewLogin actionData={actionData} />;
}
