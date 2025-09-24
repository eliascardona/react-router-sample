import { ChartCatalog } from '~/components/charts/catalog';
import type { Route } from './+types/charts.$id';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Administración básica de una B.D. NO SQL' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export default function ChartCatalogRoute() {
  return <ChartCatalog />;
}
