import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { fetchNews, getArticleBySlug } from "@/lib/rss";
import { NewsImage } from "@/components/ui/news-image";
import type { Metadata } from "next";

export const revalidate = 300;

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: ptBR });
  } catch {
    return dateStr;
  }
};

// Allow common article markup, strip scripts/handlers (XSS-safe).
const cleanHtml = (html?: string) =>
  sanitizeHtml(html || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption", "h1", "h2"]),
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
    },
  });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Notícia não encontrada" };
  return {
    title: article.title,
    description: article.contentSnippet?.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.contentSnippet?.slice(0, 160),
      images: article.imageUrl ? [article.imageUrl] : undefined,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const safeContent = cleanHtml(article.content);

  // "Leia Também": recent items from the same source, excluding this one.
  const all = await fetchNews("all");
  const related = all
    .filter((n) => n.source === article.source && n.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="container px-4 md:px-6 py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Home
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
              {article.source}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>
          {article.contentSnippet && (
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed line-clamp-3">
              {article.contentSnippet}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground border-y py-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.isoDate || article.pubDate)}</span>
            </div>
          </div>
        </header>

        {article.imageUrl && (
          <div className="aspect-video w-full bg-muted rounded-2xl mb-12 overflow-hidden shadow-sm">
            <NewsImage src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          {safeContent ? (
            <div
              className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />
          ) : (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {article.contentSnippet || "Conteúdo disponível na fonte original."}
            </p>
          )}

          <div className="mt-12 pt-8 border-t">
            <Button asChild size="lg" className="font-semibold">
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Ler na fonte original <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto mt-20 pt-12 border-t">
          <h2 className="text-2xl font-bold mb-8">Leia Também</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((item) => (
              <Card key={item.link} className="border-none shadow-none bg-transparent group">
                <div className="aspect-video bg-muted rounded-xl mb-4 overflow-hidden">
                  <NewsImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-0">
                  <div className="text-xs font-medium text-primary mb-2">{item.source}</div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    <Link href={`/noticia/${item.slug}`}>{item.title}</Link>
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
