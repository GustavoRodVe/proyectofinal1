'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { projects } from '@/utils/projects';
import { secondaryBtnStyles } from '@/app/commonStyles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloseProjectDialog } from '../../components/CloseProjectDialog';
import { DeleteProjectDialog } from '../../components/DeleteProjectDialog';
import TextEditor from '@/components/TextEditor';
import { useProjectAccess } from '@/hooks/useProjectAccess';
import { useAccessStore } from '@/stores/useAccessStore';
import { ProjectAction } from '@/consts';

interface ProjectSettingsFormProps {
  project: IProject;
}

export function ProjectSettingsForm({ project }: ProjectSettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    readme: project.readme,
  });
  const { toast } = useToast();
  const router = useRouter();
  const { can, role, isLoading } = useProjectAccess({
    projectId: project.id,
  });

  if (isLoading) return <div>Cargando...</div>;
  if (!can(ProjectAction.VIEW_SETTINGS)) {
    return (
      <div>No tienes permiso para administrar la configuración del proyecto.</div>
    );
  }

  const handleUpdateProject = async () => {
    try {
      setIsSaving(true);
      await projects.management.update(project.id, formData);
      toast({
        title: 'Éxito',
        description: 'Configuración del proyecto actualizada correctamente',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo actualizar la configuración del proyecto',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseProject = async () => {
    try {
      await projects.management.close(project.id);
      toast({
        title: 'Éxito',
        description: 'Proyecto cerrado correctamente',
      });
      router.push('/projects');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo cerrar el proyecto',
      });
    }
  };

  const handleDeleteProject = async () => {
    try {
      await projects.management.delete(project.id);
      useAccessStore.getState().reset();
      router.push('/projects');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo eliminar el proyecto',
      });
    }
  };

  return (
    <>
      <div className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Label>Nombre del proyecto</Label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Descripción</Label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>README</Label>
          <TextEditor
            content={formData.readme}
            onChange={(text) =>
              setFormData((prev) => ({ ...prev, readme: text }))
            }
            isEditable
          />
        </div>

        <Button
          onClick={handleUpdateProject}
          disabled={isSaving}
          className={cn(secondaryBtnStyles)}
        >
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <div className="my-20">
  <h1 className="text-xl my-3">Zona peligrosa</h1>
        <div className="border border-red-500 rounded-md">
          {can(ProjectAction.CLOSE_PROJECT) && (
            <div className="flex justify-between items-center px-4 py-3">
              <div>
                <p className="text-sm font-medium">Cerrar proyecto</p>
                <p className="text-sm text-gray-800 dark:text-gray-400">
                  Cerrar un proyecto desactivará sus flujos de trabajo y lo eliminará
                  de la lista de proyectos abiertos.
                </p>
              </div>
                <Button
                className={cn(
                  secondaryBtnStyles,
                  'text-red-500 dark:text-red-400'
                )}
                onClick={() => setShowCloseDialog(true)}
              >
                Cerrar este proyecto
              </Button>
            </div>
          )}

          {can(ProjectAction.DELETE_PROJECT) && (
            <>
              <Separator className="my-2" />
              <div className="flex justify-between items-center px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Eliminar proyecto</p>
                  <p className="text-sm text-gray-800 dark:text-gray-400">
                    Una vez que elimines un proyecto, no hay vuelta atrás. Por favor,
                    tenlo en cuenta.
                  </p>
                </div>
                  <Button
                  className={cn(
                    secondaryBtnStyles,
                    'text-red-500 dark:text-red-400'
                  )}
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Eliminar este proyecto
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <CloseProjectDialog
        open={showCloseDialog}
        onOpenChange={setShowCloseDialog}
        onConfirm={handleCloseProject}
      />

      <DeleteProjectDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDeleteProject}
        projectName={project.name}
      />
    </>
  );
}
