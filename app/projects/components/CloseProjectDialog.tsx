import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CloseProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const CloseProjectDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: CloseProjectDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cerrar proyecto</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que deseas cerrar este proyecto? Puedes volver a
          abrirlo más tarde desde la pestaña de proyectos cerrados.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Cerrar proyecto
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
