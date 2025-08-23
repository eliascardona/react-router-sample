import { BarChart, CheckCircle2, File } from 'lucide-react';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export function SubmissionsStats({
  stats,
}: {
  stats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
  } | null;
}) {
  const statsData = useMemo(() => {
    if (!stats) return null;
    const statsFormat = [
      {
        title: 'Métrica de rendimiento',
        value: stats.pendingTasks,
        icon: File,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      },
      {
        title: 'Cifra promedio en el KPI-1 semestral',
        value: stats.completedTasks,
        icon: CheckCircle2,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
      },
      {
        title: 'Total de transacciones semestrales',
        value: 0,
        icon: BarChart,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
      },
    ];
    return statsFormat;
  }, [stats?.totalTasks, stats?.completedTasks]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData &&
        statsData.map((stat, index) => (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-md p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
