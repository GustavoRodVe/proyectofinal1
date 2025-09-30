'use client';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

interface Props {
  value?: Role;
  onValueChange?: (value: Role) => void;
  disabled?: boolean;
}

export const RoleSelect = ({ value, onValueChange, disabled }: Props) => {
  const getRole = (role: Role) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'write':
        return 'Escritura';
      case 'read':
        return 'Lectura';
    }
  };

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[120px] h-8 focus:ring-0">
        <div className="flex text-xs">
          <span>Rol: </span>
          <span className="font-bold mx-1">{getRole(value || 'read')}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="text-sm">
          <SelectItem value="admin">
            <div className="flex items-center">
              <div>
                <p>Administrador</p>
                <p className="text-xs text-muted-foreground">
                  Puede ver, realizar cambios y agregar nuevos colaboradores a
                  este proyecto
                </p>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="write">
            <div className="flex items-center">
              <div>
                <p>Escritura</p>
                <p className="text-xs text-muted-foreground">
                  Puede ver y realizar cambios en este proyecto
                </p>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="read">
            <div className="flex items-center">
              <div>
                <p>Lectura</p>
                <p className="text-xs text-muted-foreground">
                  Puede ver este proyecto
                </p>
              </div>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
