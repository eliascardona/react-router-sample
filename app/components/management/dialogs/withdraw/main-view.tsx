import type { WithdrawUIProps } from '~/lib/management/types';
import { SubmissionWithdrawActionTrigger } from './action-trigger';

export function WithdrawDialogContent({
  programId,
  submissionManagementView,
}: WithdrawUIProps) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-3xl font-medium">Retiro de solicitudes</p>
      </div>
      <SubmissionWithdrawActionTrigger
        programId={programId}
        submissionId={submissionManagementView.id}
        submissionIdentifier={
          submissionManagementView.submissionIdentifier ||
          'Identificador no disponible'
        }
      />
    </div>
  );
}
