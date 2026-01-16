import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, BookOpen, Mic, PlayCircle, Search } from "lucide-react";
import Link from "next/link";

const sermons = [
  {
    title: "A Importância da Fé",
    passage: "Hebreus 11:1-6",
    date: "14 de Janeiro, 2024",
    type: "Estudo",
    description: "Uma reflexão profunda sobre como a fé move montanhas e transforma nossa realidade diária.",
    link: "#",
    icon: BookOpen
  },
  {
    title: "Vencendo a Ansiedade",
    passage: "Filipenses 4:6-7",
    date: "07 de Janeiro, 2024",
    type: "Áudio",
    description: "Descubra o segredo bíblico para encontrar paz em meio às tempestades da vida.",
    link: "#",
    icon: Mic
  },
  {
    title: "Planejando com Deus",
    passage: "Provérbios 16:3",
    date: "31 de Dezembro, 2023",
    type: "Estudo",
    description: "Como alinhar seus planos e propósitos para o novo ano com a vontade de Deus.",
    link: "#",
    icon: BookOpen
  },
  {
    title: "O Poder da Oração",
    passage: "Tiago 5:16",
    date: "24 de Dezembro, 2023",
    type: "Vídeo",
    description: "A oração de um justo é poderosa e eficaz. Aprenda a orar com propósito.",
    link: "#",
    icon: PlayCircle
  },
  {
    title: "Caminhando em Santidade",
    passage: "1 Pedro 1:15-16",
    date: "17 de Dezembro, 2023",
    type: "Áudio",
    description: "O chamado para sermos santos em toda a nossa maneira de viver.",
    link: "#",
    icon: Mic
  },
  {
    title: "A Graça que Basta",
    passage: "2 Coríntios 12:9",
    date: "10 de Dezembro, 2023",
    type: "Estudo",
    description: "Entendendo a suficiência da graça de Deus em nossas fraquezas.",
    link: "#",
    icon: BookOpen
  }
];

export default function SermonsPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mensagens e Estudos</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Acesse nossa biblioteca de sermões, estudos bíblicos e devocionais.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar por tema ou passagem..." className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sermons.map((sermon, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{sermon.date}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full">
                  {sermon.type}
                </span>
              </div>
              <CardTitle>{sermon.title}</CardTitle>
              <CardDescription>{sermon.passage}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {sermon.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" className="w-full">
                <Link href={sermon.link}>
                  <sermon.icon className="w-4 h-4 mr-2" /> 
                  {sermon.type === 'Vídeo' ? 'Assistir' : sermon.type === 'Áudio' ? 'Ouvir' : 'Ler'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
