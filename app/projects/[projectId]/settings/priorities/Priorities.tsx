'use client';
import { primaryBtnStyles } from '@/app/commonStyles';
import { CreateCustomFieldOptionModal } from '@/components/CreateCustomFieldOptionModal';
import { CustomFieldOptions } from '@/components/CustomFieldOptions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useProjectQueries } from '@/hooks/useProjectQueries';
import { cn } from '@/lib/utils';
import { compareAndUpdateItems, hasChanges } from '@/utils/array-utils';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

interface Props {
  projectId: string;
  items: ICustomFieldData[];
}

export const Priorities = ({ projectId, items: initialItems }: Props) => {
  const { reloadPriorities, reloadProjectTasks } = useProjectQueries(projectId);
  const [items, setItems] = useState(initialItems);
  const [priorities, setPriorities] = useState(initialItems);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const hasUnsavedChanges = hasChanges(items, priorities);

  const handleSaveData = async () => {
    try {
      setIsSaving(true);

      const { itemsToAdd, itemsToUpdate, itemsToDelete } =
        compareAndUpdateItems(items, priorities);

      // Perform database operations in parallel
      await Promise.all([
        // Delete items
        itemsToDelete.length > 0 &&
          supabase.from('priorities').delete().in('id', itemsToDelete),

        // Update items
        itemsToUpdate.length > 0 &&
          supabase.from('priorities').upsert(
            itemsToUpdate.map((item) => ({
              ...item,
              project_id: projectId,
              updated_at: new Date(),
            }))
          ),

        // Add new items
        itemsToAdd.length > 0 &&
          supabase.from('priorities').insert(
            itemsToAdd.map((item) => ({
              ...item,
              project_id: projectId,
              updated_at: new Date(),
            }))
          ),
      ]);

      setItems(priorities);

      toast({
        title: 'Éxito',
        description: 'Prioridades actualizadas correctamente',
      });
      await reloadPriorities();
      await reloadProjectTasks();
    } catch (error) {
      console.error('Error saving priorities:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo guardar las prioridades',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <CreateCustomFieldOptionModal
          title="Crear nueva prioridad"
          triggerLabel="Crear nueva opción de prioridad"
          handleSubmit={(data) =>
            setPriorities((items) => [
              ...items,
              { id: crypto.randomUUID(), order: items.length, ...data },
            ])
          }
        />
      </div>

      <CustomFieldOptions
        field="priority"
        options={priorities}
        setOptions={setPriorities}
  description="Las prioridades están ordenadas de la más baja (arriba) a la más alta (abajo). El último elemento de la lista tiene la prioridad más alta."
      />

      <div className="flex flex-col gap-2 items-end py-4">
        {hasUnsavedChanges && (
          <span className="text-sm text-center text-green-500 w-32">
            sin guardar
          </span>
        )}
        <Button
          onClick={handleSaveData}
          className={cn(primaryBtnStyles)}
          disabled={isSaving || !hasUnsavedChanges}
        >
          {isSaving ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </div>
  );
};
