import type { BulkWithdrawalUIProps } from '~/lib/management/types';
import { BulkWithdrawalActionTrigger } from './action-trigger';

export function BulkWithdrawalDialogContent({
  programId,
  submissionManagementView,
}: BulkWithdrawalUIProps) {
  const submissionIds = submissionManagementView.map(
    (submission) => submission.id
  );

  return (
    <div className="space-y-7">
      <div>
        <p className="text-3xl font-medium">Retiro de solicitudes en lote</p>
      </div>
      <BulkWithdrawalActionTrigger
        programId={programId}
        submissionIds={submissionIds}
      />
    </div>
  );
}
