'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { auth } from '@/utils/auth';
import { useToast } from '@/components/ui/use-toast';
import { getAuthError } from '@/utils/auth-errors';

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      try {
      setIsLoading(true);
      const response = await auth.resetPasswordRequest(email);
      toast({
        title: 'Revisa tu correo',
        description: response.message,
      });
      router.push('/login');
    } catch (error) {
      const { message } = getAuthError(error);
      toast({
        variant: 'destructive',
        title: 'Error al restablecer la contraseña',
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-96">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Restablecer contraseña</CardTitle>
          <CardDescription className="text-xs">
            Ingresa tu dirección de correo y te enviaremos un enlace para restablecerla
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Enviar enlace de restablecimiento
          </Button>
        </CardContent>
        <CardFooter>
          <div className="text-sm">
            ¿Recordaste tu contraseña?{' '}
            <Link href="/login" className="text-blue-500">
              Iniciar sesión
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
