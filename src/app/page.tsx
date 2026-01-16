import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, BookOpen, Mic } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Levando a Palavra, Transformando Vidas
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Bem-vindo ao site oficial do Pastor Daniel Mota. Encontre mensagens inspiradoras, estudos bíblicos e recursos para sua caminhada cristã.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/mensagens">Ver Mensagens</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contato">Entrar em Contato</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Sermons / Content Preview */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Últimas Mensagens</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Confira os sermões e estudos mais recentes.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock Data 1 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>14 de Janeiro, 2024</span>
                </div>
                <CardTitle>A Importância da Fé</CardTitle>
                <CardDescription>Hebreus 11:1-6</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Uma reflexão profunda sobre como a fé move montanhas e transforma nossa realidade diária.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/mensagens/a-importancia-da-fe">
                    <BookOpen className="w-4 h-4 mr-2" /> Ler Estudo
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Mock Data 2 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>07 de Janeiro, 2024</span>
                </div>
                <CardTitle>Vencendo a Ansiedade</CardTitle>
                <CardDescription>Filipenses 4:6-7</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Descubra o segredo bíblico para encontrar paz em meio às tempestades da vida.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/mensagens/vencendo-a-ansiedade">
                    <Mic className="w-4 h-4 mr-2" /> Ouvir Mensagem
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Mock Data 3 */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>31 de Dezembro, 2023</span>
                </div>
                <CardTitle>Planejando com Deus</CardTitle>
                <CardDescription>Provérbios 16:3</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Como alinhar seus planos e propósitos para o novo ano com a vontade de Deus.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/mensagens/planejando-com-deus">
                    <BookOpen className="w-4 h-4 mr-2" /> Ler Estudo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/mensagens">Ver Todas as Mensagens</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <blockquote className="text-2xl font-semibold italic">
              "Porque dele, e por ele, e para ele são todas as coisas; glória, pois, a ele eternamente. Amém."
            </blockquote>
            <cite className="not-italic text-lg">- Romanos 11:36</cite>
          </div>
        </div>
      </section>
    </div>
  );
}
