"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight">Algo deu errado</h1>
      <p className="text-muted-foreground max-w-md">
        Não foi possível carregar as notícias agora. Tente novamente em instantes.
      </p>
      <Button onClick={reset} size="lg" className="font-semibold">
        Tentar de novo
      </Button>
    </div>
  );
}
