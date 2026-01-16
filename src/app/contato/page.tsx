import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Calendar as CalendarIcon } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="flex flex-col items-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contato e Agenda</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Entre em contato para convites, pedidos de oração ou agendamento pastoral.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e retornaremos o mais breve possível.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" placeholder="Convite, Oração, Dúvida..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea id="message" placeholder="Escreva sua mensagem aqui..." className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full">Enviar Mensagem</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info & Booking */}
        <div className="space-y-8">
          {/* Booking Info */}
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Agendamento Pastoral
              </CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Gostaria de marcar um aconselhamento ou visita?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm opacity-90">
                Atendimentos são realizados presencialmente na igreja ou online via videochamada.
                Utilize o botão abaixo para verificar a disponibilidade.
              </p>
              <Button variant="secondary" className="w-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Agendar Horário
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <div className="grid gap-6">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">E-mail</h3>
                <p className="text-sm text-muted-foreground">contato@danielmota.com.br</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Telefone / WhatsApp</h3>
                <p className="text-sm text-muted-foreground">(00) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-bold">Localização</h3>
                <p className="text-sm text-muted-foreground">
                  Rua da Igreja, 123 - Centro<br />
                  Cidade - UF
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
