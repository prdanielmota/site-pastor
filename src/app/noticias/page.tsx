import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, Newspaper } from "lucide-react";
import Link from "next/link";

const news = [
  {
    title: "Conferência Global de Missões Reúne Milhares",
    date: "17 de Janeiro, 2024",
    category: "Mundo Cristão",
    description: "Líderes de todo o mundo se reúnem para discutir estratégias de evangelismo e impacto social nas nações.",
    link: "#",
  },
  {
    title: "Arqueologia Bíblica: Nova Descoberta em Jerusalém",
    date: "15 de Janeiro, 2024",
    category: "Arqueologia",
    description: "Escavações revelam artefatos do período do Segundo Templo que confirmam relatos bíblicos.",
    link: "#",
  },
  {
    title: "O Crescimento da Igreja na Ásia",
    date: "10 de Janeiro, 2024",
    category: "Missões",
    description: "Relatórios indicam um avivamento sem precedentes em países onde o evangelho era restrito.",
    link: "#",
  },
  {
    title: "Avanços na Tradução da Bíblia",
    date: "05 de Janeiro, 2024",
    category: "Tecnologia",
    description: "Novas ferramentas de IA estão acelerando a tradução das Escrituras para línguas minoritárias.",
    link: "#",
  }
];

export default function NoticiasPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl flex items-center gap-3">
          <Newspaper className="w-8 h-8 md:w-12 md:h-12" /> Notícias
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Fique por dentro do que acontece no mundo cristão e profético.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar notícias..." className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {news.map((item, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full">
                  {item.category}
                </span>
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={item.link}>Ler Notícia Completa</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
