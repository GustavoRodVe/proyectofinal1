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
import { OAuthSignIn } from '@/components/auth/OAuthSignIn';

export function CreateAccountForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error de validación',
        description: 'Las contraseñas no coinciden',
      });
      return;
    }

    try {
      setIsLoading(true);
      await auth.signUp(email, password);
      toast({
        title: 'Éxito',
        description: 'Por favor revisa tu correo electrónico para verificar tu cuenta.',
      });
      router.push('/login');
    } catch (error) {
      const { message } = getAuthError(error);

      toast({
        variant: 'destructive',
        title: 'Error al crear la cuenta',
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
          <CardTitle className="text-2xl">Crear una cuenta</CardTitle>
          <CardDescription className="text-xs">
            Ingresa tu correo electrónico abajo para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-blue-500">
              Iniciar sesión
            </Link>
          </div>

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
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Crear cuenta
          </Button>
        </CardContent>
        <CardFooter>
          <OAuthSignIn isLoading={isLoading} onLoadingChange={setIsLoading} />
        </CardFooter>
      </form>
    </Card>
  );
}
