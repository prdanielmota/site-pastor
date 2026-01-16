import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sobre o Pastor</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Conheça um pouco mais sobre minha trajetória e visão ministerial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Biografia</h2>
          <p className="text-muted-foreground leading-relaxed">
            Olá, sou o Pastor Daniel Mota. Tenho dedicado minha vida ao serviço do Reino de Deus e ao pastoreio de vidas. 
            Com formação teológica e anos de experiência ministerial, meu foco tem sido pregar o Evangelho de forma 
            clara, bíblica e relevante para os dias atuais.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Acredito que a igreja deve ser um lugar de acolhimento, transformação e envio. 
            Meu ministério é pautado no amor ao próximo, no ensino das Escrituras e no discipulado.
          </p>
        </div>
        <div className="flex justify-center">
          {/* Placeholder for Image */}
          <div className="relative w-full aspect-square max-w-sm bg-muted rounded-xl flex items-center justify-center overflow-hidden">
            <span className="text-muted-foreground">Foto do Pastor</span>
            {/* <Image src="/path/to/image.jpg" alt="Pastor Daniel Mota" fill className="object-cover" /> */}
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold text-center">Visão e Valores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">Centralidade de Cristo</h3>
              <p className="text-sm text-muted-foreground">
                Jesus é o centro de tudo o que fazemos e pregamos. Ele é o nosso único Salvador e Senhor.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">Ensino Bíblico</h3>
              <p className="text-sm text-muted-foreground">
                Compromisso inegociável com a verdade das Escrituras Sagradas como regra de fé e prática.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">Amor ao Próximo</h3>
              <p className="text-sm text-muted-foreground">
                Servir a comunidade e cuidar das pessoas com compaixão e graça, refletindo o amor de Deus.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
