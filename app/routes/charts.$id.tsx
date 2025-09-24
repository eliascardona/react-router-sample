import { ChartTypeHandler } from '~/components/charts/chart-type-handler';
import type { Route } from './+types/charts.$id';
import { chartCatalog } from '~/lib/charts/mocks';
import { ChartDetailsHeader } from '~/components/charts/ui/chart-details-header';
import { ChartContainer } from '~/components/charts/ui/chart-container';

export function meta(args: Route.MetaArgs) {
  return [
    { title: 'Administración básica de una B.D. NO SQL' },
    {
      name: 'description',
      content: 'Coloca una descripción útil para las búsquedas de Google',
    },
  ];
}

export async function loader(args: Route.LoaderArgs) {
  const { id } = args.params

  const chart = chartCatalog.find(
    chart => chart.id === id
  )

  console.log("chart ===================");
  console.log(chart);


  return { chart };
}

export default function ChartDetailsPage(props: Route.ComponentProps) {
  const { loaderData } = props
  const { chart } = loaderData

  return (
    <>
      <ChartDetailsHeader />
      <ChartContainer>
        <ChartTypeHandler chart={chart} />
      </ChartContainer>
    </>
  );
}
