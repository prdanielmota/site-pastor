import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Share2, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Mock data - in a real app, fetch based on slug
  const article = {
    title: "O Impacto da Fé no Mundo Moderno: Uma Análise Profunda",
    subtitle: "Como as comunidades religiosas estão moldando o futuro da sociedade em meio às transformações globais e tecnológicas.",
    author: "Redação Advento News",
    date: "17 de Outubro, 2024",
    readTime: "8 min de leitura",
    category: "Mundo",
    tags: ["Fé", "Sociedade", "Tecnologia", "Futuro"],
    content: `
      <p class="mb-6">Em um mundo cada vez mais conectado e tecnológico, a questão da fé e da espiritualidade continua a desempenhar um papel central na vida de bilhões de pessoas. Longe de se tornar obsoleta, a religião está encontrando novas formas de expressão e relevância no século XXI.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">A Resiliência das Comunidades de Fé</h2>
      <p class="mb-6">Estudos recentes indicam que, apesar da secularização em algumas partes do ocidente, a religiosidade global está em ascensão. As comunidades de fé têm demonstrado uma notável capacidade de adaptação, utilizando ferramentas digitais para expandir seu alcance e fortalecer laços comunitários.</p>
      
      <p class="mb-6">"A tecnologia não substitui a experiência espiritual, mas pode amplificá-la", afirma Dr. João Silva, sociólogo da religião. "Vemos igrejas utilizando streaming, aplicativos de meditação e grupos de estudo online para manter os fiéis engajados, especialmente após a pandemia."</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Desafios Éticos e Morais</h2>
      <p class="mb-6">Com o avanço da inteligência artificial e da biotecnologia, as tradições religiosas são frequentemente chamadas a oferecer orientações éticas. Questões sobre a natureza da consciência, a dignidade humana e os limites da intervenção científica encontram no discurso religioso um contraponto necessário e profundo.</p>

      <blockquote class="border-l-4 border-primary pl-4 italic text-lg my-8 text-muted-foreground">
        "O futuro da humanidade depende não apenas do nosso progresso técnico, mas da nossa evolução moral e espiritual."
      </blockquote>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusão</h2>
      <p class="mb-6">À medida que navegamos por tempos incertos, a fé oferece não apenas consolo, mas também um quadro de referência para entender nosso lugar no cosmos. O diálogo entre tradição e modernidade continuará a moldar o cenário global nas próximas décadas.</p>
    `
  };

  return (
    <div className="container px-4 md:px-6 py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Home
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
              {article.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {article.subtitle}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground border-y py-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-medium text-foreground">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video w-full bg-muted rounded-2xl mb-12 overflow-hidden shadow-sm flex items-center justify-center">
           <span className="text-muted-foreground">Imagem de Destaque do Artigo</span>
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-2 hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Compartilhar</p>
              <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                <Share2 className="w-4 h-4" />
              </Button>
              {/* Add more social buttons here */}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Link key={tag} href={`/tag/${tag.toLowerCase()}`}>
                    <span className="inline-flex items-center px-3 py-1 rounded-full border bg-muted/50 text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                      <Tag className="w-3 h-3 mr-2" /> {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 hidden lg:block">
             {/* Space for future sidebar ads or related links */}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="max-w-6xl mx-auto mt-20 pt-12 border-t">
        <h2 className="text-2xl font-bold mb-8">Leia Também</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-none shadow-none bg-transparent group">
              <div className="aspect-video bg-muted rounded-xl mb-4 overflow-hidden">
                <div className="w-full h-full bg-muted-foreground/10 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <CardContent className="p-0">
                <div className="text-xs font-medium text-primary mb-2">Relacionado</div>
                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                  <Link href="#">Outra notícia interessante sobre o mesmo tema para continuar a leitura.</Link>
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
