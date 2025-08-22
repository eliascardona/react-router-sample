import { CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';
import {
    Dialog,
    DialogContent as DialogContentComponent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import { Drawer, DrawerContent } from '~/components/ui/drawer';
import { useIsMobile } from '~/hooks/use-mobile';

interface TableRowDialogProps {
    dialogTitle: string;
    dialogDescription?: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function TableRowDialog({
    dialogTitle,
    dialogDescription,
    isOpen,
    onClose,
    children,
}: TableRowDialogProps) {
    const isMobile = useIsMobile();

    const dialogContent = (
        <div className="bg-background flex flex-col">
            <div className="border-border bg-card flex-shrink-0 border-b py-6">
                <DialogHeader>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110">
                                <CheckCircle2 className="text-primary h-4 w-4" />
                            </div>
                            <div>
                                <DialogTitle className="text-foreground text-xl font-semibold">
                                    {dialogTitle}
                                </DialogTitle>
                                {dialogDescription && (
                                    <DialogDescription className="text-muted-foreground">
                                        {dialogDescription}
                                    </DialogDescription>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogHeader>
            </div>
            {children}
        </div>
    );

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={onClose}>
                <DrawerContent className="max-h-[80vh] overflow-hidden">
                    {dialogContent}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContentComponent
                className="flex max-h-[80vh] flex-col overflow-hidden"
                style={{ width: '45vw', maxWidth: '1000px', height: 'auto' }}>
                {dialogContent}
            </DialogContentComponent>
        </Dialog>
    );
}