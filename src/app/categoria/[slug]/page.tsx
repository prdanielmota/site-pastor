import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Globe } from "lucide-react";
import { notFound } from "next/navigation";
import { fetchNews, NewsItem } from "@/lib/rss";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ptBR });
  } catch (e) {
    return dateStr;
  }
};

const getImage = (item: NewsItem) => {
  return item.imageUrl ? (
    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  ) : (
    <div className="w-full h-full bg-muted/50 flex items-center justify-center">
      <Globe className="w-8 h-8 text-muted-foreground/30" />
    </div>
  );
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
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl capitalize">
          {title}
        </h1>
        <p className="text-muted-foreground md:text-xl max-w-[700px]">
          Últimas notícias e atualizações sobre {title}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, i) => (
          <Card key={i} className="group flex flex-col overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="aspect-video bg-muted/50 relative overflow-hidden">
               {getImage(item)}
              <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-medium">
                {item.source}
              </div>
            </div>
            <CardContent className="flex-1 p-6 flex flex-col">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {formatDate(item.isoDate)}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                {item.contentSnippet}
              </p>
              <Button variant="link" className="p-0 h-auto self-start font-semibold group-hover:translate-x-1 transition-transform" asChild>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Ler completo <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {news.length === 0 && (
         <div className="text-center text-muted-foreground py-12">
            Nenhuma notícia encontrada no momento. Tente novamente mais tarde.
         </div>
      )}
    </div>
  );
}
