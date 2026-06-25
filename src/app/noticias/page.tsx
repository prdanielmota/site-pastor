import { Newspaper } from "lucide-react";
import { fetchNews } from "@/lib/rss";
import { NewsSearchList } from "@/components/news-search-list";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Notícias",
  description: "Todas as notícias da Igreja Adventista e do mundo religioso, atualizadas das fontes oficiais.",
};

export default async function NoticiasPage() {
  const news = await fetchNews("all");

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

      <NewsSearchList items={news} />
    </div>
  );
}
