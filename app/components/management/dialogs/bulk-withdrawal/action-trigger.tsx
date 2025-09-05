import { Button } from '~/components/ui/button';
import {
  EntityManagementActionEnum,
  type BulkTransactionFormProps,
  type EntityManagementRequestBody,
} from '~/lib/management/types';
import { useTableDialog } from '~/lib/management/utils/table-dialog-context';
import { useEntityManagementActionTrigger } from '~/lib/management/utils/utils';

export function BulkTransactionActionTrigger({
  programId,
  submissionIds,
}: BulkTransactionFormProps) {
  const { closeAssignationModal } = useTableDialog();
  const { triggerAction, isSubmittingForm } =
    useEntityManagementActionTrigger(programId);

  const requestBody = {
    intent: EntityManagementActionEnum.enum.BULK_WITHDRAWAL,
    body: {
      payload: {
        submissionIds: submissionIds,
      },
    },
  } as EntityManagementRequestBody;

  return (
    <div className="space-y-6">
      <h3 className="justify-self-center text-2xl font-medium">
        ¿Seguro que deseas retirar las solicitudes seleccionadas?
      </h3>
      <div className="flex gap-8 justify-self-center">
        <Button
          type="button"
          disabled={isSubmittingForm}
          onClick={close}
          className="bg-gray-700 text-white hover:bg-gray-700 focus:ring-2 focus:ring-black focus:outline-none">
          {'No, cancelar operación'}
        </Button>
        <Button
          type="button"
          disabled={isSubmittingForm}
          className="bg-red-400 text-white focus:ring-2 focus:ring-black focus:outline-none"
          onClick={() => {
            triggerAction(requestBody);
            closeAssignationModal();
          }}>
          {isSubmittingForm ? 'Retirando...' : 'Sí, retirar'}
        </Button>
      </div>
    </div>
  );
}
