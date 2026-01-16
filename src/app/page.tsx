import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight, Flame, Newspaper, Globe, Cross } from "lucide-react";
import { fetchNews, NewsItem } from "@/lib/rss";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NewsImage } from "@/components/ui/news-image";

// Utility to format date
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ptBR });
  } catch (e) {
    return dateStr;
  }
};

export default async function Home() {
  const iasdNews = await fetchNews('iasd');
  const worldNews = await fetchNews('mundo');
  const allNews = [...iasdNews, ...worldNews];
  
  // Use the latest news as featured, or fallback
  const featuredNews = iasdNews[0] || worldNews[0];
  const remainingIasd = iasdNews.filter(n => n.link !== featuredNews?.link).slice(0, 5);
  const remainingWorld = worldNews.filter(n => n.link !== featuredNews?.link).slice(0, 6);
  
  // Trending could be a mix
  const trendingNews = [...iasdNews, ...worldNews].sort(() => 0.5 - Math.random()).slice(0, 5);

  // Dynamic tags based on content
  const potentialTags = ['Teologia', 'Missões', 'Saúde', 'Educação', 'Arqueologia', 'Profecias', 'Vaticano', 'Liberdade Religiosa', 'Família', 'Bíblia', 'Jovens'];
  const activeTags = potentialTags.filter(tag => {
    const search = tag.toLowerCase();
    return allNews.some(item => 
      item.title.toLowerCase().includes(search) || 
      item.contentSnippet?.toLowerCase().includes(search) ||
      item.categories?.some(cat => cat.toLowerCase().includes(search))
    );
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Featured News */}
      {featuredNews && (
        <section className="w-full py-8 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-semibold">
                  Destaque Global
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight line-clamp-3">
                  {featuredNews.title}
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed line-clamp-3">
                  {featuredNews.contentSnippet || "Leia a matéria completa clicando no botão abaixo."}
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
                  <Button asChild size="lg" className="font-semibold w-full sm:w-auto">
                    <a href={featuredNews.link} target="_blank" rel="noopener noreferrer">
                      Ler Matéria Completa
                    </a>
                  </Button>
                </div>
              </div>
              {/* Featured Image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border bg-muted flex items-center justify-center group order-1 lg:order-2">
                 <NewsImage 
                    src={featuredNews.imageUrl} 
                    alt={featuredNews.title} 
                    className="w-full h-full object-cover"
                 />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-16">
          
          {/* IASD Section */}
          <section>
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <Cross className="w-6 h-6" />
                </div>
                Igreja Adventista
              </h2>
            </div>
            
            <div className="grid gap-8">
              {remainingIasd.map((item, i) => (
                <Card key={i} className="group flex flex-col md:flex-row overflow-hidden border-none shadow-none hover:shadow-lg transition-all duration-300 bg-card/50 hover:bg-card">
                  <div className="w-full md:w-64 aspect-video md:aspect-auto bg-muted/50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    <NewsImage 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-4 md:py-2 md:px-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{item.source}</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.isoDate)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 leading-snug group-hover:text-primary transition-colors">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {item.contentSnippet}
                    </p>
                    <div className="mt-auto">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary group-hover:underline">Ler mais</a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* World Religion Section */}
          <section>
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <Globe className="w-6 h-6" />
                </div>
                Religiões do Mundo
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingWorld.map((item, i) => (
                <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-none bg-card/50 hover:bg-card">
                  <div className="aspect-[1.6/1] bg-muted/50 rounded-t-xl flex items-center justify-center overflow-hidden">
                     <NewsImage 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                      <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full">{item.source}</span>
                      <span>•</span>
                      <span>{formatDate(item.isoDate)}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 leading-tight group-hover:text-primary transition-colors">
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Trending / Top Stories */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Flame className="w-5 h-5 text-orange-500" /> Mais Lidas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid gap-6">
              {trendingNews.map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">0{i + 1}</span>
                  <div>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </a>
                    <span className="text-xs text-muted-foreground mt-1 block">{item.source}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
