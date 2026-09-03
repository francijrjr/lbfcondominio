# LBF Condomínio

Plataforma de gestão condominial para síndicos e moradores, com controle financeiro, cobranças e chamados de manutenção.

## Arquitetura

```text
api/       API REST em Express + TypeScript + Prisma
client/    Aplicação React + TypeScript criada com Vite
docs/      Requisitos, histórias de usuário e modelo de domínio
```

O banco de dados é Microsoft SQL Server 2022. O ambiente local pode ser iniciado por Docker Compose.

## Pré-requisitos

- Node.js 22.12 ou superior;
- pnpm 10 ou superior;
- Docker Desktop, ou uma instância acessível do SQL Server 2017 ou superior.

## Configuração

Instale as dependências:

```bash
pnpm install
```

Crie os arquivos de ambiente:

```powershell
Copy-Item api/.env.example api/.env
Copy-Item client/.env.example client/.env
Copy-Item .env.example .env
```

Inicie o SQL Server e crie o banco local:

```bash
docker compose up -d
```

Gere o cliente Prisma, aplique a estrutura do banco e carregue os dados de demonstração:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

Inicie frontend e backend:

```bash
pnpm dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3333`
- Health check: `http://localhost:3333/health`

## Acessos de demonstração

| Perfil | E-mail | Senha |
| ------ | ------ | ----- |
| Síndico | `sindico@lbf.com.br` | `123456` |
| Morador | `morador@lbf.com.br` | `123456` |

As credenciais acima são exclusivas para desenvolvimento e são criadas pelo seed.

## Comandos

| Comando | Descrição |
| ------- | --------- |
| `pnpm dev` | Inicia API e frontend. |
| `pnpm build` | Compila os dois projetos. |
| `pnpm typecheck` | Verifica os tipos TypeScript. |
| `pnpm lint` | Executa as verificações estáticas. |
| `pnpm db:generate` | Gera o Prisma Client. |
| `pnpm db:migrate` | Aplica as migrations existentes. |
| `pnpm db:migrate:dev` | Cria migrations durante o desenvolvimento. |
| `pnpm db:seed` | Insere os dados de demonstração. |

## Contribuição

Consulte o [guia de contribuição](CONTRIBUTING.md) antes de criar branches, commits ou Pull Requests. O projeto utiliza Git Flow, branches `feature/*`, Conventional Commits e code review obrigatório para alterações na `main`.
