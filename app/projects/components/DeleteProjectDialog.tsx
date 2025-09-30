import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  projectName: string;
}

export const DeleteProjectDialog = ({
  open,
  onOpenChange,
  onConfirm,
  projectName,
}: DeleteProjectDialogProps) => {
  const [confirmName, setConfirmName] = useState('');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar proyecto permanentemente</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            proyecto y todos los datos asociados.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-500">
            Por favor escribe <span className="font-semibold">{projectName}</span> para
            confirmar.
          </p>
          <div className="space-y-2">
            <Label htmlFor="projectName">Nombre del proyecto</Label>
            <Input
              id="projectName"
              value={confirmName}
              onChange={(e) => setConfirmName(e.target.value)}
              placeholder="Escribe el nombre del proyecto"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={confirmName !== projectName}
          >
            Eliminar proyecto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
