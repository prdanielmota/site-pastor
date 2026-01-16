# Plano Atualizado: Site Pessoal Pastoral (Docker/VPS)

Entendido. Vamos manter a estrutura moderna do Next.js, mas focar a infraestrutura para rodar em container Docker no seu VPS.

## 1. Ideias e Funcionalidades Chave (Mantido)
*   **Biblioteca de Sermões:** Áudio, vídeo e texto organizados.
*   **Agendamento Pastoral:** Integração para marcar atendimentos.
*   **Pedidos de Oração:** Formulário seguro.
*   **Blog/Devocionais:** Artigos e reflexões.

## 2. Stack Tecnológico
*   **Framework:** **Next.js** (React) - Performance e SEO.
*   **Estilização:** **Tailwind CSS** + **Shadcn/UI**.
*   **Infraestrutura:** **Docker** & **Docker Compose**.
    *   Criaremos uma imagem otimizada para produção (multi-stage build) para garantir leveza e segurança no seu VPS.

## 3. Passos de Implementação

1.  **Configuração do Projeto:** Inicializar Next.js, TypeScript e Tailwind.
2.  **Desenvolvimento da Aplicação:**
    *   Layout responsivo e navegação.
    *   Páginas: Home, Sobre, Sermões, Agendamento.
3.  **Dockerização (Novo Foco):**
    *   Criar `Dockerfile` otimizado para Next.js (standalone output).
    *   Criar `docker-compose.yml` para fácil orquestração no VPS.
4.  **Funcionalidades:** Implementar componentes de UI e formulários.
5.  **Build e Teste Local:** Garantir que o container suba corretamente antes de enviar para o VPS.

Podemos prosseguir com essa estrutura focada em Docker?