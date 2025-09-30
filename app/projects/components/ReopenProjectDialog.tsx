import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ReopenProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ReopenProjectDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: ReopenProjectDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reabrir proyecto</DialogTitle>
        <DialogDescription>
          ¿Estás seguro de que quieres reabrir este proyecto? Se moverá de nuevo a
          proyectos activos.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancelar
        </Button>
        <Button onClick={onConfirm}>Reabrir proyecto</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
