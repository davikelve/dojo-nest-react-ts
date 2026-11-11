---
titulo: Cockpit — Desenho da Solução
subtitulo: O painel de comando do dia de um tech lead · NestJS + React + TypeScript
rotulo: Documento de arquitetura
autor: Davi Kelve
badges: Aprovado em 31/10/2026:ok, v1.0
kpis: Módulos de domínio=11:ok; Telas=12; Decisões aprovadas=9:ok; Sprints até o MVP=10
---

# Parte 1 — Produto

## Visão do produto

**Cockpit** é um app pessoal de organização do dia de trabalho, desenhado para quem programa e lidera
gente ao mesmo tempo. Ele responde a três perguntas, todo dia, em qualquer trabalho:

1. **O que eu preciso resolver hoje?** — e cabe no meu dia?
2. **O que eu estou esperando dos outros?** — delegações, reviews, respostas.
3. **O que eu fiz?** — para a daily, para a 1:1 com o gestor, para a revisão da semana.

### O problema

O dia de um tech lead é fragmentado: código próprio, review de PR, reunião, 1:1, decisão técnica,
cobrança de entrega, apagar incêndio. As ferramentas da empresa (Jira, Azure Boards, ServiceNow) organizam
o trabalho **do time**; ninguém organiza o trabalho **da pessoa**. O resultado é post-it, bloco de notas e
"esqueci de cobrar".

### A proposta

| Pilar | O que entrega |
|---|---|
| **Captura em 2 segundos** | `Ctrl+K` ou `N` de qualquer lugar; sintaxe rápida: `Revisar PR do login amanhã !p1 #review @empresa ~30m` |
| **Plano do dia com capacidade** | ritual de abertura (5 min): escolhe o que entra, marca o *Top 3*, vê se cabe nas horas livres |
| **Universal por contextos** | *workspaces* — Empresa, Freela, Pessoal — com cor; o dia mostra tudo junto, ou filtra |
| **Ferramentas de liderança** | pessoas do time, pauta de 1:1, delegações com data de cobrança, registro de decisões |
| **Fechamento automático** | standup gerado (ontem / hoje / impedimentos), revisão semanal com métricas |

### Princípios de produto

- **Teclado primeiro.** Tudo tem atalho; o mouse é opcional. É um app de dev.
- **Fricção zero na entrada, rigor na saída.** Capturar é instantâneo; organizar acontece no ritual.
- **O dia é finito.** O app mostra capacidade e recusa a ilusão do "dá tempo".
- **Seu, e só seu.** Pessoal, sem colaboração no MVP — cada dado pertence a um único usuário.
- **Honesto.** Tarefa que vira o dia três vezes é sinalizada como *zumbi*: quebre, delegue ou descarte.

## Persona e um dia na vida

**A persona: tech lead.** Programa, revisa, conduz o time, responde ao gestor. Às vezes pega um freela à noite.

| Hora | Momento | O que o Cockpit faz |
|---|---|---|
| 08:45 | Abre o computador | Tela **Hoje** abre com o *ritual de abertura*: o que sobrou de ontem, delegações a cobrar hoje, 1:1s do dia |
| 08:50 | Planeja | Arrasta tarefas para o dia, marca o *Top 3*, a barra de capacidade fica verde (5h10 de 6h) |
| 09:15 | Daily | Botão **Standup** → texto pronto (ontem / hoje / impedimentos), copia e cola no chat do time |
| 10:00 | Foco | `F` inicia sessão de foco de 25 min na tarefa atual; o tempo fica registrado na tarefa |
| 11:30 | Reunião de arquitetura | Nota rápida da reunião; dois itens viram tarefas; uma escolha vira **Decisão** (ADR-lite) |
| 14:00 | 1:1 com a Ana | Abre a pessoa → a pauta já tem o que ficou da 1:1 anterior; nova ação: "Ana estuda filas" com cobrança em 7 dias |
| 16:20 | Interrupção | `N` → "Investigar erro no deploy !p1 hoje" — entra no dia e alerta que estourou a capacidade |
| 18:00 | Fecha o dia | *Ritual de fechamento*: o que não terminou volta para amanhã ou para o backlog; nota do dia |
| Sexta | Revisão semanal | Planejado × feito, horas por contexto, tarefas zumbis, delegações vencidas |

## Escopo funcional

### Mapa de módulos

| # | Módulo | Responsabilidade | Fase |
|---:|---|---|---|
| 1 | **Auth** | cadastro, login, refresh com rotação, logout, sessão | MVP |
| 2 | **Users** | perfil, fuso horário, jornada (horas úteis do dia), preferências | MVP |
| 3 | **Workspaces** | contextos (Empresa, Freela, Pessoal), cor, ordem, arquivamento | MVP |
| 4 | **Tasks** | tarefa, status, prioridade, estimativa, prazo, checklist, links, captura rápida | MVP |
| 5 | **Tags** | etiquetas livres por usuário (`#review`, `#bug`, `#estudo`) | MVP |
| 6 | **Daily Plans** | plano do dia, Top 3, capacidade, abertura e fechamento, *carry-over* | MVP |
| 7 | **Focus** | sessões de foco (pomodoro) e apontamento de tempo por tarefa | MVP |
| 8 | **Standup** | relatório gerado ontem / hoje / impedimentos, por contexto | MVP |
| 9 | **People** | pessoas do time, delegações com data de cobrança, pauta e histórico de 1:1 | MVP |
| 10 | **Decisions** | registro de decisões técnicas (contexto, opções, decisão, consequências) | MVP |
| 11 | **Insights** | revisão semanal: planejado × feito, tempo por contexto, zumbis, delegações vencidas | MVP |
| — | Meetings | notas de reunião com itens de ação que viram tarefa | v1.1 |
| — | Integração GitHub | PRs aguardando seu review entram na Inbox | v2 |
| — | Calendário (ICS) | reuniões do dia descontam da capacidade | v2 |
| — | PWA + notificações | instalar no celular, lembrete de cobrança e de fechamento | v2 |
| — | Assistente IA | sugere o plano do dia a partir do backlog e da capacidade | v2 |

### Histórias de usuário do MVP (resumo)

| ID | Como tech lead, eu quero… | para… |
|---|---|---|
| US-01 | capturar uma tarefa com uma linha de texto | não perder nada no meio de uma conversa |
| US-02 | ver numa tela só o que é para hoje, de todos os contextos | começar o dia sem caçar informação |
| US-03 | montar o plano do dia e ver se cabe na minha jornada | não me comprometer com o impossível |
| US-04 | marcar até 3 tarefas como foco do dia | priorizar de verdade |
| US-05 | que o que não terminei volte sozinho no dia seguinte | não precisar replanejar do zero |
| US-06 | gerar o texto da daily | economizar 5 minutos todo dia |
| US-07 | delegar algo a alguém com data de cobrança | lembrar de cobrar sem depender da memória |
| US-08 | ter a pauta da próxima 1:1 já montada | conduzir 1:1s consistentes |
| US-09 | registrar decisões técnicas com contexto | saber daqui a 6 meses *por que* decidimos aquilo |
| US-10 | marcar foco numa tarefa e medir o tempo | entender onde meu dia realmente vai |
| US-11 | ver uma revisão da semana | melhorar meu próprio processo |

## Regras de negócio

| ID | Regra |
|---|---|
| RN-01 | Toda tarefa pertence a **um** workspace. No cadastro o usuário ganha o workspace *Pessoal*. Workspace com tarefas abertas não é excluído — é arquivado. |
| RN-02 | Ciclo de status: `INBOX → TODO → DOING → DONE`, com `BLOCKED` (exige motivo) e `CANCELED`. `DONE` grava `completedAt`; reabrir apaga. Transição inválida responde `409`. |
| RN-03 | Existe **um** plano por usuário por dia, onde *dia* é a data no fuso do usuário. No máximo **3** itens marcados como *foco*. |
| RN-04 | Capacidade do dia = jornada configurada (padrão 6h úteis) − reuniões do dia (v2). Soma das estimativas acima de 100% gera aviso, nunca bloqueio. Tarefa sem estimativa conta 30 min. |
| RN-05 | **Carry-over:** à meia-noite local, item não concluído do plano de ontem é marcado `carriedOver`, e o contador `carryOverCount` da tarefa sobe. Com 3 ou mais, a tarefa é *zumbi* e o ritual sugere quebrar, delegar ou descartar. |
| RN-06 | Só existe **uma** sessão de foco ativa por usuário. Iniciar outra encerra a anterior. Sessão abaixo de 1 minuto é descartada. |
| RN-07 | Tarefa **delegada** (`delegatedToId`) exige `followUpAt`. No dia da cobrança ela aparece em *Cobrar hoje*. |
| RN-08 | Item de pauta de 1:1 não discutido migra sozinho para a próxima 1:1 com a mesma pessoa. |
| RN-09 | Standup: *Ontem* = tarefas concluídas no último dia útil (segunda olha a sexta); *Hoje* = itens do plano; *Impedimentos* = tarefas `BLOCKED`. Filtrável por workspace. |
| RN-10 | Exclusão é lógica (`deletedAt`) e vai para a lixeira por 30 dias; um job limpa depois. |
| RN-11 | **Isolamento:** toda consulta filtra por `userId`. Acessar recurso de outro usuário responde `404` (não `403`), para não revelar que o id existe. |
| RN-12 | Instantes são gravados em UTC (`timestamptz`); *datas de calendário* (prazo, dia do plano) são `date` sem fuso, calculadas no fuso do usuário. |

# Parte 2 — Arquitetura

## Visão de contexto e contêineres (C4)

### Nível 1 — Contexto

```
                 ┌────────────────────────┐
                 │   Você (tech lead)     │
                 │ navegador / celular    │
                 └───────────┬────────────┘
                             │ HTTPS
                 ┌───────────▼────────────┐        v2: ┌──────────────┐
                 │        COCKPIT         │───────────▶│ GitHub API   │
                 │ organiza o dia de      │            └──────────────┘
                 │ trabalho do usuário    │        v2: ┌──────────────┐
                 └────────────────────────┘───────────▶│ Calendário   │
                                                       │ (ICS)        │
                                                       └──────────────┘
```

### Nível 2 — Contêineres

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ Navegador                                                                      │
│  ┌──────────────────────────────────────────┐                                  │
│  │ apps/web  — SPA React 19 + TypeScript    │                                  │
│  │ Vite · React Router · TanStack Query     │                                  │
│  │ Tailwind · shadcn/ui · cliente gerado    │                                  │
│  └───────────────────┬──────────────────────┘                                  │
└──────────────────────┼─────────────────────────────────────────────────────────┘
                       │ JSON /api/v1  (Bearer access token + cookie httpOnly de refresh)
┌──────────────────────▼──────────────────────────────────────────────┐
│ apps/api — NestJS 12 (monólito modular, ESM)                        │
│  Controllers ─▶ Services ─▶ Prisma          EventEmitter (domínio)  │
│  Guards · Pipes · Filters · Interceptors    Scheduler (jobs/cron)   │
│  OpenAPI em /docs  ·  health em /health     Logger estruturado pino │
└──────────────────────┬──────────────────────────────────────────────┘
                       │ SQL (TLS)
            ┌──────────▼──────────┐
            │ PostgreSQL 17       │
            └─────────────────────┘
```

## Stack e os porquês

| Camada | Escolha | Por quê |
|---|---|---|
| Linguagem | **TypeScript** estrito nos dois lados | um idioma só; `strict: true` desde o dia 1 |
| Backend | **NestJS 12** (ESM) | requisito; DI, módulos e CLI são o que mais se cobra em vaga Node sênior |
| ORM | **Prisma** | schema declarativo, migrations versionadas, tipos gerados; o mais usado com Nest hoje |
| Banco | **PostgreSQL 17** | relacional, `date`/`timestamptz` corretos, índices parciais, padrão de mercado |
| Validação API | **class-validator + class-transformer** | é o idioma nativo do Nest (o `nest g resource` gera DTO em classe) |
| Contrato | **OpenAPI** (`@nestjs/swagger` com plugin da CLI) → **orval** | a API é a fonte única; o front ganha tipos e hooks gerados, sem digitar tipo duas vezes |
| Auth | **@nestjs/jwt** + guard global + **argon2** | JWT curto em memória, refresh rotativo em cookie httpOnly |
| Jobs | **@nestjs/schedule** | carry-over à meia-noite local, limpeza da lixeira |
| Eventos | **@nestjs/event-emitter** | desacopla módulos (tarefa concluída → estatística, standup) |
| Logs | **nestjs-pino** | JSON estruturado com `requestId` |
| Segurança | **helmet**, **@nestjs/throttler**, CORS restrito | o básico bem feito |
| Saúde | **@nestjs/terminus** | `/health` para o deploy |
| Frontend | **React 19 + Vite** | requisito; Vite é o padrão atual para SPA |
| Roteamento | **React Router** (modo biblioteca; 8.5 em 31/10/2026) | o mais difundido; *loaders* opcionais |
| Estado servidor | **TanStack Query** | cache, *optimistic update*, revalidação — o coração do front |
| Estado UI | **Zustand** (pouco) | só o que não é do servidor: token em memória, timer de foco, preferências |
| UI | **Tailwind CSS 4 + shadcn/ui** (Radix) | componentes acessíveis que ficam no seu repositório |
| Formulários | **React Hook Form + Zod** | validação no cliente sem re-render |
| Extras | **cmdk** (paleta), **dnd-kit** (arrastar), **date-fns**, **Recharts**, **sonner** | cada um resolve uma coisa só |
| Testes | **Vitest** nos dois lados (padrão do Nest 12 e do Vite), **Testing Library + MSW** (web), **Playwright** (smoke e2e) | pirâmide de testes com uma ferramenta só |
| Qualidade | **oxlint** (padrão do Nest 12 e do Vite 8), Prettier, Husky, lint-staged, commitlint | Conventional Commits e nada de lint quebrado no repositório |
| CI | **GitHub Actions** com Postgres como *service* | lint, testes, e2e e build a cada PR |

## Arquitetura do backend

### Estilo: monólito modular

Um deploy só, dividido em módulos de domínio com fronteiras claras. É o desenho certo para um produto
de uma pessoa: simples de operar, e cada módulo poderia virar serviço se um dia precisasse.

**Regras de fronteira:**

- Cada módulo é **dono** das suas tabelas. Outro módulo não consulta a tabela alheia direto: usa o
  *service* exportado pelo módulo dono ou reage a um evento.
- Dependência entre módulos é **explícita** no `imports` do `@Module`. Ciclo de dependência é defeito de
  desenho, não caso para `forwardRef`.
- Controller é fino: recebe, valida (DTO), delega ao service, devolve. Regra de negócio mora no service.

### Camadas dentro de um módulo

```
HTTP ─▶ Guard (auth) ─▶ Pipe (validação do DTO) ─▶ Controller ─▶ Service ─▶ PrismaService ─▶ Postgres
                                                        │            │
                                         Interceptor ◀──┘            └──▶ EventEmitter ─▶ @OnEvent em outro módulo
                                         (log, serialização)
Erros: qualquer exceção ─▶ ProblemDetailsFilter ─▶ resposta RFC 9457
```

### Estrutura de pastas da API

```
apps/api/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── prisma.config.ts
├── src/
│   ├── main.ts                      # bootstrap: prefixo, versão, pipes, helmet, swagger
│   ├── app.module.ts
│   ├── config/                      # validação do .env (Joi) e config tipada
│   ├── core/                        # infraestrutura transversal
│   │   ├── prisma/                  # PrismaModule (global) + PrismaService
│   │   └── health/                  # /health (terminus)
│   ├── common/                      # peças reaproveitáveis sem domínio
│   │   ├── decorators/              # @Public(), @CurrentUser()
│   │   ├── filters/                 # ProblemDetailsFilter, PrismaExceptionFilter
│   │   ├── interceptors/
│   │   ├── pipes/                   # ParseDatePipe (YYYY-MM-DD)
│   │   └── dto/                     # PaginationQueryDto, PageDto<T>
│   └── modules/
│       ├── auth/                    # controller, service, guards/, strategies de token, dto/
│       ├── users/
│       ├── workspaces/
│       ├── tasks/
│       │   ├── dto/
│       │   ├── quick-add/           # parser puro da captura rápida (100% testado)
│       │   ├── task-status.machine.ts
│       │   ├── tasks.controller.ts
│       │   ├── tasks.service.ts
│       │   └── tasks.module.ts
│       ├── tags/
│       ├── daily-plans/             # + daily-plans.scheduler.ts (carry-over)
│       ├── focus/
│       ├── standup/                 # só leitura: monta o relatório
│       ├── people/                  # pessoas, delegações, 1:1 (one-on-ones/)
│       ├── decisions/
│       └── insights/                # só leitura: revisão semanal
└── test/                            # e2e (supertest) + utilitários de fábrica de dados
```

### Peças transversais

| Peça | Tipo Nest | Faz |
|---|---|---|
| `JwtAuthGuard` | Guard global (`APP_GUARD`) | toda rota é protegida; `@Public()` abre exceção |
| `ThrottlerGuard` | Guard global | 100 req/min por IP; login e cadastro com 5/min |
| `ValidationPipe` | Pipe global | `whitelist`, `forbidNonWhitelisted`, `transform` |
| `ProblemDetailsFilter` | Exception filter global | toda falha sai no formato RFC 9457 |
| `PrismaExceptionFilter` | Exception filter | `P2002` → 409, `P2025` → 404 |
| `@CurrentUser()` | Param decorator | injeta `{ id, email }` do token no handler |
| `ParseDatePipe` | Pipe | valida `YYYY-MM-DD` nos parâmetros de dia |
| `LoggerModule` | nestjs-pino | log JSON, `requestId`, sem corpo de requisição em produção |

### Eventos de domínio

| Evento | Emitido por | Ouvido por | Efeito |
|---|---|---|---|
| `task.completed` | Tasks | DailyPlans, Insights | marca o item do plano como feito; contabiliza |
| `task.reopened` | Tasks | DailyPlans | desfaz o feito |
| `task.deleted` | Tasks | DailyPlans, Focus | tira do plano; encerra foco ativo nela |
| `focus.stopped` | Focus | Tasks | soma `trackedMinutes` na tarefa |
| `one-on-one.closed` | People | People | migra itens não discutidos (RN-08) |
| `user.registered` | Auth | Workspaces | cria o workspace *Pessoal* (RN-01) |

### Jobs agendados

| Job | Quando | Faz |
|---|---|---|
| `carry-over` | **a cada hora**, minuto 5 | processa só os usuários cujo relógio local acabou de passar da meia-noite (RN-05) — por isso roda de hora em hora e não uma vez por dia |
| `trash-purge` | diário, 03:00 UTC | apaga de vez o que está na lixeira há mais de 30 dias (RN-10) |
| `stale-focus` | a cada 15 min | encerra sessão de foco aberta há mais de 4h (aba esquecida) |

## Modelo de dados

### Diagrama entidade-relacionamento

```
User 1──* Session            (refresh tokens, rotação por família)
User 1──* Workspace 1──* Task *──* Tag   (via TaskTag)
                         Task 1──* ChecklistItem
                         Task *──1 Person        (delegatedTo, opcional)
User 1──* DailyPlan 1──* DailyPlanItem *──1 Task
User 1──* FocusSession *──1 Task
User 1──* Person 1──* OneOnOne 1──* OneOnOneItem
User 1──* Decision *──1 Workspace
```

### Schema Prisma (núcleo)

```prisma
enum TaskStatus   { INBOX TODO DOING BLOCKED DONE CANCELED }
enum TaskPriority { P1 P2 P3 P4 }

model User {
  id            String   @id @default(uuid(7)) @db.Uuid
  email         String   @unique
  passwordHash  String
  name          String
  timezone      String   @default("America/Fortaleza")
  workdayMinutes Int     @default(360)
  createdAt     DateTime @default(now()) @db.Timestamptz
  updatedAt     DateTime @updatedAt @db.Timestamptz

  sessions   Session[]
  workspaces Workspace[]
  tasks      Task[]
  plans      DailyPlan[]
  people     Person[]
}

model Session {
  id         String    @id @default(uuid(7)) @db.Uuid
  userId     String    @db.Uuid
  familyId   String    @db.Uuid            // rotação: reuso de token revoga a família
  tokenHash  String    @unique             // nunca o token em claro
  userAgent  String?
  expiresAt  DateTime  @db.Timestamptz
  revokedAt  DateTime? @db.Timestamptz
  createdAt  DateTime  @default(now()) @db.Timestamptz
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId])
}

model Workspace {
  id         String    @id @default(uuid(7)) @db.Uuid
  userId     String    @db.Uuid
  name       String
  color      String    @default("#6366F1")
  position   Int       @default(0)
  archivedAt DateTime? @db.Timestamptz
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks      Task[]
  @@unique([userId, name])
}

model Task {
  id             String       @id @default(uuid(7)) @db.Uuid
  userId         String       @db.Uuid
  workspaceId    String       @db.Uuid
  title          String       @db.VarChar(200)
  description    String?                       // markdown
  status         TaskStatus   @default(INBOX)
  priority       TaskPriority @default(P3)
  estimateMin    Int?
  trackedMin     Int          @default(0)
  dueDate        DateTime?    @db.Date
  blockedReason  String?
  externalUrl    String?                       // PR, ticket, doc
  delegatedToId  String?      @db.Uuid
  followUpAt     DateTime?    @db.Date
  carryOverCount Int          @default(0)
  position       String       @default("a0")   // índice fracionário para arrastar sem renumerar
  completedAt    DateTime?    @db.Timestamptz
  deletedAt      DateTime?    @db.Timestamptz
  createdAt      DateTime     @default(now()) @db.Timestamptz
  updatedAt      DateTime     @updatedAt @db.Timestamptz

  user        User           @relation(fields: [userId], references: [id], onDelete: Cascade)
  workspace   Workspace      @relation(fields: [workspaceId], references: [id])
  delegatedTo Person?        @relation(fields: [delegatedToId], references: [id], onDelete: SetNull)
  tags        TaskTag[]
  checklist   ChecklistItem[]
  planItems   DailyPlanItem[]

  @@index([userId, status])
  @@index([userId, dueDate])
  @@index([userId, followUpAt])
}

model DailyPlan {
  id        String    @id @default(uuid(7)) @db.Uuid
  userId    String    @db.Uuid
  date      DateTime  @db.Date                 // o "dia" no fuso do usuário
  startedAt DateTime? @db.Timestamptz          // ritual de abertura feito
  closedAt  DateTime? @db.Timestamptz          // ritual de fechamento feito
  note      String?                            // nota do dia (fechamento)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     DailyPlanItem[]
  @@unique([userId, date])
}

model DailyPlanItem {
  id          String    @id @default(uuid(7)) @db.Uuid
  planId      String    @db.Uuid
  taskId      String    @db.Uuid
  isFocus     Boolean   @default(false)        // Top 3 (RN-03)
  position    String    @default("a0")
  carriedOver Boolean   @default(false)
  doneAt      DateTime? @db.Timestamptz
  plan        DailyPlan @relation(fields: [planId], references: [id], onDelete: Cascade)
  task        Task      @relation(fields: [taskId], references: [id], onDelete: Cascade)
  @@unique([planId, taskId])
}
```

Os demais modelos seguem o mesmo padrão (sempre `userId`, `uuid(7)`, `timestamptz`):

| Modelo | Campos principais |
|---|---|
| `Tag` / `TaskTag` | `name` único por usuário, `color` · tabela de junção com chave composta |
| `ChecklistItem` | `taskId`, `text`, `done`, `position` |
| `FocusSession` | `taskId?`, `startedAt`, `endedAt?`, `plannedMin` (25), `interrupted` · índice parcial: um ativo por usuário |
| `Person` | `name`, `role`, `email?`, `notes`, `oneOnOneEveryDays` (cadência), `archivedAt?` |
| `OneOnOne` | `personId`, `date`, `notes`, `mood` (1–5), `closedAt?` |
| `OneOnOneItem` | `oneOnOneId`, `text`, `kind` (`TOPIC` / `ACTION` / `FEEDBACK`), `discussed`, `taskId?` |
| `Decision` | `workspaceId`, `title`, `status` (`PROPOSED` / `ACCEPTED` / `SUPERSEDED`), `context`, `options`, `decision`, `consequences`, `decidedAt`, `supersededById?` |

> [!INFO] Por que uuid v7?
> É ordenável pelo tempo (bom para índice B-tree e para paginação por cursor) e não expõe a contagem
> de registros como um id sequencial expõe.

> [!ATENCAO] Índice parcial do foco ativo
> "Uma sessão ativa por usuário" (RN-06) é garantida pelo banco, não só pelo código:
> `CREATE UNIQUE INDEX ... ON "FocusSession"("userId") WHERE "endedAt" IS NULL;` — o Prisma não declara
> índice parcial no schema, então ele entra numa migration editada à mão (`--create-only`). É um ótimo
> exercício de "o ORM não faz tudo".

## API REST

### Convenções

- Base: `/api/v1` (versionamento por URI do Nest). Documentação viva em `/docs`; o JSON em `/docs-json`.
- Recursos no plural, `kebab-case`: `/daily-plans`, `/one-on-ones`.
- `GET` lista com **paginação por cursor**: `?limit=50&cursor=<id>` → `{ data: [...], nextCursor }`.
- Filtros por query: `/tasks?status=TODO,DOING&workspaceId=…&due=today&tag=review&q=texto`.
- `PATCH` parcial; mudança de estado com regra vira **ação explícita**: `POST /tasks/:id/status`.
- Datas de calendário em `YYYY-MM-DD`; instantes em ISO 8601 com `Z`.
- Erros no formato **RFC 9457** (`application/problem+json`):

```json
{
  "type": "https://cockpit.dev/errors/invalid-transition",
  "title": "Transição de status inválida",
  "status": 409,
  "detail": "Não é possível ir de DONE para BLOCKED.",
  "instance": "/api/v1/tasks/0192f1a0-.../status",
  "requestId": "7f3c9e"
}
```

### Endpoints

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | cria conta (público) |
| POST | `/auth/login` | devolve `accessToken` + seta cookie de refresh (público) |
| POST | `/auth/refresh` | rotaciona o refresh, devolve novo access (cookie) |
| POST | `/auth/logout` | revoga a sessão atual |
| GET / PATCH | `/users/me` | perfil, fuso, jornada |
| GET / POST | `/workspaces` | listar / criar |
| PATCH / DELETE | `/workspaces/:id` | editar / arquivar |
| GET / POST | `/tasks` | listar com filtros / criar |
| POST | `/tasks/quick-add` | cria a partir da linha de texto |
| POST | `/tasks/quick-add/preview` | só interpreta, não grava (pré-visualização ao digitar) |
| GET / PATCH / DELETE | `/tasks/:id` | detalhe / editar / mandar para a lixeira |
| POST | `/tasks/:id/status` | transição de status (RN-02) |
| POST | `/tasks/:id/move` | reordena (`before`/`after`) |
| POST / PATCH / DELETE | `/tasks/:id/checklist[/:itemId]` | checklist |
| GET / POST / PATCH / DELETE | `/tags[/:id]` | etiquetas |
| GET | `/daily-plans/:date` | plano do dia (cria vazio se não existe) + capacidade |
| PUT | `/daily-plans/:date/items` | define itens, ordem e Top 3 |
| POST | `/daily-plans/:date/start` | conclui o ritual de abertura |
| POST | `/daily-plans/:date/close` | fecha o dia: destino de cada pendente + nota |
| GET | `/focus/current` | sessão ativa |
| POST | `/focus/start` · `/focus/stop` | inicia / encerra |
| GET | `/standup?date=&workspaceId=` | relatório pronto (JSON + `text` em markdown) |
| GET / POST / PATCH / DELETE | `/people[/:id]` | pessoas |
| GET | `/people/:id/delegations` | o que está com a pessoa |
| GET / POST | `/people/:id/one-on-ones` | histórico / nova 1:1 (pauta pré-preenchida) |
| PATCH | `/one-on-ones/:id` · POST `/one-on-ones/:id/close` | anotar / encerrar (RN-08) |
| GET / POST / PATCH | `/decisions[/:id]` | decisões |
| GET | `/insights/weekly?week=2026-W44` | revisão semanal |
| GET | `/health` | saúde (público, fora do versionamento) |

### Exemplo — captura rápida

```http
POST /api/v1/tasks/quick-add/preview
{ "text": "Revisar PR do login amanhã !p1 #review @empresa ~30m >ana" }

200 OK
{
  "title": "Revisar PR do login",
  "dueDate": "2026-11-01",
  "priority": "P1",
  "tags": ["review"],
  "workspace": { "id": "…", "name": "Empresa" },
  "estimateMin": 30,
  "delegatedTo": { "id": "…", "name": "Ana" },
  "warnings": []
}
```

| Token | Significado | Exemplos |
|---|---|---|
| `@nome` | workspace | `@empresa`, `@freela` |
| `#nome` | tag (cria se não existir) | `#review`, `#bug` |
| `!p1`..`!p4` | prioridade | `!p1` |
| `~tempo` | estimativa | `~30m`, `~1h30`, `~2h` |
| `>nome` | delegar a uma pessoa | `>ana` |
| data | prazo | `hoje`, `amanhã`, `seg`..`dom`, `15/11`, `+3d` |

## Segurança

### Fluxo de autenticação

```
login ──▶ API valida senha (argon2id) ──▶ cria Session(familyId, tokenHash)
      ◀── { accessToken (JWT, 15 min) }  +  Set-Cookie: rt=<opaco>; HttpOnly; Secure; SameSite=Strict; Path=/api/v1/auth

requisição ──▶ Authorization: Bearer <access>  (guardado SÓ em memória no front)

401 ──▶ front chama /auth/refresh (o cookie vai sozinho)
      ──▶ API: hash(rt) existe e não revogado?  sim → revoga, emite novo par (mesma família)
                                                 já revogado? → REUSO DETECTADO → revoga a família toda
```

| Ameaça | Controle |
|---|---|
| Roubo de token por XSS | access token só em memória; refresh em cookie `HttpOnly` que o JS não lê |
| Reuso de refresh roubado | rotação por família com detecção de reuso |
| CSRF no refresh | `SameSite=Strict` + `Path` restrito + checagem de `Origin` |
| Força bruta | throttler 5/min em login; argon2id; mensagem genérica "credenciais inválidas" |
| IDOR (ver dado alheio) | todo `where` tem `userId`; teste e2e específico para isso (RN-11) |
| Mass assignment | `whitelist` + `forbidNonWhitelisted` no `ValidationPipe` |
| Cabeçalhos | `helmet`; CORS só com a origem do front |
| Segredos | `.env` fora do git, validados no boot (Joi); em produção, variáveis do provedor |
| Dependências | Dependabot + `npm audit` no CI |

## Arquitetura do frontend

### Estrutura (por feature)

```
apps/web/src/
├── main.tsx
├── app/
│   ├── router.tsx               # rotas, layout autenticado, lazy por página
│   ├── providers.tsx            # QueryClient, Theme, Toaster, Tooltip
│   └── layouts/AppShell.tsx     # sidebar + conteúdo + painel de detalhe
├── api/
│   ├── http.ts                  # fetch com Bearer + refresh automático (fila única)
│   └── generated/               # gerado pelo orval a partir do openapi.json (não editar)
├── features/
│   ├── auth/                    # LoginPage, RegisterPage, useSession
│   ├── today/                   # TodayPage, CapacityBar, FocusList, FollowUpList
│   ├── planning/                # PlanningRitual (abertura), ShutdownRitual (fechamento)
│   ├── tasks/                   # TaskList, TaskRow, TaskDetailSheet, QuickAdd, filtros
│   ├── focus/                   # FocusTimer (Zustand), FocusPill
│   ├── standup/                 # StandupDialog
│   ├── people/                  # PeoplePage, PersonPage, OneOnOneEditor
│   ├── decisions/               # DecisionsPage, DecisionEditor
│   ├── insights/                # WeeklyReviewPage (Recharts)
│   └── settings/                # perfil, workspaces, tags, atalhos, tema
├── shared/
│   ├── ui/                      # componentes shadcn (gerados pela CLI do shadcn)
│   ├── components/              # EmptyState, PriorityBadge, WorkspaceDot, Kbd
│   ├── hooks/                   # useHotkeys, useDebounce
│   └── lib/                     # cn(), datas, formatação de minutos
└── test/                        # setup do Vitest, handlers do MSW
```

### Regras do front

- **Estado do servidor é do TanStack Query.** Nada de copiar resposta da API para o Zustand.
- **Optimistic update** em concluir tarefa, reordenar e marcar foco: a UI responde em 0 ms e desfaz se falhar.
- **Tipos vêm do contrato.** Nenhuma interface de DTO é escrita à mão no front; o `npm run api:gen` regera.
- **Página carrega sob demanda** (`lazy`) — o bundle inicial leva só login e Hoje.
- **Componente burro, hook esperto:** a lógica fica em `useXxx`, o componente só renderiza.

# Parte 3 — Design

## Design system

### Princípios visuais

- **Densidade de ferramenta de dev:** muita informação, pouco ornamento — inspiração em editores e
  terminais, não em app de lista de compras.
- **Escuro por padrão**, claro disponível (e o sistema decide no primeiro acesso).
- **Cor tem significado:** cor de workspace identifica contexto; cor de prioridade, urgência. Nada de cor decorativa.
- **Movimento curto** (120–180 ms) e respeito a `prefers-reduced-motion`.

### Tokens de cor

| Token | Escuro | Claro | Uso |
|---|---|---|---|
| `--bg` | `#0B0D12` | `#FAFAFB` | fundo da aplicação |
| `--surface` | `#12151C` | `#FFFFFF` | cartões, sidebar, painéis |
| `--surface-2` | `#1A1E27` | `#F2F3F6` | hover, linha selecionada |
| `--border` | `#252A36` | `#E3E5EA` | divisórias |
| `--text` | `#E6E8EE` | `#14161C` | texto principal |
| `--muted` | `#8A93A6` | `#5E6676` | texto secundário, metadados |
| `--primary` | `#7C83FF` | `#4F46E5` | ação principal, foco, seleção |
| `--success` | `#34D399` | `#059669` | concluído, capacidade OK |
| `--warning` | `#FBBF24` | `#B45309` | capacidade 90–100%, cobrar hoje |
| `--danger` | `#F87171` | `#DC2626` | P1, capacidade estourada, zumbi |

**Prioridade:** P1 `--danger` · P2 `--warning` · P3 `--primary` · P4 `--muted`.
**Paleta de workspaces (8):** índigo `#6366F1`, esmeralda `#10B981`, âmbar `#F59E0B`, rosa `#EC4899`,
ciano `#06B6D4`, violeta `#8B5CF6`, laranja `#F97316`, ardósia `#64748B`. Todas com contraste AA no texto
do ponto/etiqueta nos dois temas.

### Tipografia, espaço e forma

| Item | Valor |
|---|---|
| Fonte de interface | **Inter** (variável), 14 px base |
| Fonte mono | **JetBrains Mono** — atalhos (`Kbd`), ids, tempos, código no markdown |
| Escala | 12 · 13 · 14 · 16 · 20 · 24 · 30 px |
| Grade | múltiplos de 4 px |
| Raio | 6 px (controles) · 10 px (cartões e diálogos) |
| Sombra | só em sobreposição (diálogo, menu, paleta) |
| Ícones | lucide-react, 16 px na lista, 20 px na navegação |

### Componentes-chave

| Componente | Descrição |
|---|---|
| `TaskRow` | checkbox · ponto do workspace · título · etiquetas · prioridade · estimativa · prazo; toda a linha é alvo de teclado |
| `CapacityBar` | barra horizontal: verde < 90%, âmbar 90–100%, vermelha > 100%; texto "4h10 de 6h" |
| `FocusPill` | cápsula fixa no topo com tarefa e contagem regressiva; clique pausa |
| `QuickAdd` | campo com pré-visualização dos tokens reconhecidos em "chips" coloridos enquanto digita |
| `CommandPalette` | `Ctrl+K`: navegar, criar, buscar tarefas, trocar workspace, iniciar foco |
| `TaskDetailSheet` | painel lateral direito; edita sem sair da lista |
| `EmptyState` | ilustração simples + frase útil + atalho ("Nada para hoje. `N` para capturar.") |
| `Kbd` | tecla de atalho estilizada |

## Mapa de telas e navegação

```
/login · /register
/                        → redireciona para /today
/today                   Hoje (tela principal)
/today/plan              Ritual de abertura (assistente em 3 passos)
/today/close             Ritual de fechamento
/inbox                   Capturas não triadas
/tasks                   Todas as tarefas: lista | quadro (kanban) · filtros salvos na URL
/tasks/:id               Detalhe (abre o painel lateral sobre a lista)
/people                  Pessoas do time
/people/:id              Pessoa: delegações, próxima 1:1, histórico
/people/:id/1on1/:oid    Editor de 1:1
/decisions               Registro de decisões · /decisions/:id
/review                  Revisão semanal
/settings/*              Perfil · Workspaces · Tags · Atalhos · Tema
```

**Sidebar:** Hoje · Inbox (contador) · Tarefas · Pessoas · Decisões · Revisão — e abaixo, os workspaces
como filtros com a cor de cada um. **Topo:** data, `FocusPill`, botão Standup, `Ctrl+K`.

## Wireframes

### Hoje

```
┌───────────────┬──────────────────────────────────────────────────────────────┬────────────────────────┐
│ ◆ Cockpit     │ Sexta, 31 de outubro · S44     [● 18:42 Revisar PR #412] [⌘K]│ Revisar PR #412        │
│               │──────────────────────────────────────────────────────────────│ ● Empresa   !P1  ~45m  │
│ ☀ Hoje        │ Capacidade ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░  4h10 de 6h    [Standup] [Fechar]│ prazo hoje             │
│ ✉ Inbox    3  │                                                              │────────────────────────│
│ ☰ Tarefas     │ 🎯 FOCO DO DIA                                         2 / 3 │ Descrição              │
│ ☺ Pessoas     │  ☐ ● Revisar PR #412 do login       #review   !P1   45m  ▶   │ Conferir o refresh     │
│ ⚖ Decisões    │  ☐ ● Proposta de cache da API       #arq      !P2   2h       │ token e os testes e2e. │
│ ▤ Revisão     │  ☑ ● Corrigir bug do relatório      #bug      !P1   1h  ✓    │                        │
│               │                                                              │ Checklist  2/4         │
│ CONTEXTOS     │ 📋 TAMBÉM HOJE                                               │  ☑ rodar local         │
│ ● Empresa  12 │  ☐ ● Responder RH sobre férias                     P4   10m  │  ☑ ler o diff          │
│ ● Freela    4 │  ☐ ● Ajustar layout do orçamento    (Freela)       P3   1h   │  ☐ testar expiração    │
│ ● Pessoal   6 │  ↻ ● Estudar filas no NestJS        zumbi ×3       P3   1h   │  ☐ aprovar             │
│               │                                                              │                        │
│               │ 🔔 COBRAR HOJE                                               │ Link  github.com/…/412 │
│               │  ☺ Ana    — POC de mensageria          delegada há 7 dias    │ Tempo apontado  25m    │
│               │  ☺ Bruno  — revisão do runbook         delegada há 3 dias    │                        │
│               │                                                              │ [Concluir] [Bloquear]  │
│               │ ⛔ BLOQUEADAS                                                │ [Delegar]  [⋯]         │
│ ⚙ Ajustes     │  ● Deploy da v2 — aguardando acesso ao cluster               │                        │
│ Você ▾        │                                     [ + N  capturar ]        │                        │
└───────────────┴──────────────────────────────────────────────────────────────┴────────────────────────┘
```

### Ritual de abertura (3 passos, ~5 min)

```
┌─────────────────────────────── Bom dia, pessoa ─────────────────────────────────┐
│  ① Revisar o que ficou    ② Escolher o dia    ③ Top 3                          │
│───────────────────────────────────────────────────────────────────────────────│
│  ② Escolher o dia                                    Capacidade  3h40 / 6h ▓▓░ │
│                                                                               │
│  SUGERIDAS                         │  NO MEU DIA (arraste para cá)             │
│  ↻ Estudar filas      zumbi ×3 ⚠   │   ● Revisar PR #412          45m          │
│     [Quebrar] [Delegar] [Descartar]│   ● Proposta de cache        2h           │
│  ⏰ Relatório mensal  vence hoje   │   ● Corrigir bug relatório   1h           │
│  ☺ 1:1 com Ana às 14h (preparar)  │                                           │
│  BACKLOG  (busca…)                 │                                           │
│   ● Atualizar dependências   30m   │                                           │
│                                                    [Voltar]   [Próximo →]     │
└───────────────────────────────────────────────────────────────────────────────┘
```

### Captura rápida (`N` ou `Ctrl+K` → "Nova tarefa")

```
┌──────────────────────────────────────────────────────────────────────┐
│ ＋ Revisar PR do login amanhã !p1 #review @empresa ~30m >ana          │
│──────────────────────────────────────────────────────────────────────│
│  "Revisar PR do login"                                               │
│  [📅 sáb, 1 nov] [!P1] [#review] [● Empresa] [~30m] [☺ delegar: Ana] │
│  ⚠ delegada sem data de cobrança — será amanhã + 3 dias              │
│                                         Enter salva · Esc cancela    │
└──────────────────────────────────────────────────────────────────────┘
```

### Pessoa e 1:1

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ☺ Ana Souza · Desenvolvedora pleno        1:1 a cada 14 dias · próxima: hoje 14h │
│──────────────────────────────────────────────────────────────────────────────────│
│  PAUTA DA PRÓXIMA 1:1                  │  DELEGAÇÕES (2)                         │
│  ↻ Plano de carreira (ficou da última) │   POC de mensageria   cobrar hoje  ⚠    │
│  • Feedback da apresentação de sexta   │   Testes do módulo X  cobrar 05/11      │
│  • Como está a carga de trabalho?      │                                         │
│  [+ tópico]                            │  HISTÓRICO                              │
│                                        │   17/10  humor ●●●●○  3 ações           │
│  [Iniciar 1:1]                         │   03/10  humor ●●●○○  1 ação            │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Standup gerado

```
┌──────────────── Standup · sexta 31/10 · [● Empresa ▾] ────────────────┐
│ **Ontem**                                                             │
│ - Corrigi o bug do relatório mensal                                   │
│ - Revisei 2 PRs (#408, #410)                                          │
│ **Hoje**                                                              │
│ - Revisar PR #412 do login                                            │
│ - Proposta de cache da API                                            │
│ **Impedimentos**                                                      │
│ - Deploy da v2: aguardando acesso ao cluster                          │
│                                        [Copiar markdown] [Copiar texto]│
└───────────────────────────────────────────────────────────────────────┘
```

### Revisão semanal

```
┌──────────────────────────────── Semana 44 · 27/10 – 31/10 ─────────────────────────────────┐
│  Planejado × feito  82%      Foco  14h20      Carry-over  6      Delegações vencidas  1     │
│────────────────────────────────────────────────────────────────────────────────────────────│
│  Feito por dia        ▇▇▅▇▃                │  Tempo por contexto                           │
│                       S T Q Q S            │   Empresa ████████████████  11h               │
│                                            │   Freela  ████              2h40              │
│  Zumbis: Estudar filas (×3)                │   Pessoal █                 40m               │
│  [Quebrar] [Descartar]                     │                                               │
│  Nota da semana: _____________________________________________________________________     │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Atalhos e acessibilidade

| Atalho | Ação | | Atalho | Ação |
|---|---|---|---|---|
| `Ctrl+K` | paleta de comandos | | `J` / `K` | desce / sobe na lista |
| `N` | nova tarefa (captura rápida) | | `X` ou `Espaço` | concluir |
| `G` `H` | ir para Hoje | | `F` | iniciar foco na tarefa selecionada |
| `G` `I` | ir para Inbox | | `T` | mandar para hoje / tirar de hoje |
| `G` `P` | ir para Pessoas | | `1`..`4` | prioridade |
| `S` | abrir standup | | `Enter` | abrir detalhe |
| `?` | mostrar todos os atalhos | | `Esc` | fechar painel / diálogo |

**Acessibilidade (meta WCAG 2.2 AA):** contraste AA garantido pelos tokens; tudo navegável por teclado com
foco visível; componentes Radix (papéis ARIA corretos); `aria-live` para o timer e para toasts; o
arrastar-e-soltar tem alternativa por teclado (dnd-kit tem sensor de teclado); nada depende só de cor
(prioridade tem texto `P1`, zumbi tem ícone).

# Parte 4 — Qualidade e operação

## Estratégia de testes

| Camada | Ferramenta | O que cobre | Meta |
|---|---|---|---|
| Unitário API | Vitest + `vitest-mock-extended` | services com Prisma mockado; parser da captura rápida; máquina de status; cálculo de capacidade e de dia útil | 90% nos arquivos de regra |
| Integração/e2e API | Vitest + supertest + Postgres real | cada rota feliz, validação 400, 401 sem token, **404 em recurso alheio** | toda rota |
| Unitário web | Vitest + Testing Library | hooks e componentes com lógica (QuickAdd, CapacityBar, FocusTimer) | componentes com regra |
| Integração web | Vitest + MSW | páginas com API simulada pelo contrato | fluxos principais |
| Smoke e2e | Playwright | cadastro → captura → plano do dia → concluir → standup | 1 jornada, no CI |

> [!OK] Testes que provam regra, não linha
> O parser da captura rápida e a máquina de status são funções **puras** — escreva-os com TDD e tabela
> de casos (`it.each`). São a melhor vitrine técnica do repositório.

## Observabilidade

- **Logs** JSON (pino) com `requestId` propagado no cabeçalho `x-request-id` e devolvido no erro.
- **Health** `/health`: banco (`PrismaHealthIndicator`) e memória.
- **Métricas de produto** sem telemetria externa: o próprio módulo Insights.
- v2: OpenTelemetry → um coletor gratuito (Grafana Cloud) se quiser exercitar tracing.

## Ambientes, CI/CD e deploy

| Ambiente | API | Web | Banco |
|---|---|---|---|
| local | `nest start --watch` (porta 3000) | `vite` (porta 5173, *proxy* `/api` → 3000) | ver D-02 |
| CI | build + testes no GitHub Actions | build | Postgres 17 como *service container* |
| produção | Render ou Railway (contêiner Node) | Vercel | Neon (Postgres serverless) |

**Pipeline (a cada PR):** instalar → lint → typecheck → testes unitários → migrations no Postgres do CI →
e2e da API → build da API e do web → checagem de que o `openapi.json` commitado está atualizado →
smoke Playwright (na `main`). Merge só com tudo verde.

> [!ATENCAO] Cookie de refresh entre domínios
> Front em `*.vercel.app` e API em `*.onrender.com` são *sites* diferentes: o cookie `SameSite=Strict`
> não vai. Solução desenhada: o Vercel faz *rewrite* de `/api/*` para a API — para o navegador tudo é o
> mesmo site. Em domínio próprio, `app.` e `api.` do mesmo domínio também resolvem.

## Decisões (aprovadas)

> [!OK] Aprovadas em 31/10/2026
> As nove decisões abaixo foram aprovadas **como recomendadas**. A coluna "Alternativa" fica como
> registro do que foi considerado e descartado. Mudar uma delas depois exige um ADR novo.

| ID | Decisão | Aprovado | Alternativa descartada |
|---|---|---|---|
| D-01 | Nome do produto e do repositório | **Cockpit** (`cockpit`) | outro nome de sua escolha |
| D-02 | Postgres no desenvolvimento | **Neon** (nuvem, grátis, zero instalação) com um *branch* de banco para dev e outro para teste | instalar PostgreSQL nativo no Windows (instalação nova: precisa do seu OK) · Docker (não instalado) |
| D-03 | ORM | **Prisma** | TypeORM (mais "clássico" na doc do Nest, mais verboso) |
| D-04 | Monorepo | **npm workspaces** (zero ferramenta nova) | pnpm + Turborepo (mais rápido, mais peças) |
| D-05 | Contrato entre front e API | **OpenAPI → orval** (tipos e hooks gerados) | pacote `contracts` compartilhado com Zod |
| D-06 | Roteador do front | **React Router** (7 no desenho; o npm instala o 8, mesma API) | TanStack Router (tipagem melhor, curva maior) |
| D-07 | Deploy | **Vercel (web) + Render (API) + Neon (banco)**, com rewrite de `/api` | Fly.io para a API; tudo num VPS |
| D-08 | Repositório | **público** no GitHub **pessoal**, licença MIT, contas pessoais (não o e-mail da empresa) | privado até o MVP, público depois |
| D-09 | Uso no trabalho da empresa | **títulos genéricos** para assuntos da empresa ("Revisar PR do login"), nada de dado de cliente, sistema interno ou informação confidencial na instância pública | instância só local quando usar no trabalho |

> [!CRITICO] D-09 é sobre a sua segurança, não sobre o código
> O app é seu e universal, mas o **conteúdo** que você digitar sobre o trabalho na empresa passa a morar
> num banco na nuvem pessoal. Confira a política da empresa antes. O código do Cockpit não leva nada da
> empresa — e assim deve continuar.

### ADRs a registrar no repositório (`docs/adr/`)

| ADR | Título |
|---|---|
| 0001 | Registrar decisões de arquitetura (formato Michael Nygard) |
| 0002 | Monólito modular em NestJS |
| 0003 | Prisma + PostgreSQL |
| 0004 | OpenAPI como contrato e cliente gerado com orval |
| 0005 | JWT em memória + refresh rotativo em cookie httpOnly |
| 0006 | Datas de calendário como `date` no fuso do usuário |
| 0007 | Índice fracionário para ordenação |

## Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Escopo crescer antes do MVP | nunca terminar | MVP fechado nesta lista; tudo o mais vai ao backlog v2 |
| Fuso horário e "dia" errados | carry-over no dia errado | RN-12, testes com fuso fixo, job por hora |
| Curva do Nest (DI, módulos) | travar no começo | guia em sprints curtas, CLI para gerar, um conceito novo por sprint |
| Plano gratuito do Render dormir | primeira requisição lenta | aceitável para portfólio; `/health` + aviso de "acordando" no front |
| Mudança de versão das libs (Prisma, Router) | comando do guia não bate | conferir a doc oficial da versão instalada; fixar versões no `package.json` |

## Roadmap

| Sprint | Entrega | Conceitos novos que você aprende |
|---:|---|---|
| 0 | Repositório, monorepo, lint, commits, CI | workspaces, Husky, Actions |
| 1 | Base da API: config, Prisma, Swagger, logs, health, erros | módulos, providers, pipes, filters |
| 2 | Users + Auth | guards, decorators, JWT, testes e2e |
| 3 | Workspaces + Tasks + Tags + captura rápida | `nest g resource`, DTOs, TDD, migrations |
| 4 | Front: casca, login, cliente gerado | Vite, Router, Query, shadcn, orval |
| 5 | Hoje + Plano do dia + carry-over | eventos, schedule, optimistic update, dnd-kit |
| 6 | Foco + Standup | Zustand, estado de tempo, regras de dia útil |
| 7 | Pessoas + delegações + 1:1 | relacionamentos, transações |
| 8 | Decisões + paleta de comandos + atalhos | cmdk, acessibilidade por teclado |
| 9 | Revisão semanal | consultas de agregação, Recharts |
| 10 | Deploy, Playwright, README de portfólio | produção de verdade |

O passo a passo de cada sprint, no rito de um dev NestJS, está no **documento 2 — Guia de implementação**.
