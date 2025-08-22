import { SubmissionManagementModalProvider } from '~/lib/management/utils/management-data-context';
import { DashboardHeader } from './submissions-header';
import { SubmissionsStats } from './submissions-stats';
import { SubmissionsTable } from './submissions-table';

export function SubmissionsDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="grid gap-6">
          <DashboardHeader />
          <SubmissionsStats
            stats={{
              totalTasks: 0,
              completedTasks: 0,
              pendingTasks: 0,
            }}
          />
        </div>
        <SubmissionManagementModalProvider>
          <SubmissionsTable />
        </SubmissionManagementModalProvider>
      </div>
    </div>
  );
}
