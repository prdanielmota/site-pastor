import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4 text-center">
      <p className="text-6xl font-extrabold tracking-tight text-primary">404</p>
      <h1 className="text-2xl font-bold tracking-tight">Página não encontrada</h1>
      <p className="text-muted-foreground max-w-md">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Button asChild size="lg" className="font-semibold">
        <Link href="/">Voltar ao início</Link>
      </Button>
    </div>
  );
}
