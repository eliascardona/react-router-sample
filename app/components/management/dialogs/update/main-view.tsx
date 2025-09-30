import type { ProductEditionRequestBody } from '~/lib/management/types';
import { ProductUpdateActionTrigger } from './action-trigger';

export function ProductUpdateDialogContent({
  productId,
  newProductData,
}: ProductEditionRequestBody['body']) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-3xl font-medium">Retiro de solicitudes</p>
      </div>
      <ProductUpdateActionTrigger
        productId={productId}
        newProductData={newProductData}
      />
    </div>
  );
}
