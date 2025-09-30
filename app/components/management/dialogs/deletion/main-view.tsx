import type { ProductDeletionRequestBody } from '~/lib/management/types';
import { ProductDeletionActionTrigger } from './action-trigger';

export function ProductDeletionDialogContent({
  productId,
}: ProductDeletionRequestBody['body']) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-3xl font-medium">Retiro de solicitudes</p>
      </div>
      <ProductDeletionActionTrigger productId={productId} />
    </div>
  );
}
