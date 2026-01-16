import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight, Flame, Newspaper, Globe, Cross } from "lucide-react";
import { fetchNews, NewsItem } from "@/lib/rss";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// Utility to format date
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ptBR });
  } catch (e) {
    return dateStr;
  }
};

// Utility to get image placeholder
const getImage = (item: NewsItem) => {
  return item.imageUrl ? (
    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  ) : (
    <div className="w-full h-full bg-muted/50 flex items-center justify-center">
      <Globe className="w-8 h-8 text-muted-foreground/30" />
    </div>
  );
};

export default async function Home() {
  const iasdNews = await fetchNews('iasd');
  const worldNews = await fetchNews('mundo');
  
  // Use the latest news as featured, or fallback
  const featuredNews = iasdNews[0] || worldNews[0];
  const remainingIasd = iasdNews.filter(n => n.link !== featuredNews?.link).slice(0, 5);
  const remainingWorld = worldNews.filter(n => n.link !== featuredNews?.link).slice(0, 6);
  
  // Trending could be a mix
  const trendingNews = [...iasdNews, ...worldNews].sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Featured News */}
      {featuredNews && (
        <section className="w-full py-12 md:py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-semibold">
                  Destaque Global
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight line-clamp-3">
                  {featuredNews.title}
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed line-clamp-3">
                  {featuredNews.contentSnippet || "Leia a matéria completa clicando no botão abaixo."}
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
                  <Button asChild size="lg" className="font-semibold">
                    <a href={featuredNews.link} target="_blank" rel="noopener noreferrer">
                      Ler Matéria Completa
                    </a>
                  </Button>
                </div>
              </div>
              {/* Featured Image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border bg-muted flex items-center justify-center group">
                 {featuredNews.imageUrl ? (
                    <img src={featuredNews.imageUrl} alt={featuredNews.title} className="w-full h-full object-cover" />
                 ) : (
                    <div className="flex items-center justify-center w-full h-full bg-muted">
                        <Globe className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                 )}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container px-4 md:px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
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
              <Link href="/categoria/iasd" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                Ver tudo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid gap-8">
              {remainingIasd.map((item, i) => (
                <Card key={i} className="group flex flex-col md:flex-row overflow-hidden border-none shadow-none hover:shadow-lg transition-all duration-300 bg-card/50 hover:bg-card">
                  <div className="w-full md:w-64 aspect-video md:aspect-auto bg-muted/50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {getImage(item)}
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
              <Link href="/categoria/mundo" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
                Ver tudo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingWorld.map((item, i) => (
                <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-none bg-card/50 hover:bg-card">
                  <div className="aspect-[1.6/1] bg-muted/50 rounded-t-xl flex items-center justify-center overflow-hidden">
                     {getImage(item)}
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

          {/* Newsletter Widget */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h3 className="text-xl font-bold mb-2">Boletim Diário</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receba as principais notícias do mundo religioso diretamente no seu e-mail.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Seu e-mail principal" 
                className="w-full px-4 py-2.5 rounded-lg bg-background border focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <Button className="w-full font-semibold">
                Inscrever-se Agora
              </Button>
            </form>
          </div>

          {/* Categories Cloud */}
          <div>
            <h3 className="font-bold text-lg mb-4">Explorar Tópicos</h3>
            <div className="flex flex-wrap gap-2">
              {['Teologia', 'Missões', 'Saúde', 'Educação', 'Arqueologia', 'Profecias', 'Vaticano', 'Liberdade Religiosa'].map((tag) => (
                <Link 
                  key={tag} 
                  href={`/tag/${tag.toLowerCase()}`}
                  className="px-3 py-1.5 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
