import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useProjectQueries } from '@/hooks/useProjectQueries';
import { useTaskQueries } from '@/hooks/useTaskQueries';
import { Check, Copy, Ellipsis, ExternalLink, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTaskDetails } from '../Board/TaskDetailsContext';

interface Props {
  setIsEditing: (isEditing: boolean) => void;
  permalink: string;
}
export const TaskActionsMenu = ({ permalink, setIsEditing }: Props) => {
  const { isCopied, handleCopy } = useCopyToClipboard();
  const { projectId } = useParams();
  const { selectedTask, closeDrawer } = useTaskDetails();
  const { deleteTask } = useTaskQueries(selectedTask?.id || '');
  const [isDeleting, setIsDeleting] = useState(false);
  const { reloadProjectTasks } = useProjectQueries(projectId as string);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask();
    await reloadProjectTasks();
    closeDrawer();

    toast({
      title: 'Tarea eliminada',
      description: 'La tarea se ha eliminado correctamente',
    });
    setIsDeleting(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-2">
        <Ellipsis className="w-6 h-6 text-gray-600" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <div className="md:hidden">
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            <Pen className="w-4 h-4 mr-2" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCopy(permalink)}>
            {isCopied ? (
              <span className="flex">
                <Check className="w-4 h-4 mr-2 text-green-600" />
                <span>Copiado</span>
              </span>
            ) : (
              <span className="flex">
                <Copy className="w-4 h-4 mr-2" />
                <span>Copiar enlace permanente</span>
              </span>
            )}
          </DropdownMenuItem>
        </div>
        <Link href={permalink} target="_blank" rel="noreferrer">
          <DropdownMenuItem>
            <ExternalLink className="w-4 h-4 mr-2" />
            Abrir en una pestaña nueva
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
          <DropdownMenuItem
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-500 bg-transparent hover:bg-red-200 hover:dark:bg-red-950"
        >
          <Trash className="w-3 h-3 mr-2" />
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
