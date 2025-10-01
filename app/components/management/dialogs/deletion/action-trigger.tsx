import { Button } from '~/components/ui/button';
import type { ProductDeletionRequestBody } from '~/lib/management/types';
import { useTableDialog } from '~/lib/management/utils/table-dialog-context';
import { useServerActionTrigger } from '~/lib/utils/utils';

export function ProductDeletionActionTrigger({
  productId,
}: ProductDeletionRequestBody['body']) {
  const { closeAssignationModal } = useTableDialog();
  const { triggerAction, isSubmittingForm } = useServerActionTrigger();

  const requestBody = {
    intent: 'DELETE',
    body: { productId },
  } as ProductDeletionRequestBody;

  const triggerOptions = {
    method: 'POST' as const,
    action: `/management-table`,
    encType: 'application/json' as const,
  };

  return (
    <div className="space-y-6">
      <h3 className="justify-self-center text-2xl font-medium">
        ¿Seguro que deseas retirar la solicitud seleccionada?
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
            triggerAction(requestBody, triggerOptions);
            closeAssignationModal();
          }}>
          {isSubmittingForm ? 'Retirando...' : 'Sí, retirar'}
        </Button>
      </div>
    </div>
  );
}
