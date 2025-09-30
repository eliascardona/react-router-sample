import { CheckCircle2 } from 'lucide-react';
import type {
  EntityManagementAction,
  ProductEditionRequestBody,
} from '~/lib/management/types';
import { TableRowDialogFooter } from '../common/table-row-dialog-footer';
import { ProductDeletionDialogContent } from './deletion/main-view';
import { ProductUpdateDialogContent } from './update/main-view';

interface DialogContentBaseProps {
  managementAction: EntityManagementAction | null;
  productId: string;
  onClose: () => void;
}

interface DialogContentHandlerProps extends DialogContentBaseProps {
  productManagementView: ProductEditionRequestBody['body'][] | null;
}

interface DialogContentUIProps extends DialogContentBaseProps {
  productManagementView: ProductEditionRequestBody['body'][];
}

export function DialogContentHandler({
  productManagementView,
  managementAction,
  productId,
  onClose,
}: DialogContentHandlerProps) {
  if (!productManagementView || productManagementView.length === 0) return null;

  return (
    <DialogContentHandlerUI
      productManagementView={productManagementView}
      managementAction={managementAction}
      productId={productId}
      onClose={onClose}
    />
  );
}

function DialogContentHandlerUI({
  productManagementView,
  managementAction,
  productId,
  onClose,
}: DialogContentUIProps) {
  if (!managementAction)
    return <div className="text-lg">Operación no válida</div>;

  const renderDialogContent = () => {
    switch (managementAction) {
      case 'UPDATE':
        return (
          <ProductUpdateDialogContent
            productId={productId}
            newProductData={productManagementView}
          />
        );
      case 'DELETE':
        return <ProductDeletionDialogContent productId={productId} />;
      default:
        return <div className="pt-8">Acción no válida</div>;
    }
  };

  return (
    <>
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="py-4">
          <div className="space-y-3 px-2 py-3">
            {productManagementView.length > 0 && <>{renderDialogContent()}</>}
            {productManagementView.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-muted mb-3 flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110">
                  <CheckCircle2 className="text-muted-foreground h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-1 font-medium">
                  No hay filas seleccionadas
                </h3>
                <p className="text-muted-foreground text-sm">
                  Selecciona una o más filas para continuar
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-border bg-card flex-shrink-0 border-t py-4">
        <div className="flex items-center justify-between">
          <TableRowDialogFooter onClose={onClose} />
        </div>
      </div>
    </>
  );
}
