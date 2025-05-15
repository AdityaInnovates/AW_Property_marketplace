// components/DialogBox.tsx
'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function DialogBox({ trigger, title, description, children, footer, className }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={className}>
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {children}
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
