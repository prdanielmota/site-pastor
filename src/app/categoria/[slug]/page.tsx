import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Globe } from "lucide-react";
import { notFound } from "next/navigation";
import { fetchNews, NewsItem } from "@/lib/rss";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NewsImage } from "@/components/ui/news-image";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ptBR });
  } catch (e) {
    return dateStr;
  }
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categories: Record<string, string> = {
    iasd: "Igreja Adventista",
    mundo: "Mundo",
    religiao: "Religião",
    profecias: "Profecias",
  };

  const title = categories[params.slug];

  if (!title) {
    notFound();
  }

  // Determine which feed category to fetch based on slug
  let fetchCategory: 'iasd' | 'mundo' | 'profecias' | 'all' = 'all';
  if (params.slug === 'iasd') fetchCategory = 'iasd';
  if (params.slug === 'mundo' || params.slug === 'religiao') fetchCategory = 'mundo';
  if (params.slug === 'profecias') fetchCategory = 'profecias';

  const news = await fetchNews(fetchCategory);

  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center text-center mb-12 space-y-6">
        <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-semibold uppercase tracking-wider border-2 border-black shadow-[4px_4px_0_0_black]">
          Categoria
        </div>
        <h1 className="text-4xl font-black tracking-tighter sm:text-6xl uppercase">
          {title}
        </h1>
        <p className="text-muted-foreground md:text-xl max-w-[700px] font-medium border-l-4 border-black pl-4 text-left">
          Últimas notícias e atualizações sobre {title}, selecionadas das principais fontes cristãs ao redor do mundo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, i) => (
          <Card key={i} className="group flex flex-col overflow-hidden border-none shadow-none hover:shadow-lg transition-all duration-300 bg-card/50 hover:bg-card">
            <div className="aspect-video bg-muted/50 relative overflow-hidden border-2 border-black shadow-[4px_4px_0_0_black] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[2px_2px_0_0_black] transition-all">
               <NewsImage 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               />
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur px-3 py-2 text-xs font-bold text-white uppercase tracking-wider">
                {item.source}
              </div>
            </div>
            <CardContent className="flex-1 p-6 flex flex-col border-x-2 border-b-2 border-black shadow-[4px_4px_0_0_black] mt-4 bg-white">
              <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wide">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {formatDate(item.isoDate)}
                </span>
              </div>
              <h3 className="text-xl font-black mb-3 leading-tight group-hover:text-primary transition-colors uppercase">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>
              <p className="text-muted-foreground text-sm font-medium line-clamp-3 mb-4 flex-1">
                {item.contentSnippet}
              </p>
              <Button asChild variant="link" className="p-0 h-auto self-start font-black uppercase tracking-wider group-hover:translate-x-1 transition-transform text-black hover:text-primary hover:no-underline">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Ler completo <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {news.length === 0 && (
         <div className="text-center py-20 border-2 border-black border-dashed bg-muted/20">
            <p className="text-xl font-bold text-muted-foreground">Nenhuma notícia encontrada nesta categoria.</p>
            <p className="text-sm text-muted-foreground mt-2">Tente novamente mais tarde.</p>
         </div>
      )}
    </div>
  );
}
