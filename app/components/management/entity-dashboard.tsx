import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { TableDialogProvider } from '~/lib/management/utils/table-dialog-context';
import { DashboardHeader } from './dashboard-header';
// import { DataTable } from './table/data-table';
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export function EntityManagementSampleTable() {
  const revenueData = [
    { name: "Sun", value: 8 },
    { name: "Mon", value: 10 },
    { name: "Tue", value: 12 },
    { name: "Wed", value: 11 },
    { name: "Thu", value: 9 },
    { name: "Fri", value: 11 },
    { name: "Sat", value: 12 },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="grid gap-6">
          <DashboardHeader />
        </div>
        <TableDialogProvider>
          <Card className='h-[70vh]'>
            <CardHeader>
              <CardTitle className="text-xl">
                Tabla de una entidad en la BD
              </CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 border-2 border-gray-200 h-[67vh]'>
              <div className="size-[90%] justify-self-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide={true} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="text-xs">{`${payload[0].value} K`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="size-[90%] justify-self-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide={true} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="text-xs">{`${payload[0].value} K`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="size-[90%] justify-self-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide={true} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="text-xs">{`${payload[0].value} K`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="size-[90%] justify-self-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide={true} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="text-xs">{`${payload[0].value} K`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TableDialogProvider>
      </div>
    </div>
  );
}
