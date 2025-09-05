import { Outlet } from 'react-router';
import { GenericHeader } from '~/components/layout/header/main-view';
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

export default function AuthRootRoute() {
  return (
    <>
      <GenericHeader />
      <Outlet />
    </>
  );
}
