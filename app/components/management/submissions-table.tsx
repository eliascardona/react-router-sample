import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { DataTable } from './table/data-table';

export function SubmissionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Solicitudes recibidas</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable />
      </CardContent>
    </Card>
  );
}
