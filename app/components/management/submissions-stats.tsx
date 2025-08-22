import { CheckCircle, Clock, FileText, Star } from 'lucide-react';
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
        title: 'Tareas disponibles',
        value: stats.pendingTasks,
        icon: Star,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        change: '+2 ayer',
      },
      {
        title: 'Pendientes de asignar',
        value: stats.completedTasks,
        icon: Clock,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        change: '+18% esta semana',
      },
      {
        title: 'Asignadas y sin revisar',
        value: 0,
        icon: FileText,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        change: '+0.3 este mes',
      },
      {
        title: 'Ya revisadas',
        value: stats.totalTasks,
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        change: 'Todo el tiempo',
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
              <p className="text-muted-foreground mt-1 text-xs">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
