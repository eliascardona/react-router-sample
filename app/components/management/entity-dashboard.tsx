import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { TableDialogProvider } from '~/lib/management/utils/table-dialog-context';
import { DashboardHeader } from './dashboard-header';
import { DataTable } from './table/data-table';

export function EntityManagementSampleTable() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="grid gap-6">
          <DashboardHeader />
        </div>
        <TableDialogProvider>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Tabla de una entidad en la BD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable />
            </CardContent>
          </Card>
        </TableDialogProvider>
      </div>
    </div>
  );
}
