import { Button } from '~/components/ui/button';

interface TableRowDialogFooterProps {
    onClose: () => void;
}

export function TableRowDialogFooter({ onClose }: TableRowDialogFooterProps) {
    return (
        <div className="flex items-center gap-8">
            <Button variant="outline" onClick={onClose}>
                Cerrar
            </Button>
        </div>
    );
}