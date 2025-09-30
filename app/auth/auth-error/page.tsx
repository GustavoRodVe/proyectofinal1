import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error: errorMessage } = await searchParams;

  return (
    <div className="flex items-center justify-center h-minus-135">
      <Card className="w-96">
          <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Error de autenticación</CardTitle>
          <CardDescription>
            Hubo un problema con el proceso de autenticación
          </CardDescription>
        </CardHeader>
          <CardContent className="grid gap-4">
          <p className="text-sm text-muted-foreground">
            {errorMessage}
            <ul className="list-disc list-inside mt-2">
              <li>Un enlace caducado o inválido</li>
              <li>Un proceso de OAuth cancelado</li>
              <li>Un problema técnico</li>
            </ul>
          </p>
        </CardContent>
          <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/login">Volver al inicio de sesión</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Ir a Inicio</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
