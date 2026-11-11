---
titulo: Guia da Jornada — NestJS, React e TypeScript
subtitulo: O documento único do curso: método, rota, o Dojo, a migração Forms → web e o Cockpit sprint a sprint
rotulo: Guia do curso
autor: Davi Kelve
badges: v2.0 · novembro de 2026, Código aberto · MIT:ok
kpis: Lições={{@json:../placar-conteudo.json#licoes}}; Exercícios executados pelo validador={{@json:../placar-conteudo.json#executados}}; Cartões de revisão={{@json:../placar-conteudo.json#cartoes}}; Perguntas de corredor={{@json:../placar-conteudo.json#corredor}}; Falhas do validador={{@json:../placar-conteudo.json#falhas}}:ok
---

# Parte 1 — Comece aqui

## Leia só esta parte hoje

Este é o **único documento** do curso. Você não precisa ler tudo: precisa ler a **Parte 1** (10 minutos)
e abrir o Dojo. O resto é consulta, e o próprio Dojo leva você à seção certa quando for a hora.

| Se você quer... | Vá para |
|---|---|
| Começar hoje à noite | "O seu primeiro dia", logo abaixo |
| Entender por que o método funciona | Parte 2 |
| Saber o que cada tela do Dojo faz | Parte 3 |
| Ver a rota inteira e as datas | Parte 4 |
| Ver tudo o que você vai dominar | Parte 5 |
| Responder "dá para migrar esse módulo?" | Parte 6 |
| Saber como são as provas | Parte 7 |
| Saber o que pedir a um mentor | Parte 8 |
| Resolver um problema | Parte 9 |
| Entender uma palavra | Parte 10 (glossário) |
| Construir o Cockpit | Anexo A (o Dojo abre na seção certa) |

## Para quem é, e como nasceu

Este curso é para quem **já programa** e precisa chegar a nível pleno/sênior em **NestJS, React e
TypeScript**, estudando sozinho, à noite, depois do trabalho. Ele foi escrito para quem vem de **Oracle
PL/SQL e Oracle Forms**: toda lição começa de algo que esse público já domina (package, trigger, bloco,
transação) e diz onde a analogia quebra. Quem vem de outra origem aproveita o conteúdo do mesmo jeito; só
as "pontes" falam menos com você.

Ele nasceu de um plano que **falhou**. A primeira versão pedia 2 horas por noite, todas as noites, e não
tinha versão para o dia ruim: durou três dias. O método estava certo e a dose, errada. A versão atual
corrige a dose:

| Antes | Agora |
|---|---|
| Vários documentos, e você decidia o que fazer a cada noite | **1 documento** e o **Dojo**, que diz o que fazer agora |
| 2 horas ou nada | **3 tamanhos de sessão**: 15, 60 ou 120 minutos. Você escolhe pela energia do dia |
| Cartões, diário e placar em ferramentas separadas | Tudo dentro do Dojo: revisão, diário, progresso |
| Ler documentação e resumir | Lições de 8 minutos com exercício que **roda de verdade**: você prevê, o Node responde |
| Calendário com data para cada semana (atrasou, deu culpa) | **Rota por posição**: sempre existe "a próxima". O calendário vira projeção |
| Migração de legado aparecia só como tabela de analogias | **Trilha própria**, desde o primeiro dia, com treino de resposta |
| Um dia perdido quebrava a corrente | **Escudo**: um dia perdido é coberto. A regra é nunca dois seguidos |

## A promessa, com honestidade

"Dominar para ontem" não existe. Vale separar o que é possível do que seria mentira.

| Quando (no ritmo padrão) | O que você consegue fazer | Do que depende |
|---|---|---|
| **Fim do 1º mês** | Ler e escrever TypeScript sem brigar com o compilador; explicar o assíncrono do Node; montar uma API Nest pequena do zero; responder "dá para migrar?" com veredito, risco e primeiro passo | Fase 1 feita (22 lições), Sprint 1 do Cockpit fechada, Chefão 0 |
| **Fim do 2º mês** | Construir e defender uma API com autenticação, banco e testes; revisar um PR de back-end | Fase 2 e Chefão 1 |
| **Fim do 3º mês** | Entregar tela React ligada à API; trabalhar como **pleno** na stack, consultando documentação | Fase 3 e Chefão 2 |
| **Entre o 5º e o 6º mês** | Pleno sólido de ponta a ponta, com produção, arquitetura do dia a dia e review | Fase 4 e Chefão 3 |
| **Depois** | Postura de **sênior**: decidir arquitetura, escala e migração, e defender diante de uma banca | Fase 5, Chefão 4 e tempo em projeto real |

Senioridade completa pede tempo com sistema em produção, e nenhum curso entrega isso em semanas. Mas
quem vem de anos de PL/SQL e Forms **já tem** metade do que faz um sênior: banco, transação, regra de
negócio e depuração. O que falta é a mecânica nova, e ela é finita. Os prazos acima supõem cerca de 8
lições por semana; a aba Progresso do Dojo recalcula a projeção com o seu ritmo real.

## As quatro peças

| Peça | O que é | Para que serve |
|---|---|---|
| **Dojo** | O curso, num programa local que abre no navegador | Diz a missão do dia, ensina, exercita, revisa e mede |
| **Cockpit** | O app que **você** constrói (NestJS + React), num repositório seu | Onde você constrói de verdade, sprint a sprint. Vira o seu portfólio |
| **Mentor** | Uma pessoa experiente ou uma IA (Parte 8) | Revisa sprint e chefão, tira dúvida, planta defeito, faz banca. Não escreve o Cockpit por você |
| **Este guia** | O documento único | Consulta. O Dojo abre aqui na seção certa |

## O seu primeiro dia

Reserve 30 minutos. Você precisa do **Node.js 24 ou mais novo** e do Git.

1. Na pasta do Dojo, rode `npm install` (uma vez) e depois `npm start`. No Windows, dois cliques em
   `Estudar.cmd` fazem o mesmo. Um terminal fica aberto (deixe aberto) e o navegador abre o Dojo.
2. Responda as perguntas de **boas-vindas**. "Por que você está fazendo isso" e "depois de quê você abre o
   Dojo" são as que seguram o hábito. Leve um minuto nelas.
3. Na tela **Hoje**, escolha a energia. No primeiro dia, escolha **Mínimo**.
4. Clique na lição que aparece em **Aprender**. Leia, e em cada exercício **escreva a sua previsão antes
   de rodar**. Errar a previsão é o objetivo: é aí que a memória fixa.
5. Clique em **Concluir a lição**. A ofensiva começa em 1.
6. Em **Fechar**, escreva uma linha do que aprendeu e **o primeiro passo de amanhã**.
7. Opcional (Windows): botão direito em `Estudar.cmd`, **Enviar para → Área de trabalho (criar atalho)**.
   Amanhã o Dojo fica a dois cliques.

> [!OK] Amanhã
> O Dojo mostra o primeiro passo que você mesmo escreveu e a revisão de 5 minutos dos cartões de hoje.
> Você não decide nada: só começa.

## O dia típico

| Passo | Tempo | O que acontece |
|---|---:|---|
| **Aquecer** | 5 min | Os cartões que vencem hoje. Responda de cabeça antes de virar |
| **Aprender** | 10 a 20 min | Uma lição (duas na Imersão): ponte, explicação, exercícios que rodam |
| **Construir** | 35 ou 75 min | A missão do Cockpit, com cronômetro. Não existe no modo Mínimo |
| **Fechar** | 2 min | Duas linhas de diário e o primeiro passo de amanhã |

# Parte 2 — O método

## Por que este desenho vence o cansaço

O problema a resolver não é falta de conteúdo. É **sentar e começar** depois de um dia de trabalho. Cada
mecanismo do Dojo ataca um pedaço disso, e cada um tem pesquisa por trás.

| Problema real | Mecanismo no Dojo | O que a pesquisa diz |
|---|---|---|
| "Hoje não tenho 2 horas" | **Sessão mínima** de 15 minutos que conta como dia cumprido | Hábito se forma por repetição no mesmo contexto, não por duração. No estudo de Lally e colegas (2010), a automaticidade levou em média 66 dias, e falhar um dia isolado não atrapalhou |
| "Não sei por onde começar hoje" | **Primeiro passo de amanhã**, escrito na véspera, no topo da tela | Decidir cansa. Deixar a próxima ação definida tira a decisão do momento de menor energia |
| "Vou começar... depois" | **Gatilho**: "depois de (algo que já acontece), eu abro o Dojo" | Intenções de implementação, no formato "se X, então Y", aumentam muito a chance de agir (Gollwitzer, 1999) |
| "Perdi um dia, perdi tudo" | **Escudo** e a regra **nunca dois dias seguidos** | O que derruba um hábito é o segundo dia perdido, não o primeiro |
| "Não sinto que estou avançando" | **Ofensiva, XP, faixa, barra da fase** e o mapa de 16 semanas | O progresso visível em trabalho com sentido é o maior motivador do dia a dia (Amabile e Kramer, *The Progress Principle*) |
| "Leio e esqueço" | **Revisão espaçada** automática: o cartão volta quando você estaria esquecendo | Espaçar a prática vence concentrar, de forma consistente (Cepeda e colegas, 2006) |
| "Reli e achei que sabia" | **Prever antes de rodar**; cartão respondido de cabeça | Tirar da memória fixa mais do que reler (Roediger e Karpicke, 2006). Tentar e errar antes de ver a resposta melhora a retenção |
| "Entendi, mas não sei aplicar" | **Construir** o Cockpit e os **chefões** sem IA | Prática deliberada: no limite, com meta clara e retorno rápido |
| "É coisa demais, tudo misturado" | A rota **intercala** as trilhas de propósito | Intercalar assuntos ensina a escolher a ferramenta certa, o que estudar em blocos não ensina |
| "Isso não tem a ver com o meu trabalho" | A **ponte** em toda lição e a trilha de **migração** desde o dia 1 | Aprende-se mais rápido ligando o novo ao que já se domina, desde que se marque onde a analogia quebra |

> [!ATENCAO] O que dá sensação de aprender e não ensina
> Reler, grifar, assistir vídeo em velocidade dobrada e copiar código "para ver funcionando". O material
> fica familiar, e familiaridade não é domínio. A régua é uma só: **consigo fazer de novo amanhã, sem
> olhar?**

## As três energias

Antes de começar, o Dojo pergunta como está a sua energia. Não existe resposta errada.

| Energia | Tempo | O que entra | Quando usar |
|---|---:|---|---|
| **Mínimo** | 15 min | Até 8 cartões e 1 lição | Dia pesado, dor de cabeça, chegou tarde. **Mantém a ofensiva** |
| **Normal** | 60 min | Até 15 cartões, 1 lição e 35 min de Cockpit | A noite comum |
| **Imersão** | 120 min | Até 25 cartões, 2 lições e 75 min de Cockpit | Sábado, feriado, noite boa |

Uma semana boa tem a cara de: três dias Normal, dois dias Mínimo, um dia de Imersão e um dia de descanso.

## A ofensiva e o escudo

- **Ofensiva** é o número de dias seguidos em que você fez pelo menos a sessão mínima: 1 lição, **ou** 15
  minutos construindo, **ou** 8 cartões revisados.
- A cada **7 dias seguidos** você ganha um **escudo** (no máximo 2 guardados).
- Se você perder **um** dia e tiver escudo, ele é gasto sozinho e a ofensiva continua.
- Se perder **dois** dias seguidos, a ofensiva volta a zero. Nada mais se perde: lições feitas continuam
  feitas, cartões continuam agendados. O Dojo recebe você com a sessão mínima, sem cobrança.
- O **dia de descanso** da semana é coberto pelo escudo. É assim de propósito: descansar faz parte.

## As regras do bloco Construir

1. **Digite, não cole.** O código do Anexo A é exemplo para estudar. Digitar obriga a ler cada símbolo.
2. **Preveja antes de rodar.** Antes de todo `npm run` ou de recarregar o navegador, diga o que vai
   acontecer. Errou? Vira cartão.
3. **Nunca cale o compilador.** Nada de classe vazia, `any`, `!` ou `// @ts-ignore` para o erro sumir.
4. **Pare no meio com o próximo passo anotado.** Terminar a sessão sabendo exatamente a próxima ação torna
   o começo de amanhã fácil.

## A regra dos 25 minutos

1. **0 a 25 min:** sozinho. Leia a mensagem de erro inteira, reproduza, escreva uma hipótese, teste.
2. **25 min:** escreva a pergunta como se fosse para outra pessoa (o que eu queria, o que acontece, o que
   já tentei, minha hipótese). Metade das vezes a resposta aparece enquanto você escreve.
3. **40 min:** pergunte ao mentor **pedindo dica, não código**.
4. **60 min:** peça a explicação completa, crie o cartão, apague o trecho e escreva de novo sem olhar.

# Parte 3 — O Dojo, tela por tela

## Abrir e fechar

- **Abrir:** `npm start` na pasta do Dojo (no Windows, dois cliques em `Estudar.cmd`; no Linux e no macOS,
  `./estudar.sh`). O terminal que abre é o servidor do Dojo: deixe aberto enquanto estuda.
- **Fechar:** feche o terminal (ou Ctrl+C). O progresso já está salvo.
- **Onde fica o progresso:** na pasta `meu-progresso/`, dentro do Dojo: `dojo-estado.json`, com uma cópia
  de segurança por dia ao lado, e o diário em texto, `dojo-diario.md`. Essa pasta está no `.gitignore`: o
  seu progresso não vai para o GitHub.
- **Requisito:** Node.js 24 ou mais novo. A única dependência é o TypeScript, instalado pelo `npm install`.
  O Dojo roda só na sua máquina e não usa internet (só os links de "fonte oficial" abrem sites).

## Hoje

A tela inicial. Mostra, de cima para baixo: o primeiro passo que você deixou combinado, o seletor de
energia e os passos da sessão (Aquecer, Aprender, Construir, Fechar). O passo da vez fica em laranja; o
que já foi feito ganha um ✓. À direita: a semana (🔥 dia cumprido, 🛡️ dia coberto por escudo), a fase
atual com a barra de progresso, o seu "por quê" e os commits que você fez hoje no Cockpit.

No passo **Construir**, o botão **Iniciar foco** liga um cronômetro. **Parar e registrar** soma os
minutos ao dia e à missão. **Concluí esta missão** só deve ser clicado quando o "pronto quando" for
verdade.

## Lição

Toda lição tem a mesma forma:

| Bloco | O que é |
|---|---|
| **A ponte** | O conceito ligado ao que você já sabe de PL/SQL, Forms ou banco, e onde a analogia quebra |
| **Texto** | Uma ideia central, o mecanismo, um exemplo curto e a armadilha clássica |
| **Na prática** | Onde isso aparece no trabalho ou no Cockpit |
| **Agora você** | De 3 a 6 exercícios |
| **Fonte oficial** | O link para ir fundo, se quiser |

Os cinco tipos de exercício:

| Tipo | O que você faz | Como é conferido |
|---|---|---|
| **Preveja a saída** | Escreve o que o código vai imprimir e só então clica em Rodar | O Dojo **executa** o código no Node e mostra a sua previsão ao lado da saída real |
| **Compila ou não compila?** | Decide, e se achar que não, clica na linha do erro | O Dojo passa o código pelo **compilador TypeScript** em modo estrito e mostra o erro real |
| **Pergunta** | Escolhe uma alternativa | A explicação diz por que a certa é certa e por que a tentadora é errada |
| **Pergunta de corredor** | Responde em até um minuto, por escrito ou em voz alta | Você compara com os pontos de uma resposta de sênior e marca os que cobriu |
| **Mãos na massa** | Uma tarefa de 5 a 30 minutos com critério de pronto | Você marca "Fiz" ou guarda para um dia de Imersão (fica na Oficina, aba Progresso) |

Errou um exercício? Aparece o botão **Transformar este erro em cartão**. Use: os seus erros são os melhores
cartões. Ao concluir a lição, os cartões dela entram na revisão do dia seguinte.

## Trilhas

O mapa inteiro: as 15 trilhas com o progresso de cada uma. Qualquer lição pode ser aberta a qualquer
momento. A rota do dia é uma recomendação de ordem, não uma trava. Cada lição tem um nível: **Fundamento**,
**Pleno** ou **Sênior**.

## Revisão

Os cartões que vencem hoje. Leia a pergunta, **responda de cabeça**, vire (barra de espaço) e dê a nota
(teclas 1 a 4):

| Nota | Quando | O que acontece |
|---|---|---|
| 1 · Errei | Não lembrei | Volta ainda hoje |
| 2 · Difícil | Lembrei com esforço | Volta em breve |
| 3 · Bom | Lembrei | Intervalo cresce (1 dia, 3 dias, depois multiplica) |
| 4 · Fácil | Na ponta da língua | Intervalo cresce mais |

Seja honesto na nota: o intervalo depende dela. No fim da página você cria cartões seus.

## Corredor

O banco de todas as perguntas de corredor do curso ("Fulano, dá para...?", com o seu nome). **Sortear uma pergunta** é um
ótimo uso de 5 minutos livres. A resposta de um minuto tem sempre a mesma forma: **veredito, custo, risco
e primeiro passo** (Parte 6).

## Chefões

As cinco fases, cada uma com o seu chefão (a prova) e os desafios de depuração. Detalhes na Parte 7.

## Laboratório

Um editor para testar TypeScript na hora: **Rodar** executa no Node, **Checar tipos** passa pelo
compilador estrito. Teve uma dúvida no meio da lição ("e se eu trocar isso?"), teste em vez de ficar na
dúvida. Ctrl+Enter roda.

## Progresso

Os números (lições, dias, ofensiva, horas construindo, cartões firmes), o mapa de 16 semanas, a projeção
de término da fase no seu ritmo real, o progresso por trilha, a Oficina (práticas guardadas) e o diário.

# Parte 4 — A rota

## As cinco fases

A rota é uma fila de lições já ordenada e uma fila de missões do Cockpit. Você nunca escolhe "o que
estudar hoje": é sempre a próxima. As duas filas andam em paralelo, e tudo bem se uma adiantar.

| Fase | Lições | No Cockpit | Chefão | No fim, você... |
|---|---:|---|---|---|
| **1 — Base** | 22 | Sprint 1 | Chefão 0 (75 min) | Lê e escreve TypeScript, entende o assíncrono, monta o esqueleto de uma API e responde sobre migração com método |
| **2 — API de verdade** | 31 | Sprints 2 e 3 | Chefão 1 (2 h) | Constrói API com autenticação, banco e testes, e defende cada decisão |
| **3 — React** | 33 | Sprints 4 a 6 | Chefão 2 (2 h) | Entrega tela ligada à API: estado, dados do servidor, formulário |
| **4 — Pleno** | 44 | Sprints 7 a 10 | Chefão 3 (3 h) | Fecha o nível pleno: produção, arquitetura do dia a dia, review |
| **5 — Sênior** | 38 | Módulos A a D | Chefão 4 (banca) | Decide e defende arquitetura, escala e migração |

A ordem dentro de cada fase mistura as trilhas de propósito. Na Fase 1, por exemplo, a segunda lição já é
"Dá para migrar? As 7 perguntas de viabilidade": você leva algo útil para o trabalho na primeira semana.

## O marco do primeiro mês

Um passo grande e mensurável para as primeiras 3 a 4 semanas:

| Meta | Como saber que cumpriu |
|---|---|
| **Fase 1 completa** | 22 de 22 lições na aba Chefões |
| **Sprints 0 e 1 do Cockpit fechadas** | PR com CI verde na `main` |
| **Chefão 0 vencido** | Num fim de semana, com 75 minutos livres |
| **Ofensiva viva** | 14 dias ou mais, com no máximo 2 escudos usados |

A conta fecha assim: 1 lição nos dias de semana e 2 nos sábados. Se a semana apertar, o **mínimo
aceitável** é 16 lições e a Sprint 0 fechada, com o Chefão 0 na semana seguinte. Menos que isso pede
ajustar a dose (mais dias de Mínimo), não mais esforço.

## Ritmos e projeção

| Ritmo | Lições por semana | As 168 lições levam |
|---|---:|---|
| Mínimo todos os dias | 6 | cerca de 28 semanas |
| **Padrão** (3 Normal, 2 Mínimo, 1 Imersão) | 8 | cerca de 21 semanas |
| Imersão frequente | 12 | cerca de 14 semanas |

As lições das fases 1 a 3 (86 lições, o núcleo) levam cerca de 11 semanas no ritmo padrão. É aí que você
já trabalha na stack. A aba Progresso mostra a projeção com o ritmo dos seus últimos 14 dias.

# Parte 5 — O mapa do que você vai dominar

## As 15 trilhas

| Trilha | Lições | O que cobre | Por que o mercado cobra |
|---|---:|---|---|
| 🟦 **TypeScript** | 14 | Inferência, uniões, estreitamento, genéricos, utilitários, `tsconfig`, módulos, ler erro do compilador | É a linguagem das duas pontas: API e tela |
| 🟨 **JavaScript e Node** | 11 | Referência e imutabilidade, closures, `this`, event loop, Promises, `async/await`, concorrência, processo, npm | Todo bug estranho de TypeScript é um bug de JavaScript |
| 🌐 **HTTP e APIs** | 10 | Requisição sem estado, métodos, status, cabeçalhos, cookies, CORS, REST, RFC 9457, OpenAPI, evoluir sem quebrar, REST × GraphQL × gRPC | É o contrato entre tela e servidor |
| 🟥 **NestJS** | 18 | Módulos, injeção de dependência, DTO, pipes, guards, interceptors, filtros, ciclo da requisição, config, escopos, módulos dinâmicos, eventos, filas, tempo real, cache, testes | O framework de back-end da stack |
| 🗄️ **Dados** | 13 | Postgres para quem sabe Oracle, ORM, migrations, relações, transação, concorrência, N+1, índices, SQL puro, pool, TypeORM e outros, **Oracle a partir do Node**, Redis | Onde você joga em casa, e onde mora a maior parte dos bugs graves |
| 🔐 **Segurança** | 11 | OWASP, senhas, sessão × JWT, refresh rotativo, XSS e CSRF, autorização, injeção, segredos e LGPD, cadeia de dependências, OAuth/OIDC/SSO, cabeçalhos e rate limit | O que um sênior não deixa passar num review |
| 🧪 **Testes** | 9 | Para que serve, unitário, dublês, TDD, e2e de API, componente, tempo falso, Playwright, teste que reprova o código errado | Teste automatizado é rotina, não fase |
| ⚛️ **React** | 18 | Declarativo, componentes, estado, eventos, listas, renderização, onde pôr o estado, reducer, ref, efeitos, closures, hooks próprios, context, formulários, Suspense, performance, React 19, Next.js | A biblioteca de tela da stack |
| 🔄 **Dados no front** | 8 | Estado do servidor × da tela, TanStack Query, chaves, mutação otimista, roteamento, Zustand, cliente HTTP gerado, Vite | Onde a maioria das telas erra |
| 🎨 **UI e acessibilidade** | 6 | HTML semântico, CSS essencial, Tailwind, shadcn/Radix, teclado e foco, responsivo e estados de tela | Usuário de Forms vive no teclado: acessibilidade é requisito de migração |
| 🧰 **Ferramentas** | 7 | Git para quem vem do CVS, PR, git avançado, lint e formatação, CI, depuração, monorepo | O fluxo de trabalho de qualquer time |
| 🚀 **Produção** | 9 | 12 fatores, Docker, compose, deploy sem derrubar, observabilidade, health, carga, estratégias de release, nuvem e Kubernetes | "Como você sabe que está funcionando lá?" |
| 🏛️ **Arquitetura** | 12 | Monólito modular, camadas, SOLID, hexagonal, DDD tático, CQRS, microsserviços, mensageria, cache, BFF e gateway, system design, ADR | O que separa pleno de sênior: decidir com critério |
| 🔁 **Migração Forms → web** | 14 | Mapa Forms → web, viabilidade, inventário, onde fica a regra, estrangulamento, transação e lock, blocos e triggers em React, LOV, identidade, relatórios, estimativa, "dá para implementar X?", desempenho | A pergunta que vão fazer a você |
| 🧭 **Tech lead** | 8 | Code review, estimar, postmortem, IA no fluxo, comunicar decisão, ler repositório, entrevista, dívida técnica | Sênior é quem faz o time entregar, no fluxo moderno |

## O que o mercado pede em 2026/2027 e onde está

| Pedido comum em vaga pleno/sênior de Node e React | Onde está no curso |
|---|---|
| TypeScript estrito, Node, NestJS | Trilhas TypeScript, JavaScript e Node, NestJS |
| React com hooks, estado de servidor, formulários | Trilhas React e Dados no front |
| Banco relacional, ORM (Prisma ou TypeORM), SQL | Trilha Dados |
| REST, OpenAPI, noção de GraphQL e mensageria | Trilhas HTTP e APIs, Arquitetura, NestJS (filas) |
| Testes automatizados em vários níveis | Trilha Testes e toda sprint do Cockpit |
| Autenticação, OAuth/OIDC, OWASP | Trilha Segurança |
| Docker, CI/CD, nuvem, observabilidade | Trilhas Produção e Ferramentas |
| Arquitetura limpa, DDD, microsserviços (noção) | Trilha Arquitetura |
| Git, code review, trabalho com IA | Trilhas Ferramentas e Tech lead |
| Inglês técnico de leitura | Os termos ficam em inglês nas lições, com tradução na primeira vez |

## O que ficou de fora de propósito

| Assunto | Por quê | Quando olhar |
|---|---|---|
| Construir microsserviços de verdade | Monólito modular bem feito é o que se espera primeiro; o curso ensina a decidir | Depois da Fase 5, se o trabalho pedir |
| Aplicativo móvel (React Native) | Outra plataforma | Só se virar demanda |
| Kubernetes operando cluster | É trabalho da equipe de plataforma; o curso dá o vocabulário | Se você for para essa área |
| Angular e Vue | O curso escolhe uma stack e vai fundo nela | Só se o seu trabalho usar |

# Parte 6 — Migração Forms → web: o roteiro de resposta

## A forma de toda resposta

Quando perguntarem "dá para migrar?" ou "dá para implementar?", a resposta de sênior tem quatro partes,
nesta ordem:

1. **Veredito:** "dá", "dá com ressalvas" ou "agora não".
2. **Custo:** uma faixa com as premissas ("entre 3 e 5 semanas, se a regra já estiver em package").
3. **Risco principal:** um só, o maior, e o que o reduz.
4. **Primeiro passo:** algo pequeno e com data que diminui a incerteza.

Sem dado para o custo e o risco, a resposta honesta é veredito mais primeiro passo: **"Tecnicamente dá.
Para dizer o custo, preciso de dois dias de inventário."**

## As 7 perguntas de viabilidade de uma migração

| # | Pergunta | O que ela revela |
|---|---|---|
| 1 | O que a tela faz de verdade? | O tamanho: blocos, itens, triggers, *program units*, LOVs, relatórios |
| 2 | Onde mora a regra? | Em package no banco (reaproveita quase de graça) ou presa em trigger de tela (precisa extrair e testar) |
| 3 | Com quem ela conversa? | Outras telas, variáveis globais, `.pll`, jobs, integrações |
| 4 | Como trata transação e concorrência? | Lock enquanto edita e commit de vários blocos mudam de desenho na web |
| 5 | Quem usa e como se identifica? | Usuário de banco e auditoria por `USER` viram token e usuário de serviço |
| 6 | Qual o volume e o jeito de uso? | Digitação por teclado e blocos grandes pedem cuidado |
| 7 | Como conviver e como voltar atrás? | As duas telas rodam juntas sobre o mesmo banco por um tempo |

## Os 5 passos para "dá para implementar X no app moderno?"

1. **Reformule** o pedido em comportamento que se observa na tela.
2. **Classifique:** é de tela, de API, de banco, de integração ou de infraestrutura?
3. **Ache o mecanismo padrão** da stack para aquilo (quase sempre existe).
4. **Aponte a restrição:** segurança, desempenho, navegador ou o legado.
5. **Responda** na forma de quatro partes.

## O mapa resumido

| No Forms | Na stack nova | Onde a analogia quebra |
|---|---|---|
| Tela (`.fmb`) | Rota e componente de página | Uma página é feita de muitos componentes pequenos |
| Bloco de dados | Recurso REST na API e uma *query* na tela | O dado na tela é cópia em cache; a fonte é o servidor |
| Bloco multi-registro | Lista ou tabela editável | Cada linha precisa de uma chave estável |
| `WHEN-VALIDATE-ITEM` | Validação no formulário **e** regra na API | A do front é conforto; a do back é a de verdade |
| `POST-QUERY` | Campo calculado na API ou na renderização | Não se guarda o que dá para calcular |
| `SET_ITEM_PROPERTY` | Estado que muda e a tela se redesenha | Você não manda a tela mudar: descreve a tela para cada estado |
| LOV | Campo de busca que consulta a API | Lista grande é paginada no servidor |
| `:GLOBAL` | URL, estado da tela ou token | Não existe variável de sessão no servidor |
| Lock ao editar | Lock otimista (versão) e resposta 409 | A web não segura conexão entre requisições |
| `COMMIT_FORM` de vários blocos | **Uma** chamada de API que grava tudo numa transação | Três chamadas separadas não são uma transação |
| Usuário de banco | Token do usuário e usuário de serviço no banco | A autorização passa a ser checada na API |
| Package PL/SQL | Continua no banco e a API chama, ou vira *service* | Reescrever exige teste de equivalência |
| Reports | PDF no servidor, relatório em tela ou ferramenta de BI | Não há impressão direta como no cliente |

A trilha **Migração Forms → web** desenvolve cada linha, com treino. A lição dados-12 mostra como a API
Nest conversa com o Oracle e chama packages.

> [!ATENCAO] Exemplos genéricos, de propósito
> Os exemplos do curso são genéricos (cadastro de fornecedor, pedido e itens). Leve para o trabalho o
> **método**. Ao praticar, não use tela, tabela ou código do seu empregador em repositório pessoal.

# Parte 7 — Chefões, desafios e módulos

## Os chefões

Lição mede o que você entendeu. Chefão mede o que você **faz sozinho**, com o relógio correndo e sem IA.

| Chefão | Fase | Tempo | O que é |
|---|---|---:|---|
| **0 — O primeiro marco** | 1 | 75 min | API Nest mínima do zero com DTO validado e um teste e2e, mais duas respostas de corredor |
| **1 — API do zero** | 2 | 2 h | API de Notas com Prisma, erros RFC 9457, Swagger e testes |
| **2 — Tela do zero** | 3 | 2 h | App React para as Notas: lista, formulário, atualização otimista, teclado |
| **3 — Feature completa** | 4 | 3 h | No Cockpit: módulo, migration, regra em transação, tela e três níveis de teste |
| **4 — Banca de arquitetura** | 5 | 3 h | Proposta de migração de um módulo genérico, defendida diante do mentor como banca |

O enunciado completo, o que pode, o que não pode e o critério de aprovação estão na aba **Chefões**.
Depois de cada um, peça a revisão ao seu mentor (Parte 8). Reprovou? Refaça com outro
tema na semana seguinte: é o método funcionando.

## Os desafios de depuração

São 24 defeitos reais (D01 a D24), cada um com sintoma, dicas em degraus e gabarito. Ficam na aba
Chefões, dentro da fase em que fazem sentido. Regras: 25 minutos sozinho antes da primeira dica, e a sua
hipótese **por escrito** antes de abrir o gabarito. Melhor ainda: com um mentor de IA que
enxerga o seu repositório, peça **"planta o desafio D07"** e ele cria uma branch no seu Cockpit com o defeito
plantado e só o sintoma descrito.

## Módulos avançados (depois da Sprint 10)

### Módulo A — Nest avançado

| Entrega | Conceito | Pronto quando |
|---|---|---|
| A1. Lembretes por fila | BullMQ e Redis: job com atraso, nova tentativa com espera crescente, fila de mortos | O lembrete sai no horário; falha 3 vezes e vai para a fila de mortos |
| A2. Tempo real | SSE: o plano do dia atualiza em duas abas | Concluir numa aba reflete na outra em menos de 1 segundo |
| A3. Cache | Cache na revisão semanal, invalidado por evento | A segunda chamada não vai ao banco (prova pelo log de query) |
| A4. Módulo dinâmico | Um `NotificationsModule.forRoot({ canal })` seu | Troca o canal por configuração, sem mexer no consumidor |

O Redis pede Docker. Em máquina de empresa, confira antes a licença do Docker Desktop, a política de TI e o
WSL2. Alternativas gratuitas: Docker Engine dentro do WSL2 ou Podman Desktop.

### Módulo B — Produção

| Entrega | Conceito | Pronto quando |
|---|---|---|
| B1. Contêiner | Dockerfile multi-estágio, usuário não-root, compose com Postgres e Redis | `docker compose up` sobe tudo numa pasta limpa |
| B2. Observabilidade | Logs JSON com `requestId`, erros no Sentry, um trace OpenTelemetry | Um erro provocado aparece com o `requestId`; o trace mostra a query lenta |
| B3. Arquitetura | Um módulo refeito em portas e adaptadores | O teste do domínio roda sem banco e sem Nest; ADR explicando por que só esse |
| B4. Segurança | Revisão OWASP do Cockpit, `npm audit`, rate limit, cabeçalhos | Relatório com cada item: ok, corrigido ou risco aceito |

### Módulo C — Transferência

| Entrega | Regra |
|---|---|
| C1. Projeto novo, back-end | Repositório novo, a partir de uma especificação pública (RealWorld): usuários, artigos, comentários. Nest, Prisma e testes. Sem guia e sem IA escrevendo código |
| C2. Projeto novo, front | Listar e ler artigo, login, criar artigo. Mesmas regras |
| C3. IA no fluxo | Peça a uma IA uma feature do C1 e **revise como tech lead**: ache pelo menos 3 problemas e corrija você |

### Módulo D — Piloto de migração

Uma tela **genérica** no estilo Forms ("pedido e itens": mestre-detalhe, uma LOV grande, uma validação de
regra, gravação dos dois blocos juntos) refeita em React e Nest, com Postgres no lugar do Oracle. Entregas:
o inventário da tela, a tela nova com lock otimista e gravação numa chamada só, o teste da regra e a
proposta de migração de 3 páginas. É o ensaio geral do Chefão 4 e o seu modelo para o trabalho.

# Parte 8 — O mentor

## O que pedir, com as palavras exatas

Estudar sozinho não quer dizer estudar sem retorno. O mentor pode ser um colega mais experiente ou um
assistente de IA que enxerga o seu repositório (o curso foi feito com o Claude Code, mas serve qualquer
um). O que pedir:

| Pedido | O que acontece |
|---|---|
| **"Revisa a Sprint N"** | Revisão completa: código, histórico, CI e GitHub. O que faltar vira correção antes da próxima |
| **"Revisa o Chefão N"** | Correção da prova, com o que travou virando cartão |
| **"Faz a banca do Chefão 4"** | O mentor ataca cada decisão da sua proposta como um arquiteto cético |
| **"Planta o desafio Dxx"** | Uma branch no seu Cockpit com o defeito plantado e só o sintoma |
| **"Sabatina da fase N"** | 10 perguntas sem consulta, corrigidas |
| **"Me explica como se eu soubesse PL/SQL"** | A ponte sob demanda, para qualquer conceito |
| **"Me dá uma dica, não o código"** | Para quando travar (regra dos 25 minutos) |
| **"Entrevista simulada"** | Técnica, de system design ou comportamental |

## A regra de IA por fase

| Fases | A IA pode | A IA não pode |
|---|---|---|
| 1 a 3 | Explicar, dar dica, revisar, plantar defeito, sabatinar | Escrever o código do Cockpit. Se você pedir um trecho para entender, apague e reescreva de memória |
| 4 | Sugerir abordagens e comparar alternativas | Decidir por você: a decisão vira ADR escrita por você |
| 5 | Gerar código **para você revisar** | Mandar código para a `main` sem você explicar cada linha |

O mercado usa IA todo dia e você também vai usar. Mas quem aprende pedindo o código pronto só passa pela
fase. A partir da Fase 5, revisar código de IA com rigor **é** a habilidade.

# Parte 9 — Se algo der errado

## Problemas com o Dojo

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| `npm start` dá erro de sintaxe ou de arquivo `.mts` | Node antigo | Instale o Node.js 24 ou mais novo (`node -v` para conferir) |
| "O Dojo já está rodando" | Há outro terminal com ele aberto | Normal: o navegador abre no que já existe |
| A página diz "token inválido: recarregue" | O servidor foi fechado e reaberto | Recarregue a página (F5) |
| "O Dojo está aberto em outra aba" | Duas abas do Dojo | Feche uma e recarregue a outra |
| "TypeScript não encontrado" nos exercícios de compilar | Faltou instalar a dependência | Rode `npm install` na pasta do Dojo |
| O progresso sumiu | O arquivo de estado foi apagado ou corrompido | Em `meu-progresso/`, copie o `dojo-estado.AAAA-MM-DD.bak.json` mais recente para `dojo-estado.json` |
| Os commits do dia não aparecem | A pasta do projeto não foi informada | Aba Progresso, Editar perfil: informe o caminho completo do seu Cockpit |
| Uma lição parece errada | Pode estar | Teste no Laboratório e abra uma *issue* no repositório. Os exercícios são conferidos por execução, mas o texto pode ter erro |

## Problemas com o estudo

| Situação | O que fazer |
|---|---|
| Dia ruim, zero energia | Modo Mínimo. 15 minutos. Só isso já é vitória |
| Perdi um dia | Nada. O escudo cobre, ou a ofensiva recomeça. Abra hoje |
| Perdi uma semana | Abra no modo Mínimo. A revisão vai estar maior: faça só o limite do dia e deixe o resto para amanhã |
| A revisão virou uma bola de neve | O Dojo já limita os cartões por dia. Faça o limite e pare |
| Uma lição não entra | Faça os exercícios mesmo errando, teste no Laboratório e peça ao mentor "me explica como se eu soubesse PL/SQL" |
| O Cockpit travou num erro | Regra dos 25 minutos (Parte 2) |
| Três semanas sem cumprir a meta de dias | Baixe a meta (aba Progresso, Editar perfil) e use mais dias de Mínimo. O plano se adapta a você, não o contrário |
| O guia diz uma coisa e a ferramenta outra | A documentação oficial da versão instalada vence. Anote: vira correção do guia |

## O protocolo de depuração

1. Leia a mensagem de erro **inteira**, até o fim.
2. **Reproduza** de forma confiável.
3. **Diminua** o caso até sobrar só o que causa o erro.
4. Escreva uma **hipótese**: "acho que é X porque Y".
5. Teste a hipótese com **instrumento**: breakpoint, aba Network, log de query, `git bisect`.
6. Corrija a **causa** e escreva o teste que falharia sem a correção.
7. Registre: cartão no Dojo.

# Parte 10 — Glossário

Toda palavra técnica usada neste guia, em ordem alfabética. Os termos ficam em inglês porque é assim que
aparecem na documentação.

| Termo | O que é, em uma frase |
|---|---|
| **ADR** | *Architecture Decision Record*: um texto curto que registra uma decisão técnica, as alternativas e o porquê |
| **API** | A interface pela qual um programa conversa com outro; aqui, o servidor NestJS que a tela chama por HTTP |
| **`async/await`** | A forma de escrever código que espera uma operação demorada sem travar o programa |
| **Branch** | Uma linha de trabalho separada no git, criada para uma mudança e depois juntada à principal |
| **CI** | *Continuous Integration*: o robô que roda lint, build e testes a cada envio de código |
| **Closure** | Uma função que lembra as variáveis do lugar onde foi criada |
| **Commit** | Uma foto do projeto inteiro num momento, com uma mensagem dizendo o que mudou |
| **Componente** | Uma função React que devolve um pedaço de tela |
| **CORS** | A regra do navegador que só deixa uma página chamar outro endereço se o servidor autorizar |
| **CRUD** | Criar, ler, atualizar e apagar: as quatro operações básicas de um cadastro |
| **Decorator** | A anotação com `@` que o Nest usa para marcar classes e métodos (`@Controller`, `@Get`) |
| **Deploy** | Pôr uma versão do sistema no ar |
| **DI** | *Dependency Injection* (injeção de dependência): o framework entrega a cada classe os objetos de que ela precisa, em vez de ela criar |
| **DTO** | *Data Transfer Object*: a classe que descreve e valida o formato do dado que entra ou sai da API |
| **e2e** | *End to end*: teste que exercita o sistema de ponta a ponta, como um usuário ou um cliente da API |
| **Endpoint** | Um endereço da API com um método, por exemplo `POST /tasks` |
| **ESM** | O sistema de módulos padrão do JavaScript (`import` e `export`) |
| **Event loop** | O laço que faz o Node executar uma coisa por vez e agendar o resto |
| **Guard** | A peça do Nest que decide se uma requisição pode entrar (autenticação e autorização) |
| **Hook** | Uma função do React cujo nome começa com `use` e que dá estado ou comportamento a um componente |
| **HTTP** | O protocolo de pergunta e resposta da web |
| **Idempotente** | Uma operação que, repetida, dá o mesmo resultado de uma vez só |
| **JSX** | A sintaxe que deixa escrever a tela dentro do JavaScript, parecida com HTML |
| **JWT** | *JSON Web Token*: um texto assinado que carrega a identidade do usuário a cada requisição |
| **Lint** | A ferramenta que aponta erro provável e fuga de padrão no código |
| **Lock otimista** | Em vez de travar o registro, conferir na hora de gravar se alguém mudou antes |
| **Merge** | Juntar o trabalho de uma branch em outra |
| **Middleware** | Uma função que roda antes do tratamento da requisição |
| **Migration** | Um arquivo versionado que muda a estrutura do banco de forma repetível |
| **Mock** | Um substituto falso de uma dependência, usado em teste |
| **Módulo (Nest)** | A unidade que agrupa controllers e services de um assunto e declara o que exporta |
| **Monorepo** | Um repositório só com vários projetos (aqui, `apps/api` e `apps/web`) |
| **N+1** | O erro de fazer uma consulta para a lista e mais uma para cada item dela |
| **npm** | O gerenciador de pacotes do Node |
| **OpenAPI** | O formato padrão para descrever uma API; dele se gera documentação e o cliente da tela |
| **ORM** | A biblioteca que traduz objetos do código para tabelas do banco (Prisma, TypeORM) |
| **Pipe** | A peça do Nest que valida ou transforma o dado de entrada |
| **PR** | *Pull Request*: o pedido para juntar uma branch à principal, onde acontece a revisão |
| **Props** | Os parâmetros que um componente React recebe |
| **Provider** | Qualquer classe ou valor que o Nest sabe criar e injetar (um *service* é um provider) |
| **Query** | No front, um pedido de dado ao servidor guardado em cache pelo TanStack Query |
| **Refresh token** | O token de vida longa que serve só para pedir um novo token de acesso |
| **REST** | O estilo de API em que cada endereço é um recurso e os métodos HTTP dizem a ação |
| **Service** | A classe do Nest onde fica a regra de negócio |
| **Sprint** | Um pedaço do Cockpit com objetivo e critério de pronto |
| **SSO** | *Single Sign-On*: entrar uma vez e ser reconhecido em vários sistemas |
| **Stale closure** | Uma função que ficou com um valor antigo de uma variável |
| **Estado (state)** | O dado que, quando muda, faz o React redesenhar a tela |
| **TDD** | Escrever o teste antes do código: vermelho, verde, refatorar |
| **Token** | Um texto que prova quem é o usuário sem mandar a senha de novo |
| **Trade-off** | O que se perde ao escolher uma opção: toda decisão de arquitetura tem um |
| **Union (união)** | Um tipo que aceita uma entre várias formas (`string \| number`) |
| **XSS** | Ataque em que um script malicioso roda na página de outro usuário |

> [!INFO] Como este guia foi comprovado
> Os números do topo vêm do validador do Dojo, lidos na hora em que este documento é gerado. O validador
> **executa** cada exercício "preveja a saída" e passa cada exercício "compila?" pelo compilador
> TypeScript. Se a saída real difere da esperada, a lição é reprovada e o documento não é gerado. O que
> o validador **não** prova é o texto das explicações: ele foi revisado, mas pode conter erro. Se algo
> parecer errado, teste no Laboratório e abra uma *issue*.

# Anexo A · O Cockpit, sprint a sprint

## Como ler este anexo

É o passo a passo de construção do Cockpit, sprint a sprint. O Dojo abre aqui na seção da missão do dia. Onde o texto diz "documento 1", leia Anexo B; onde diz "documento 3", leia as Partes 1 a 9 deste guia.


# Anexo A · Antes da primeira linha

## Como usar este guia

Este guia não entrega o código pronto: ele conduz você a **escrever** o Cockpit do jeito que um time
NestJS trabalha de verdade. Cada sprint segue o mesmo rito — repita-o até virar reflexo:

1. **Issue** no GitHub com o objetivo e o critério de pronto (copie da sprint).
2. **Branch** a partir da `main`: `feat/<assunto>`, `fix/<assunto>`, `chore/<assunto>`.
3. **Gerar com a CLI** (`nest g ...`, `prisma migrate dev`, `npx shadcn add ...`). O que a ferramenta
   gera, você **não** escreve à mão — e depois **lê** o que ela gerou antes de alterar.
4. **Implementar** em passos pequenos, rodando a aplicação em modo watch.
5. **Testar**: unitário do service, e2e da rota. Teste vermelho antes do verde quando for regra pura.
6. **Commits pequenos** em Conventional Commits (`feat(tasks): add status transition endpoint`).
7. **Pull Request** com descrição (o quê, por quê, como testar, prints). O CI tem que ficar verde.
8. **Revise o seu próprio PR** no GitHub como se fosse de outra pessoa do time — você é o tech lead.
9. **Squash merge** na `main`, apague a branch, feche a issue.
10. **Revisão da sprint** antes de abrir a próxima: código, histórico, CI e configurações do GitHub,
    conferidos contra o "Como deve ficar no fim" da sprint. O que faltar vira issue da sprint seguinte.

> [!ATENCAO] Olhe o `git status` antes de todo `git add -A`
> O `git add -A` leva **tudo** o que mudou, inclusive arquivos de outro passo. É assim que um commit
> `chore(web)` acaba levando README, ADR e `.vscode` junto, e o commit `docs:` fica quase vazio. Leia a
> lista do `git status`; se aparecer coisa que não é do passo, adicione só o que é (`git add apps/web`).

> [!INFO] Convenção deste guia
> Os comandos de terminal estão em **PowerShell 5.1**, o terminal padrão do Windows (e o do VS Code
> no Windows; no Linux e no macOS os comandos são os mesmos, só muda o separador de pastas): um comando por linha, sem `&&`. O `&&` só aparece **dentro** de scripts do `package.json`
> e do CI, onde quem executa é o `cmd`/`bash`. Arquivos de configuração são criados **no VS Code**.
> Os blocos de código mostram o essencial de cada arquivo — os *imports* óbvios foram omitidos para
> caber; lembre que no projeto (ESM) todo import relativo termina em `.js`.

> [!ATENCAO] Versões mudam
> Medido e **executado** em 31/10/2026 (Sprints 0 a 10, numa cópia descartável): CLI do Nest **12.0.11**
> (ESM, Vitest 4, oxlint, TypeScript 6), create-vite **9.3.3** (Vite 8, React 19, TypeScript 7), Prisma
> **7.10.1** (fixo — ver Sprint 1), Tailwind 4, shadcn 4.23, React Router **8.5**, Zod 4, orval 8,
> Playwright 1.64. Cada sprint diz no topo o que foi provado e o que ficou de fora.
> Se um comando não bater com o que a ferramenta pede, **a documentação oficial da versão instalada vence**.
> Anote a diferença no PR — isso também é trabalho de tech lead.

> [!INFO] v1.1 — revisão da Sprint 0 (31/10/2026)
> Depois da primeira execução real da Sprint 0: README e ADRs com modelo e conteúdo (0.7, passos 1 e 2), configuração
> do GitHub passo a passo (passo 7), triagem dos PRs do Dependabot (passo 8), `dependabot.yml` com grupo
> e `ignore` e *actions* na v7 (0.6), convenção de versões esclarecida, checklist do GitHub no fim da
> sprint e seis problemas comuns novos.

> [!INFO] v1.2 — segunda revisão da Sprint 0 (31/10/2026)
> ADR 0001 pronta como exemplo e a 0002 como perguntas (a tabela da v1.1 foi colada como texto); Project
> público e issue com corpo; *squash* só no ruleset; `git pull` depois de todo merge no GitHub; título de
> PR em Conventional Commits (o commitlint não vê o que é feito no navegador); `main` divergente nos
> problemas comuns.

> [!INFO] v1.3 — correção da Sprint 1 (10/11/2026)
> O `AppModule` da seção 1.3 citava o filtro (1.4) e o `HealthModule` (1.5) antes de eles existirem. Agora
> cada peça é registrada na seção em que nasce.

> [!INFO] v1.4 — revisão da Sprint 1 (11/11/2026)
> A seção 1.6 virou passo a passo: os dois testes e2e têm arquivo e código (antes eram duas linhas de
> lista, fáceis de passar batido), o `ci.yml` aparece inteiro (o trecho solto levava a pôr `services` na
> raiz do arquivo, o que invalida o workflow) e há um "Como deve ficar no fim". O filtro da 1.4 passou a
> registrar todo erro 5xx no log e a devolver o corpo do Terminus quando o health check falha; o ping da
> 1.5 ganhou 3 s de limite, porque um banco que hiberna (Neon) não acorda em 1 s.

### Definição de pronto (DoD) — vale para todo PR

- [ ] Compila (`npm run build`) e passa no lint e no typecheck
- [ ] Testes unitários do que tem regra + e2e das rotas novas, todos verdes
- [ ] Rota nova aparece certa no Swagger (`/docs`), com exemplo e respostas de erro
- [ ] `openapi.json` regerado e o cliente do front regerado (`npm run api:gen`)
- [ ] Nenhum `any`, nenhum `console.log`, nenhum segredo no código
- [ ] Migration com nome que diz o que faz (`add_task_follow_up`)
- [ ] README/ADR atualizado se a decisão mudou algo estrutural

## Ambiente

### O que você precisa ter

| Ferramenta | Situação |
|---|---|
| Node.js 24 + npm 11 | obrigatório — atende NestJS 12 e Vite 8 |
| Git | obrigatório |
| VS Code | recomendado |
| PostgreSQL | não precisa instalar — ver decisão **D-02** do documento 1 (recomendado: Neon, sem instalar nada) |
| Docker | não é necessário neste guia |

### Instalar (só pacotes npm, sem runtime novo)

```powershell
# 📍 qualquer pasta (instalação global, uma vez por máquina)
npm i -g @nestjs/cli        # a CLI do Nest: nest new, nest g ...
nest --version
```

### Extensões do VS Code recomendadas

Oxc (`oxc.oxc-vscode`, para o oxlint) · Prettier · Prisma · Tailwind CSS IntelliSense · GitLens · Error Lens · REST Client (ou Thunder
Client) · Vitest. Grave a lista em `.vscode/extensions.json` para o repositório "recomendar" sozinho.

### Banco (D-02 = Neon)

1. Crie conta no Neon com o **e-mail pessoal** e um projeto `cockpit`.
2. Crie dois *branches* de banco: `dev` e `test`.
3. Guarde as duas *connection strings* — elas vão para `apps/api/.env` e `apps/api/.env.test`
   (**nunca** no git; o `.gitignore` já cobre `.env`).

## Convenções do projeto

| Assunto | Convenção |
|---|---|
| Branches | *trunk-based*: `main` protegida; branches curtas `feat/`, `fix/`, `chore/`, `docs/`, `test/` |
| Commits | Conventional Commits; escopo = módulo: `feat(auth): ...`, `test(tasks): ...`, `chore(ci): ...` |
| Idioma do código | inglês (nomes, commits, rotas); interface e documentação do produto em pt-BR |
| Arquivos Nest | `kebab-case.tipo.ts` — exatamente o que a CLI gera: `tasks.service.ts`, `jwt-auth.guard.ts` |
| Arquivos React | componentes em `PascalCase.tsx`, hooks em `useCamelCase.ts`, resto em `kebab-case.ts` |
| DTOs | `CreateTaskDto`, `UpdateTaskDto`, `TaskQueryDto`, `TaskResponseDto` |
| Rotas | plural, `kebab-case`, sem verbo — ação com regra vira sub-recurso (`POST /tasks/:id/status`) |
| Versões | o que as CLIs geram na Sprint 0 fica com `^` (o `package-lock.json` já trava a versão instalada). Lib central que entra depois, e que quebra entre versões, entra **fixa** com `npm i -E` (é o caso do Prisma na Sprint 1). Dependabot propõe as atualizações; major só entra com o CI verde **e** lendo o *changelog* |

# Anexo A · As sprints

## Sprint 0 — Fundação do repositório

**Objetivo:** repositório com monorepo, API e web "olá mundo", lint, commits padronizados e CI verde.
**Branch:** nenhuma — a Sprint 0 é a **única** feita direto na `main`, porque ainda não existe `main` para
abrir PR contra. A partir da Sprint 1 vale o rito completo (branch → PR → CI → merge).

> [!OK] Executada ao pé da letra em 31/10/2026
> Esta versão foi seguida **exatamente como está escrita**, passo a passo, numa pasta vazia: CLI do Nest
> 12.0.11, create-vite 9.3.3, Node 24, PowerShell 5.1, Git com `core.autocrlf=true`. Siga na ordem.

> [!CRITICO] Regra da Sprint 0: um terminal, sempre na raiz
> Depois do passo 0.1, **o terminal fica na pasta `cockpit` até o fim da sprint**. Nenhum passo manda
> entrar em `apps`. Todo comando com `-w apps/api` ou `-w apps/web` só funciona na raiz — de dentro de
> `apps` ou `apps\api` ele dá *"No workspaces found: --workspace=apps/api"*.
> Todo bloco de comandos começa com `# 📍 raiz`. Na dúvida, rode `Get-Location`: tem que terminar em `\cockpit`.

### 0.1 Pasta, git e workspaces

Escolha onde guardar o projeto. Abra o PowerShell **nessa** pasta e rode:

> [!INFO] O terminal raiz
> Neste guia, **raiz** é o terminal aberto na pasta `cockpit` (a raiz do repositório). Os blocos marcados
> com 📍 dizem em que pasta rodar cada comando.

```powershell
# 📍 a pasta onde você guarda projetos (ex.: C:\Users\<você>\project-pessoal)
mkdir cockpit
cd cockpit
```

A partir daqui você está na **raiz** do projeto. Abra-a no VS Code e use o terminal dele (`Ctrl+'`), que já
nasce na raiz:

```powershell
# 📍 raiz
code .
```

```powershell
# 📍 raiz
git init -b main
npm init -y
mkdir apps, docs, docs\adr
```

(Com **vírgula**: no PowerShell, `mkdir apps docs` separado por espaço dá erro.)

**Identidade dos commits — só neste repositório.** O commit não precisa de login, mas precisa saber quem
você é. Configure **sem `--global`**, para não misturar com a conta da empresa:

```powershell
# 📍 raiz
git config user.name "Seu Nome"
git config user.email "seu-email-pessoal@exemplo.com"
git config --show-origin user.email
```

O último comando tem que mostrar `file:.git/config`.

> [!INFO] E-mail privado
> No GitHub pessoal, em *Settings → Emails*, ative "Keep my email address private" e use o endereço
> `numero+usuario@users.noreply.github.com` que ele mostra. O **login** só acontece no `git push` (0.7).

No VS Code, abra o `package.json` que o `npm init` criou e troque **todo** o conteúdo por este (só os
scripts que já funcionam hoje; o `dev` entra no 0.5):

```json
{
  "name": "cockpit",
  "private": true,
  "license": "MIT",
  "workspaces": ["apps/*"],
  "engines": { "node": ">=24" },
  "scripts": {
    "build": "npm run build --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present",
    "test": "npm run test --workspaces --if-present"
  }
}
```

> [!ATENCAO] Os blocos mostram o CONTEÚDO do arquivo
> Quando o bloco começa com `# nome-do-arquivo` (gitignore, gitattributes, ini, yaml, shell), essa linha é
> um comentário válido e pode ir junto. **Arquivo JSON não aceita comentário**: o nome do arquivo vem
> escrito antes do bloco, e o bloco é copiado inteiro, do `{` ao `}`.

### 0.2 Arquivos de base — antes do primeiro commit

Crie estes cinco arquivos **na raiz, pelo VS Code** (botão *New File* no explorador). Não use
`echo ... >` no PowerShell 5.1: ele grava com BOM/UTF-16.

Arquivo `.gitignore`:

```gitignore
node_modules/
dist/
coverage/
*.log
*.tsbuildinfo
.env
.env.*
!.env.example
.DS_Store
```

Arquivo `.gitattributes` (todo arquivo de texto com fim de linha LF no repositório):

```gitattributes
* text=auto eol=lf
```

Arquivo `.prettierrc` (JSON puro — nenhuma linha de comentário):

```json
{ "singleQuote": true, "trailingComma": "all", "endOfLine": "lf" }
```

Arquivo `.editorconfig`:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

Arquivo `.nvmrc`, contendo só:

```text
24
```

> [!ATENCAO] Por que antes do primeiro commit?
> - Sem `.gitignore`, o primeiro `git add -A` depois do `npm install` leva **centenas de pacotes** do
>   `node_modules` para o repositório (o `nest new --skip-git` não cria `.gitignore`).
> - Sem `.gitattributes`, o Git do Windows (`core.autocrlf=true`) converte os arquivos para CRLF e o
>   `lint-staged` do 0.5 falha com **"Failed to restore unstaged changes"** — testado.

```powershell
# 📍 raiz
git add -A
git commit -m "chore: bootstrap npm workspaces monorepo"
git log --oneline
```

**Confira:** 1 commit no `git log`.

### 0.3 API com a CLI do Nest

**Passo 1 — gerar.** O `--directory` cria a API dentro de `apps\api` sem você sair da raiz:

```powershell
# 📍 raiz
nest new api --directory apps/api --package-manager npm --strict --skip-git --skip-install
```

> [!INFO] Se o `nest new` perguntar o test runner e o linter
> Escolha **Vitest** e **oxlint** — são o padrão do Nest 12 e o que este guia inteiro usa e provou.
> Vitest entende o projeto ESM sem configuração extra (Jest em ESM ainda é experimental) e é o mesmo
> runner do front.

> [!INFO] Por que `--skip-install`?
> Em monorepo com workspaces quem instala é a raiz (um `package-lock.json` só). Se o `nest new` instalar
> sozinho, ele cria um lock dentro de `apps/api` e os dois brigam.

**Passo 2 — instalar, pela raiz:**

```powershell
# 📍 raiz
npm install
Test-Path apps\api\package.json
Test-Path apps\api\package-lock.json
```

Tem que sair `True` e depois `False` (a API existe e não tem lock próprio).

**Passo 3 — ler o que a CLI gerou.** O Nest 12 mudou bastante em relação ao Nest 11 dos tutoriais:

| O que veio | O que significa |
|---|---|
| `"type": "module"` no `package.json` e `import ... from './app.module.js'` | o projeto é **ESM**: todo import relativo termina em `.js`, mesmo o arquivo sendo `.ts`. Os `nest g` já geram assim |
| `await bootstrap()` no fim do `main.ts` | *top-level await*, permitido no ESM |
| `vitest.config.ts` e `vitest.config.e2e.ts` | os testes são **Vitest**, não Jest: `vi.fn()` no lugar de `jest.fn()`; `describe`/`it`/`expect` continuam globais |
| `.oxlintrc.json` e `"lint": "oxlint --type-aware ..."` | o lint é **oxlint** (escrito em Rust, muito rápido), não ESLint |
| `typescript` 6 | TypeScript novo; `strict` ligado pelo `--strict` |
| `AGENTS.md` | texto para assistentes de IA que oferece o serviço de telemetria **NestJS Observe** |
| script `deploy` + pacote `@nestjs/mau` | deploy na nuvem do próprio Nest |
| `.prettierrc` e `.gitattributes` dentro de `apps/api` | duplicam os da raiz |

**Passo 4 — ajustar arquivos, no VS Code** (cada item é uma decisão que você vai defender no README):

1. No explorador do VS Code, apague `apps/api/.prettierrc`, `apps/api/.gitattributes` e `apps/api/AGENTS.md`.
   Valem os arquivos da raiz, e o Cockpit não manda telemetria para fora (doc 1, Observabilidade).
2. Abra `apps/api/package.json`:
   - troque `"license": "UNLICENSED"` por `"license": "MIT"` (D-08);
   - apague a linha inteira `"deploy": "nest deploy",` (D-07: o deploy é no Render).
3. Abra `apps/api/.oxlintrc.json` e troque `"typescript/no-explicit-any": "off"` por
   `"typescript/no-explicit-any": "error"` — a DoD proíbe `any`, então o lint tem que proibir também.

**Passo 5 — remover o pacote do deploy do Nest, pela raiz:**

```powershell
# 📍 raiz
npm uninstall -w apps/api @nestjs/mau
```

**Passo 6 — provar que a API funciona, pela raiz:**

```powershell
# 📍 raiz
npm run test -w apps/api
npm run test:e2e -w apps/api
npm run lint -w apps/api
npm run build -w apps/api
```

Esperado: `Tests 1 passed` nos dois testes, lint sem erros e o build gerando `apps\api\dist\main.js`.
Para ver a API no ar:

```powershell
# 📍 raiz
npm run start:dev -w apps/api
```

Abra `http://localhost:3000` no navegador → `Hello World!`. Volte ao terminal e pare com `Ctrl+C`.

**Passo 7 — commit:**

```powershell
# 📍 raiz
git add -A
git commit -m "chore(api): scaffold nestjs app"
```

> [!INFO] Avisos `CRLF will be replaced by LF` no `git add`
> Normais: a CLI do Nest grava em CRLF no Windows e o `.gitattributes` normaliza para LF.

### 0.4 Web com Vite

**Passo 1 — gerar**, também sem sair da raiz:

```powershell
# 📍 raiz
npm create vite@latest apps/web -- --template react-ts
```

> [!ATENCAO] Se o create-vite perguntar "Install with npm and start now?"
> Responda **No**. Quem instala é a raiz; instalar dentro de `apps/web` cria um segundo lock.

**Passo 2 — instalar e provar, pela raiz:**

```powershell
# 📍 raiz
npm install
npm run build -w apps/web
npm run dev -w apps/web
```

Abra `http://localhost:5173` → página inicial do Vite. Pare com `Ctrl+C`.

O Vite 8 gera o web com **oxlint** e **TypeScript 7**, enquanto a API usa TypeScript 6. É normal no
monorepo: cada app compila com o seu (testado). Não "unifique" à força.

**Passo 3 — commit:**

```powershell
# 📍 raiz
git add -A
git commit -m "chore(web): scaffold vite react-ts app"
```

### 0.5 Qualidade de commit

**Passo 1 — instalar as ferramentas na raiz** (sem `-w`: a raiz não é um workspace, e `-w .` dá
*"No workspaces found"*):

```powershell
# 📍 raiz
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional prettier concurrently
npx husky init
```

O `husky init` cria a pasta `.husky` com um `pre-commit` contendo `npm test`, e põe o script
`"prepare": "husky"` no `package.json`.

**Passo 2 — arquivos, no VS Code:**

Troque o conteúdo de `.husky/pre-commit` por:

```bash
npx lint-staged
```

Crie `.husky/commit-msg` com:

```bash
npx --no -- commitlint --edit "$1"
```

Crie `commitlint.config.mjs` na raiz:

```js
export default { extends: ['@commitlint/config-conventional'] };
```

Crie `.lintstagedrc.json` na raiz:

```json
{ "*.{ts,tsx}": ["oxlint --fix", "prettier --write"], "*.{json,md,css,yml}": ["prettier --write"] }
```

No `package.json` da raiz, dentro de `"scripts"`, acrescente a linha do `dev` (lembre da vírgula na linha
de cima):

```json
"dev": "concurrently -n api,web -c blue,magenta \"npm run start:dev -w apps/api\" \"npm run dev -w apps/web\""
```

**Passo 3 — provar que os hooks funcionam:**

```powershell
# 📍 raiz
git add -A
git commit -m "teste"
```

Tem que ser **recusado** pelo commitlint (`subject may not be empty` / `type may not be empty`). Agora o
commit certo, que passa pelo lint-staged:

```powershell
# 📍 raiz
git commit -m "chore: add husky, commitlint and lint-staged"
npm run dev
```

O `npm run dev` sobe API e web juntos; pare com `Ctrl+C`.

### 0.6 CI

Na Sprint 0 ainda não há banco: o *service* do Postgres e o passo de migration entram na Sprint 1.
Crie, pelo VS Code, as pastas `.github/workflows` e os arquivos:

Arquivo `.github/workflows/ci.yml`:

```yaml
name: ci
on:
  pull_request:
  push: { branches: [main] }
jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version-file: .nvmrc, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test
      - run: npm run test:e2e -w apps/api
```

> [!INFO] Por que `@v7` e não `@v4`
> A v4 das duas *actions* roda em Node 20, que o GitHub descontinuou: o CI passa, mas com o aviso
> *"Node.js 20 is deprecated"*. Se você já criou com `@v4`, o Dependabot abre os dois PRs de atualização
> sozinho — é só fazer o merge deles (0.7, passo 8).

Arquivo `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule: { interval: weekly }
    groups:
      nestjs: { patterns: ['@nestjs/*'] }
      vitest: { patterns: ['vitest', '@vitest/*'] }
    ignore:
      # @types/node acompanha o Node do projeto (.nvmrc = 24), não o último Node lançado
      - dependency-name: '@types/node'
        update-types: ['version-update:semver-major']
      # nest build precisa da API do compilador, que o TypeScript 7.0 não traz (volta no 7.1)
      - dependency-name: typescript
        update-types: ['version-update:semver-major']
  - package-ecosystem: github-actions
    directory: /
    schedule: { interval: weekly }
```

O que cada parte faz:

- **`groups`** junta num PR só os pacotes que precisam subir juntos. Sem o grupo `vitest`, o Dependabot
  abre um PR para `vitest` e outro para `@vitest/coverage-v8`, e cada um sozinho deixa o par em versões
  diferentes.
- **`ignore` com `semver-major`** recusa só a troca de versão maior; correções e versões menores
  continuam chegando. Medido em 31/10/2026: com TypeScript 7.0.2 na API, o `nest build` para com
  *"The installed TypeScript version (7.0.2) does not expose the programmatic compiler API that the
  Nest CLI requires"*. O web não é afetado (o Vite 8 já nasce com TypeScript 7). Quando sair o
  TypeScript 7.1, apague o bloco do `typescript` num PR `chore(deps)` e deixe o CI dizer se passou.

```powershell
# 📍 raiz
git add .github
git commit -m "ci: add github actions pipeline and dependabot"
```

### 0.7 Documentação inicial e GitHub

**Passo 1 — `README.md` na raiz, no VS Code.** É a vitrine do repositório: quem chega pelo seu perfil lê
isto antes de qualquer código. Na Sprint 0 ele é um **esqueleto que já diz a verdade** — só o que existe
hoje; cada sprint acrescenta o que entregou, e a Sprint 10 o transforma no README de portfólio. Use esta
estrutura e escreva o texto com as suas palavras (o documento 1, seções *Visão do produto* e *Stack e os
porquês*, tem o conteúdo):

```markdown
# Cockpit

Uma frase: o que o app faz e para quem (ex.: organizar o dia de trabalho de um tech lead).

> Em construção — Sprint 0 concluída (fundação do repositório). Roadmap nos milestones do GitHub.

## Stack

- API: NestJS 12 (ESM) · TypeScript · Vitest · oxlint
- Web: React 19 · Vite 8 · TypeScript
- Monorepo: npm workspaces · Husky · commitlint · lint-staged · GitHub Actions

## Estrutura

- `apps/api` — API NestJS (porta 3000)
- `apps/web` — SPA React (porta 5173)
- `docs/adr` — decisões de arquitetura

## Como rodar

Pré-requisito: Node 24 (ver `.nvmrc`).

1. `npm install` na raiz (instala os dois apps; há um único `package-lock.json`)
2. `npm run dev` — sobe API e web juntos
3. API em http://localhost:3000 · web em http://localhost:5173

## Scripts da raiz

| Script | O que faz |
|---|---|
| `npm run dev` | API e web em modo watch |
| `npm run build` | build dos dois apps |
| `npm run lint` | oxlint nos dois apps |
| `npm run test` | testes unitários |

## Como contribuir

Branch curta a partir da `main` → Conventional Commits → PR com CI verde → squash merge.

## Decisões de arquitetura

Ver [`docs/adr`](docs/adr).

## Licença

[MIT](LICENSE)
```

Não ponha no README o que ainda não existe (banco, login, deploy): ele entra na sprint que entregar.

**Passo 2 — as duas primeiras ADRs.** ADR (*Architecture Decision Record*) é um arquivo curto por
decisão, no formato de **Michael Nygard**: quatro partes, cabe numa tela, e **nunca é editado depois de
aceito** — se a decisão mudar, escreve-se uma ADR nova que diz *"substitui a 000N"* e a antiga passa a
*Substituída*. É assim que, daqui a um ano, você (ou um entrevistador) entende **por que** o código é
como é. O modelo:

```markdown
# N. Título no imperativo ou como afirmação

- Status: Aceita
- Data: AAAA-MM-DD

## Contexto

Que problema ou força obrigou a decidir? O que era verdade quando a decisão foi tomada
(restrições, prazo, quem mantém, o que já existia)?

## Decisão

O que foi decidido, em frases afirmativas: "Vamos usar ...".

## Consequências

O que fica mais fácil, o que fica mais difícil, e o que passa a ser regra por causa disto.
Inclua o lado ruim: ADR sem custo nenhum não convence ninguém.
```

**A 0001 é sempre a mesma em todo projeto** (é a ADR que adota ADRs), então ela vem pronta, como
exemplo de como uma ADR fica escrita. Arquivo `docs/adr/0001-record-architecture-decisions.md`:

```markdown
# 1. Registrar as decisões de arquitetura

- Status: Aceita
- Data: 2026-10-31

## Contexto

O Cockpit é desenvolvido por uma pessoa só e também serve de portfólio. Decisões tomadas
agora (ORM, contrato da API, estratégia de autenticação) vão ser questionadas depois: por
mim, daqui a alguns meses, ou por quem ler o código numa entrevista. O motivo de cada
escolha não aparece no código, e um documento de desenho guardado fora do repositório se perde.

## Decisão

Vamos registrar cada decisão que muda a estrutura do projeto como um ADR em `docs/adr/`, no
formato de Michael Nygard (Contexto, Decisão, Consequências), numerado em sequência
(`NNNN-titulo-em-kebab-case.md`). Um ADR aceito não é editado: para mudar a decisão,
escrevemos um ADR novo que o substitui, e o antigo passa a ter o status "Substituída por NNNN".

## Consequências

- Quem lê só o repositório entende o porquê do desenho.
- Mudar uma decisão estrutural fica, de propósito, mais caro: exige um ADR novo, e o PR que
  muda o código aponta para ele.
- Cada decisão custa alguns minutos de escrita, e o hábito precisa ser cobrado na revisão do PR.
```

**A 0002 você escreve.** Arquivo `docs/adr/0002-modular-monolith.md`, título `# 2. Monólito modular em
NestJS`. O que vem abaixo são **perguntas para responder com as suas palavras, não texto para colar**:

- **Contexto** — Quantas pessoas mantêm o código? Quantos deploys você quer operar? Quais são os domínios
  do app (cite os módulos: tarefas, plano do dia, foco, pessoas, decisões)? Por que não microsserviços?
- **Decisão** — Comece com "Vamos ...": um deploy só, um módulo Nest por domínio, e as três regras de
  fronteira do documento 1 (*Arquitetura do backend → Estilo: monólito modular*) **escritas por extenso**.
- **Consequências** — O lado bom (simples de operar, mover código entre módulos é barato), o lado ruim (um
  defeito derruba tudo; a fronteira entre módulos depende de disciplina e de revisão, não de rede) e o
  que passa a ser regra de PR.

> [!ATENCAO] Antes do commit, confira a ADR
> - O título tem o **número** da ADR (`# 2.`), não o `N.` do modelo.
> - Frases completas, começando com maiúscula. Lista de tópicos só nas Consequências.
> - **Nada de apontar para fora do repositório** ("ver documento 1"): quem lê a ADR no GitHub não tem o
>   documento 1. O que importa dele, você escreve na ADR.
> - As Consequências têm pelo menos **um** custo.

As ADRs 0003 a 0007 (tabela do documento 1, *Decisões*) são escritas na sprint que implementa cada
decisão: a 0003 na Sprint 1 (Prisma), a 0004 na Sprint 4 (orval), a 0005 na Sprint 2 (JWT/refresh), a
0006 na Sprint 5 (datas) e a 0007 na Sprint 3 (índice fracionário). Cada uma entra no PR da própria sprint.

**Passo 3 — `.vscode/extensions.json`** com as extensões recomendadas (seção Ambiente):

```json
{
  "recommendations": [
    "oxc.oxc-vscode",
    "esbenp.prettier-vscode",
    "editorconfig.editorconfig",
    "vitest.explorer",
    "prisma.prisma",
    "bradlc.vscode-tailwindcss"
  ],
  "unwantedRecommendations": ["dbaeumer.vscode-eslint"]
}
```

```powershell
# 📍 raiz
git status
git add README.md docs .vscode
git commit -m "docs: add readme, first adrs and editor recommendations"
```

O `git status` antes do `add` tem que mostrar **só** esses três itens. Se aparecer outra coisa, ela é de
outro passo e vai noutro commit.

**Passo 4 — criar o repositório no GitHub pessoal**, pelo navegador (logado na conta **pessoal**):
*+ → New repository*, nome `cockpit`, visibilidade **Public** (D-08), e deixe **desmarcado**
"Add a README file", **None** em ".gitignore template" e **None** em "Choose a license". Tudo isso já
existe aqui (a licença entra no passo 7); com o repositório vazio, o primeiro `push` é direto.

> [!ATENCAO] Criou com README ou licença marcados?
> O GitHub faz um `Initial commit` do lado dele, e o seu `git push` é recusado com
> *"Updates were rejected because the remote contains work that you do not have locally"*. Traga esse
> commit para baixo do seu histórico e envie de novo:
> `git pull --rebase origin main` e depois `git push -u origin main`. Os seus commits são reaplicados em
> cima do `Initial commit` (que fica com o nome da sua conta do GitHub, e não com o `user.name` local).

**Passo 5 — conferir a identidade antes de mandar qualquer coisa:**

```powershell
# 📍 raiz
git log --format="%an <%ae>"
```

Todas as linhas com o seu nome e e-mail **pessoais**. O repositório é **público**: o e-mail de cada commit
fica visível para qualquer pessoa, para sempre. Se você não quer expor o seu e-mail real, troque agora para
o `noreply` do GitHub (0.1) e reescreva os commits — **antes** do primeiro push, isso é de graça:

```powershell
# 📍 raiz
git config user.email "numero+usuario@users.noreply.github.com"
git rebase -r --root --exec "git commit --amend --no-edit --reset-author"
git log --format="%an <%ae>"
```

Depois do push isso exige `git push --force-with-lease` (possível só enquanto a `main` não está
protegida) — e depois da proteção do passo 7, não dá mais.

**Passo 6 — ligar ao GitHub e enviar.** O seu usuário pessoal vai na URL duas vezes: antes do `@` (login)
e no caminho (dono do repositório):

```powershell
# 📍 raiz
git remote add origin https://SEU-USUARIO@github.com/SEU-USUARIO/cockpit.git
git remote -v
git push -u origin main
```

> [!CRITICO] Conta pessoal × conta da empresa
> - O Git desta máquina usa o **Git Credential Manager**, que guarda uma credencial por usuário. Com o
>   usuário pessoal na URL, o primeiro `push` abre o navegador: entre com a **conta pessoal** (se o
>   navegador estiver logado na da empresa, saia ou use uma janela anônima nessa hora). A conta da empresa
>   continua intacta para os outros repositórios.
> - **Não use o botão "Publish to GitHub / Publish Branch" do VS Code**: ele publica na conta em que o
>   VS Code está logado (ícone de pessoa, canto inferior esquerdo), que pode ser a da empresa.

**Passo 7 — configurar o repositório no GitHub**, pelo navegador. Faça **nesta ordem**: a proteção da
`main` é a última, porque a licença ainda vai direto para a `main`.

1. **CI verde.** Aba *Actions*: o workflow `ci` do seu push tem que estar com ✓ verde. Abra-o e confira
   que o job se chama **`build-test`** — é esse nome que a proteção vai exigir no item 7. Se estiver
   vermelho, corrija antes de seguir (o log de cada passo abre clicando nele).
2. **Licença.** Na página do repositório: *Add file → Create new file*, digite `LICENSE` no nome; aparece o
   botão *Choose a license template* → **MIT License** → *Review and submit* → *Commit changes* direto na
   `main`. Depois traga para a sua máquina, no terminal **raiz**: `git pull` (o `git log --oneline -1`
   tem que mostrar *Create LICENSE*). Se o repositório foi criado com a licença no passo 4, ela já
   existe: pule este item.
3. **Sobre o repositório.** Na página inicial, engrenagem ao lado de *About*: uma descrição de uma linha
   e os *topics* `nestjs`, `react`, `typescript`, `vite`, `prisma`. É o que aparece no seu perfil.
4. **Pull Requests.** *Settings → General*, seção *Pull Requests*:
   - **desmarque** "Allow merge commits" e "Allow rebase merging"; deixe só **"Allow squash merging"**,
     com a mensagem padrão em *"Pull request title and description"* — assim cada PR vira **um** commit na
     `main`, com o título em Conventional Commits;
   - marque **"Always suggest updating pull request branches"** e
     **"Automatically delete head branches"** (a branch some sozinha depois do merge — passo 9 do rito).
5. **Labels.** Aba *Issues → Labels → New label*: `feat`, `bug` (já existe), `chore`, `docs`. Os padrões
   que repetem a ideia (`enhancement`, `documentation`) você pode apagar, para não ter dois nomes para a
   mesma coisa. `dependencies`, `javascript` e `github_actions` são criados pelo Dependabot: deixe.
6. **Milestones e Project.**
   - *Issues → Milestones → New milestone*: **os dez de uma vez**, de **`Sprint 1 — Base da API`** a
     **`Sprint 10 — Produção e portfólio`** (os títulos das sprints deste guia). Data é opcional. Com
     todos criados, a página de milestones vira o roadmap público que o README promete.
   - No seu perfil: *Projects → New project → Board*, nome `Cockpit`. Na engrenagem do Project
     (*Settings*), mude *Visibility* para **Public**: Project nasce privado, e privado ninguém de fora vê
     (nem o link no repositório aparece). Depois, no repositório, aba *Projects → Link a project* →
     `Cockpit`. O quadro tem as colunas *Todo / In Progress / Done*: cada issue nasce em *Todo* com o
     milestone da sprint e anda pelo quadro conforme o rito.
   - Abra a issue da Sprint 1 com milestone `Sprint 1`, label `feat`, adicionada ao Project, e o corpo
     **copiado da sprint** — é ele que diz quando a issue pode ser fechada: *Objetivo* (a linha
     **Objetivo** da sprint), *Critério de pronto* (uma caixa `- [ ]` por entrega da sprint, 1.1 a 1.6,
     e a DoD) e *Branch* (a linha **Branch** da sprint).
7. **Proteger a `main` (por último).** *Settings → Rules → Rulesets → New ruleset → New branch ruleset*:
   - *Ruleset name*: `main`; *Enforcement status*: **Active**;
   - *Target branches → Add target → Include default branch*;
   - em *Rules*, deixe marcados **"Restrict deletions"** e **"Block force pushes"** (já vêm marcados) e marque:
     - **"Require a pull request before merging"** com *Required approvals* = **0** — você trabalha
       sozinho e o GitHub não deixa ninguém aprovar o próprio PR; a revisão é você ler o diff (passo 8 do
       rito). Abra *Additional settings* e, em *Allowed merge methods*, deixe **só Squash** (o ruleset
       vem com os três marcados, e aí vale mais que o item 4);
     - **"Require status checks to pass"** → *Add checks* → digite `build-test` e escolha o que tem a
       origem *GitHub Actions*;
   - deixe o *Bypass list* **vazio** (nem você passa por cima) → **Create**.

   **Prova:** na aba *Branches*, a `main` aparece com o escudo de protegida; e um `git push` direto na
   `main` passa a ser recusado com *"Changes must be made through a pull request"*.

**Passo 8 — os PRs do Dependabot.** Logo depois do primeiro push o Dependabot faz a primeira varredura e
abre **vários PRs de uma vez** (aba *Pull requests*, autor `dependabot[bot]`). Não é para aceitar tudo: PR
do Dependabot é uma proposta, e você é o tech lead. Para cada um:

| Situação do PR | O que fazer |
|---|---|
| CI ✓ e é *patch*/*minor*, ou é *action* do GitHub | ler o resumo do PR → *Squash and merge* |
| CI ✗ (ex.: `typescript` 6→7 quebrando o `nest build`) | fechar com o comentário `@dependabot ignore this major version` |
| CI ✓ mas não faz sentido (ex.: `@types/node` 26 num projeto Node 24) | fechar com o mesmo comentário |
| Dois PRs de pacotes que andam juntos (`vitest` e `@vitest/coverage-v8`) | fechar os dois; com o grupo `vitest` do `dependabot.yml` (0.6) eles voltam num PR só |

Com o `dependabot.yml` do 0.6 completo, os três últimos casos nem aparecem. Se você criou o arquivo antes
desta versão do guia (sem `ignore` e sem o grupo `vitest`), a correção é o **primeiro PR do projeto** —
um bom ensaio do rito antes da Sprint 1:

```powershell
# 📍 raiz
git switch -c chore/dependabot-config
```

Edite o `.github/dependabot.yml` igual ao do 0.6 e:

```powershell
# 📍 raiz
git add .github/dependabot.yml
git commit -m "chore(deps): group vitest and ignore node types and typescript majors"
git push -u origin chore/dependabot-config
```

O `git push` mostra o link para abrir o PR. Abra, espere o `build-test` ficar verde, *Squash and merge*.
Depois, na sua máquina:

```powershell
# 📍 raiz
git switch main
git pull
git branch -d chore/dependabot-config
```

**Daqui em diante, nada vai direto para a `main`** — nem do terminal, nem do navegador. Duas regras que
decorrem disso:

> [!CRITICO] Merge no GitHub → `git pull` antes de qualquer commit
> Todo merge (seu ou do Dependabot) acontece **no GitHub**: a sua `main` local fica para trás sem avisar.
> Antes de começar qualquer coisa, `git switch main` e `git pull`. Commit na `main` local depois da
> proteção é sempre engano: ele não sobe (o push é recusado) e deixa a `main` local divergente
> (`git status` mostra *"ahead 1, behind N"*). Trabalho novo começa **sempre** com `git switch -c <branch>`.

> [!ATENCAO] O título do PR vira o commit da `main` — e ninguém o confere
> No *squash merge*, a mensagem do commit é o **título do PR**. O commitlint só roda no seu terminal: PR
> aberto pelo navegador (editar o README no lápis do GitHub, por exemplo) e o título que você digitar no
> GitHub **não passam por ele**. Escreva o título em Conventional Commits, com o assunto em minúsculas:
> `docs: update readme title`, e não `docs: Update title README.md` (o commitlint recusaria esse).

### Como deve ficar no fim da Sprint 0

```text
cockpit/
├── .github/
│   ├── dependabot.yml
│   └── workflows/ci.yml
├── .husky/               commit-msg · pre-commit
├── .vscode/extensions.json
├── apps/
│   ├── api/              NestJS 12 (ESM, Vitest, oxlint)
│   └── web/              React + Vite 8
├── docs/adr/             0001 · 0002
├── .editorconfig  .gitattributes  .gitignore  .lintstagedrc.json  .nvmrc  .prettierrc
├── commitlint.config.mjs
├── LICENSE               MIT
├── package.json          workspaces + scripts build · lint · test · dev
├── package-lock.json     UM só, na raiz
└── README.md             esqueleto preenchido (nunca vazio)
```

E no GitHub — confira item por item antes de abrir a Sprint 1:

- [ ] repositório **público** no GitHub pessoal, licença **MIT** reconhecida (aparece em *About*)
- [ ] todos os commits com o seu nome e o e-mail que você escolheu expor (`git log --format="%an <%ae>"`)
- [ ] aba *Actions*: último `ci` da `main` verde
- [ ] *Settings → General*: só squash merge; "Automatically delete head branches" marcado
- [ ] labels `feat`, `bug`, `chore`, `docs`
- [ ] milestones `Sprint 1` a `Sprint 10`; Project `Cockpit` ligado ao repositório; issue da Sprint 1 aberta
- [ ] ruleset `main` ativo: PR obrigatório, `build-test` obrigatório, sem *bypass*
- [ ] nenhum PR do Dependabot esquecido: cada um com merge ou fechado com motivo

```powershell
# 📍 raiz
npm run lint
npm run build
npm run test
git status
```

Os três primeiros sem erro e o `git status` dizendo *nothing to commit, working tree clean*.

### Problemas comuns na Sprint 0

| Sintoma | Causa | Correção |
|---|---|---|
| `npm error No workspaces found: --workspace=apps/api` | o terminal não está na raiz | `Get-Location` para ver onde está; volte para a pasta `cockpit` e repita |
| `mkdir`: "não é possível localizar um parâmetro posicional que aceite o argumento" | PowerShell não aceita vários nomes separados por espaço | `mkdir apps, docs, docs\adr` |
| "O token '&&' não é um separador de instruções válido" | PowerShell 5.1 não tem `&&` | um comando por linha |
| A API apareceu fora de `apps\api` | `nest new` sem `--directory` ou fora da raiz | mova a pasta para `apps\api` e rode `npm install` na raiz |
| `npm error No workspaces found: --workspace=.` | `-w .` na instalação da raiz | instale sem `-w` |
| `'concurrently' não é reconhecido` | script `dev` antes de instalar o pacote | faça o 0.5 passo 1 antes de usar `npm run dev` |
| `git commit`: "Please tell me who you are" | sem `user.name`/`user.email` | configure no repositório (0.1), sem `--global` |
| prettier: "YAML Error ... Implicit keys need to be on a single line" | linha de comentário dentro do `.prettierrc` | JSON não aceita comentário: apague a linha |
| lint-staged: "Failed to restore unstaged changes" | sem `.gitattributes`, o Git converteu para CRLF | `.gitattributes` com `eol=lf`, depois `git add --renormalize .` |
| `git status` mostra `node_modules` ou `*.tsbuildinfo` | faltou o `.gitignore` da raiz | crie o `.gitignore` (0.2); se já commitou: `git rm -r --cached node_modules` |
| build falha com `TS2835: Relative import paths need explicit file extensions` | import sem `.js` no ESM | import relativo sempre com `.js` |
| `git push`: "Updates were rejected because the remote contains work that you do not have locally" | repositório criado no GitHub com README ou licença | `git pull --rebase origin main`, depois `git push -u origin main` (0.7, passo 4) |
| `git push`: "Changes must be made through a pull request" | a `main` está protegida (é o esperado depois do 0.7) | branch nova (`git switch -c chore/<assunto>`), push dela e PR |
| `git status`: *"Your branch and 'origin/main' have diverged"* / *"ahead 1, behind N"* | commit feito na `main` local depois de merges no GitHub, sem `git pull` antes | veja o que o commit local tem (`git show --stat HEAD`). Se já está na `main` remota (`git diff origin/main HEAD -- <arquivo>` vazio), descarte: `git reset --hard origin/main`. Se tem trabalho novo: `git switch -c <branch>`, `git push -u origin <branch>`, PR; depois `git switch main` e `git reset --hard origin/main` |
| PR do Dependabot `typescript` 6→7 com CI vermelho: "does not expose the programmatic compiler API that the Nest CLI requires" | o TypeScript 7.0 não traz a API do compilador que o `nest build` usa | fechar o PR com `@dependabot ignore this major version`; `ignore` no `dependabot.yml` (0.6) |
| Um commit levou arquivos de outro passo (README dentro do `chore(web)`, por exemplo) | `git add -A` sem olhar o `git status` | depois do push, não reescreva: anote a lição. Antes do push, `git reset --soft HEAD~1` e refaça os commits |
| ADR ou README com acento quebrado (`decisÃµes`) no GitHub | arquivo gravado em ANSI pelo PowerShell | crie e edite pelo VS Code (UTF-8); se já gravou, *Reopen with Encoding → Windows 1252* e *Save with Encoding → UTF-8* |
| *"Node.js 20 is deprecated"* nas anotações do CI | `actions/checkout@v4` e `setup-node@v4` | `@v7` (0.6), ou o merge dos PRs do Dependabot dessas *actions* |

## Sprint 1 — Base da API

**Objetivo:** API com configuração validada, Prisma, Swagger, logs, health e erros padronizados.
**Branch:** `feat/api-foundation`

> [!OK] Provado em 31/10/2026
> Tudo desta sprint foi executado com Nest 12.0.11, Prisma 7.10.1 e Vitest 4 contra um Postgres local:
> 2 de 2 e2e (`/health` e 404 em problem+json), `openapi.json` exportado, lint limpo.
> Provado de novo em 11/11/2026 com Vitest 5 e o banco no Neon, já com as correções da v1.4: os mesmos 2 de 2,
> mais o 503 do health com o corpo do Terminus e o log do erro 500.

> [!CRITICO] A partir daqui: dois terminais fixos
> No VS Code, deixe **dois terminais** abertos e renomeie as abas (clique direito → *Rename*):
> - **raiz** — fica na pasta `cockpit`. Roda `npm i -w ...`, `npm run ... -w ...`, `git`.
>   O `-w apps/api` só funciona aqui.
> - **api** — criado com `cd apps/api` uma única vez. Roda `nest g ...` e `npx prisma ...`, que precisam
>   do `nest-cli.json` e do `prisma7.config.ts` que moram lá.
>
> Todo bloco começa com `# 📍 raiz` ou `# 📍 api`: rode no terminal com esse nome. Nenhum bloco usa `cd`.

### 1.1 Configuração validada

```powershell
# 📍 raiz
npm i -w apps/api @nestjs/config joi class-validator class-transformer
```

> [!ATENCAO] `class-validator` e `class-transformer` já nesta sprint
> O `ValidationPipe` global (1.3) exige os dois pacotes. Sem eles, a API **sobe e morre** com
> *"The class-validator package is missing"* — testado.

Arquivo `apps/api/src/config/env.validation.ts`:

```ts
import Joi from 'joi';

export const envValidation = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_TTL: Joi.string().default('15m'),
  REFRESH_TTL_DAYS: Joi.number().default(30),
  WEB_ORIGIN: Joi.string().uri().required(),
});
```

Crie `apps/api/.env` (fora do git) com `DATABASE_URL` (o branch `dev` do Neon), `JWT_ACCESS_SECRET`
(32+ caracteres aleatórios) e `WEB_ORIGIN=http://localhost:5173`, e `apps/api/.env.example` **com os
nomes e sem valores** — esse vai para o git.

### 1.2 Prisma

```powershell
# 📍 raiz — versões FIXAS (-E), as três iguais
npm i -w apps/api -E @prisma/client@7.10.1 @prisma/adapter-pg@7.10.1
npm i -D -w apps/api -E prisma@7.10.1
npm i -D -w apps/api dotenv
```

> [!CRITICO] Não instale o Prisma "latest"
> Em 31/10/2026 a tag `latest` do pacote `prisma` (o CLI) aponta para **8.0.0-rc.29**, uma versão de teste
> publicada na véspera, enquanto o `@prisma/client` está em 7.10.1. `npm i -D prisma` sem versão deixa
> CLI e client desalinhados, e `npx prisma` sem o pacote instalado baixa a RC. Fixe as três em 7.10.1;
> o Dependabot avisa quando a 8 sair de verdade.

Abra agora o terminal **api** (`cd apps/api`, uma vez só) e, nele:

```powershell
# 📍 api
npx prisma init --datasource-provider postgresql --output ../src/generated/prisma
```

O que o `prisma init` 7.10 cria — e o que fazer:

| Criado | O que fazer |
|---|---|
| `prisma/schema.prisma` | mantém (já vem com `provider = "prisma-client"` e o `output` certo) |
| `prisma7.config.ts` | mantém — é o arquivo de configuração do CLI (lê o `.env` com `dotenv`) |
| `.gitignore` em `apps/api` | mantém (ignora `.env` e `src/generated/prisma`) |
| `.env` com um `DATABASE_URL` de exemplo | troque pelo do Neon |
| `.agents/`, `.claude/`, `.windsurf/`, `skills-lock.json` | "skills" para assistentes de IA — **apague** (não fazem parte do produto) |

Acrescente no `apps/api/package.json` o script `"postinstall": "prisma generate"` e crie o módulo de
infraestrutura **com a CLI**:

```powershell
# 📍 api
nest g module core/prisma
nest g service core/prisma --no-spec
```

`src/core/prisma/prisma.service.ts`:

```ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(config: ConfigService) {
    super({ adapter: new PrismaPg({ connectionString: config.getOrThrow<string>('DATABASE_URL') }) });
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

`src/core/prisma/prisma.module.ts`:

```ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Global()
@Module({ providers: [PrismaService], exports: [PrismaService] })
export class PrismaModule {}
```

```powershell
# 📍 api
npx prisma generate      # gera o client em src/generated/prisma
```

> [!ATENCAO] Prisma 7: `migrate dev` não roda mais o `generate`
> Depois de **toda** migration, rode `npx prisma generate`. Sem isso o TypeScript não enxerga o modelo
> novo (testado: o enum `TaskStatus` só apareceu depois do `generate`).

### 1.3 Bootstrap

```powershell
# 📍 raiz
npm i -w apps/api @nestjs/swagger helmet cookie-parser nestjs-pino pino-http
npm i -D -w apps/api @types/cookie-parser pino-pretty
```

A configuração do app fica num arquivo só, usado pelo `main.ts`, pelos testes e2e e pelo export do
contrato — assim o teste sobe o app **igual** à produção. `src/app.setup.ts`:

```ts
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

export function setupApp(app: INestApplication) {
  const config = app.get(ConfigService);
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({ origin: config.getOrThrow<string>('WEB_ORIGIN'), credentials: true });
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableShutdownHooks();
  return app;
}

export function buildOpenApi(app: INestApplication) {
  return SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('Cockpit API').setVersion('1.0').addBearerAuth().build(),
    {
      // AuthController.login → "authLogin" → no front vira useAuthLogin()
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        controllerKey.replace(/Controller$/, '').replace(/^./, (c) => c.toLowerCase()) +
        methodKey.replace(/^./, (c) => c.toUpperCase()),
    },
  );
}
```

> [!INFO] Por que o `operationIdFactory`?
> O orval (Sprint 4) nomeia os hooks pelo `operationId`. O padrão do Nest gera
> `useAuthControllerLoginV1`; com a fábrica sai `useAuthLogin`, `useUsersMe`, `useWorkspacesFindAll`.

`src/main.ts`:

```ts
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module.js';
import { buildOpenApi, setupApp } from './app.setup.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  setupApp(app);
  SwaggerModule.setup('docs', app, buildOpenApi(app));
  await app.listen(app.get(ConfigService).get<number>('PORT', 3000));
}
await bootstrap();
```

`src/app.module.ts` (o `LoggerModule` é obrigatório: o `main.ts` pede o `Logger` dele):

```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: envValidation }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV === 'production' ? undefined : { target: 'pino-pretty' },
        autoLogging: process.env.NODE_ENV !== 'test',
      },
    }),
    PrismaModule,
  ],
})
export class AppModule {}
```

> [!ATENCAO] O `AppModule` cresce por partes (corrigido na v1.3)
> Aqui ele só registra o que **já existe**. O filtro de erros entra na seção 1.4 e o `HealthModule` na 1.5,
> quando as peças nascerem. Se o compilador reclamar de algo que ainda não foi criado, o passo está fora de
> ordem: nunca crie uma classe vazia só para o erro sumir. Apague também os arquivos de exemplo da CLI
> (`app.controller.ts`, `app.service.ts`, `app.controller.spec.ts`, `test/app.e2e-spec.ts`) e tire o
> `AppController` do módulo, ou a API não sobe.

Ligue o **plugin do Swagger na CLI** no `apps/api/nest-cli.json` (o plugin lê os tipos dos DTOs e dispensa
quase todos os `@ApiProperty`):

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": [
      { "name": "@nestjs/swagger", "options": { "introspectComments": true, "classValidatorShim": true } }
    ]
  }
}
```

Export do contrato — `src/openapi-export.ts`:

```ts
import { writeFileSync } from 'node:fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { buildOpenApi, setupApp } from './app.setup.js';

// Gera openapi.json na raiz do repositório sem abrir porta (dist/ → apps/api → apps → raiz).
const app = await NestFactory.create(AppModule, { logger: false });
setupApp(app);
writeFileSync(new URL('../../../openapi.json', import.meta.url), JSON.stringify(buildOpenApi(app), null, 2) + '\n');
await app.close();
```

Scripts: no `apps/api/package.json`, `"openapi:export": "nest build && node dist/openapi-export.js"`
(projeto ESM: nada de `ts-node`); no `package.json` da raiz,
`"api:gen": "npm run openapi:export -w apps/api && npm run api:gen -w apps/web"` (o lado web vem na Sprint 4).

### 1.4 Erros padronizados (RFC 9457)

```powershell
# 📍 api
nest g filter common/filters/problem-details --flat --no-spec
```

```ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';

function messageOf(body: unknown): string {
  if (typeof body === 'string') return body;
  if (body && typeof body === 'object' && 'message' in body) {
    const m = (body as { message: unknown }).message;
    return Array.isArray(m) ? m.join('; ') : String(m);
  }
  return 'Unexpected error';
}

// O Terminus lança 503 com o resultado do health check no corpo: { status, info, error, details }.
function isHealthResult(body: unknown): body is Record<string, unknown> {
  return typeof body === 'object' && body !== null && 'status' in body && 'details' in body;
}

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemDetailsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request & { id?: string }>();
    const res = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const body = exception instanceof HttpException ? exception.getResponse() : undefined;

    // Health check que falhou: devolve o corpo do Terminus, que diz QUAL indicador caiu.
    if (isHealthResult(body)) {
      res.status(status).json(body);
      return;
    }
    // Erro 5xx é defeito nosso: sem este log ele some (o cliente só vê "Unexpected error").
    if (status >= 500) this.logger.error(exception);

    res.status(status).type('application/problem+json').json({
      type: 'about:blank',
      title: HttpStatus[status] ?? 'Error',
      status,
      detail: messageOf(body),
      instance: req.originalUrl, // req.url perde o prefixo /api (testado)
      requestId: req.id,
    });
  }
}
```

Agora registre no `AppModule`, acrescentando a linha de `providers` (o `APP_FILTER` vem de `@nestjs/core`):

```ts
  providers: [{ provide: APP_FILTER, useClass: ProblemDetailsFilter }],
```

Registrado assim ele recebe injeção de dependência, ao contrário do `app.useGlobalFilters`.

> [!INFO] Dois desvios de propósito (v1.4)
> **O log do 5xx.** Um filtro `@Catch()` engole tudo: sem o `this.logger.error`, um defeito em produção
> responde "Unexpected error" e não deixa rastro nenhum. O 4xx não é logado como erro, porque é o cliente
> que errou. O `Logger` do Nest escreve pelo pino, graças ao `app.useLogger` do `main.ts`.
> **O corpo do health.** Quando o health check falha, o Terminus lança um 503 cujo corpo é o resultado
> (`error.database.status: "down"`). Convertido em problem+json ele virava "Unexpected error" e escondia
> qual indicador caiu; por isso passa direto, no formato que o próprio Swagger do `/health` anuncia.
Faça depois um `PrismaExceptionFilter`: `P2002` (único violado) → 409 e `P2025` (não encontrado) → 404.

### 1.5 Health

```powershell
# 📍 raiz
npm i -w apps/api @nestjs/terminus
# 📍 api
nest g module core/health
nest g controller core/health
```

```ts
// src/core/health/health.module.ts
@Module({ imports: [TerminusModule], controllers: [HealthController] })
export class HealthModule {}
```

```ts
// src/core/health/health.controller.ts
@Controller({ path: 'health', version: VERSION_NEUTRAL }) // sem isso vira /v1/health (testado)
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('database', this.prisma).withTimeout(3000)]);
  }
}
```

O `nest g module` já acrescenta o `HealthModule` aos `imports` do `AppModule`. Confira com `git status` e
veja se o import ficou com `.js` no fim. Com a API rodando, `http://localhost:3000/health` devolve 200.

> [!ATENCAO] Por que `.withTimeout(3000)` (v1.4)
> O limite padrão do ping é **1 segundo**. O banco do plano gratuito do Neon hiberna depois de alguns
> minutos parado e leva mais que isso para acordar: a primeira chamada devolvia **503** e as seguintes 200
> (medido em 11/11/2026: 503 na primeira, depois 432 ms e ~55 ms). Com 3 s a primeira chamada já passa. Se
> ainda assim vier um 503 isolado depois de um tempo parado, chame de novo antes de procurar defeito.

### 1.6 Testes desta sprint

Esta seção tem **seis passos**, e a sprint só fecha com os seis feitos. É a mais longa da sprint
(~3 sessões): não é só "rodar os testes".

| Passo | O que você cria ou altera |
|---|---|
| 1 | `src/core/health/health.controller.spec.ts` — o spec gerado vira teste de verdade |
| 2 | `test/utils/app.ts` e `vitest.config.e2e.ts` — a base dos e2e |
| 3 | `test/health.e2e-spec.ts` — **arquivo novo** |
| 4 | `test/problem-details.e2e-spec.ts` — **arquivo novo** |
| 5 | `openapi.json` regerado (`npm run api:gen`) |
| 6 | `.github/workflows/ci.yml` com Postgres, depois o Pull Request |

**Passo 1 — o teste unitário.** **O spec que a CLI gerou vai quebrar** — `nest g controller` cria um `health.controller.spec.ts` que só
registra o controller, e o controller agora depende de três serviços. É normal no dia a dia: **todo spec
gerado vira teste de verdade ou é apagado**, nunca fica quebrado. Versão de verdade, com mocks do Vitest:

```ts
describe('HealthController', () => {
  let controller: HealthController;
  const health = { check: vi.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useValue: health },
        { provide: PrismaHealthIndicator, useValue: { pingCheck: vi.fn() } },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();
    controller = module.get(HealthController);
  });

  it('delegates to the health check service', () => {
    health.check.mockReturnValue('ok');
    expect(controller.check()).toBe('ok');
  });
});
```

Se sobrar no topo do arquivo o `TestingModule` que a CLI importou, apague: o lint acusa import sem uso.

**Passo 2 — a base dos e2e.** Utilitário `test/utils/app.ts` (usado em todas as sprints):

```ts
export async function createTestApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  const app = moduleRef.createNestApplication();
  setupApp(app); // mesmos pipes, prefixo e versionamento do main.ts
  await app.init();
  return app;
}
```

E no `vitest.config.e2e.ts`, `fileParallelism: false` dentro de `test`: as suítes e2e compartilham um banco
e cada uma faz `TRUNCATE` no começo — em paralelo, uma apaga os dados da outra.

> [!CRITICO] Os dois arquivos a seguir não existem: você cria
> A CLI não gera teste e2e para o health nem para o filtro, e o `test/app.e2e-spec.ts` de exemplo foi
> apagado na 1.3. Sem os passos 3 e 4, `npm run test:e2e -w apps/api` termina com **"No test files found"
> e código 1** — e o CI falha no último passo. O nome tem que terminar em `.e2e-spec.ts`: é o que o
> `include` do `vitest.config.e2e.ts` procura.

**Passo 3 — e2e do health.** Crie `test/health.e2e-spec.ts`:

```ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './utils/app.js';

describe('GET /health (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close(); // fecha a conexão com o banco; sem isso o Vitest não termina
  });

  it('returns 200 with the database up', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);
    expect(res.body.info.database.status).toBe('up');
  });
});
```

**Passo 4 — e2e do filtro de erros.** Crie `test/problem-details.e2e-spec.ts`. A casca (`describe`,
`beforeAll`, `afterAll`) é a mesma do passo 3; muda o teste:

```ts
  it('answers an unknown route with 404 in application/problem+json', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/nada')
      .expect(404)
      .expect('Content-Type', /application\/problem\+json/);
    expect(res.body).toMatchObject({ status: 404, instance: '/api/v1/nada' });
  });
```

Antes de rodar, **preveja**: quantos arquivos e quantos testes o Vitest vai contar? Depois confira:

```powershell
# 📍 raiz
npm run test -w apps/api        # 1 arquivo, 1 teste
npm run test:e2e -w apps/api    # 2 arquivos, 2 testes (usa o banco do seu .env)
```

**Passo 5 — contrato em dia.** O `openapi.json` commitado na 1.3 foi exportado quando a API ainda não
tinha rota nenhuma (`"paths": {}`). Agora existe o `/health`:

```powershell
# 📍 raiz
npm run api:gen
git diff --stat openapi.json    # tem que mostrar o /health entrando
```

Confira também que não sobrou gerado de exemplo: `app.controller.ts`, `app.service.ts` e o spec deles.

**Passo 6 — CI com banco.** Agora que existe Prisma, o CI precisa de um Postgres. O bloco `services`
entra **dentro do job** (`build-test`), no mesmo nível do `runs-on` e do `steps`; na raiz do arquivo o
GitHub rejeita o workflow inteiro e nenhum check aparece no PR. O arquivo completo fica assim:

```yaml
name: ci
on:
  pull_request:
  push: { branches: [main] }
jobs:
  build-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:17
        env:
          POSTGRES_USER: cockpit
          POSTGRES_PASSWORD: cockpit
          POSTGRES_DB: cockpit_test
        ports: ['5432:5432']
        options: >-
          --health-cmd pg_isready --health-interval 5s --health-timeout 5s --health-retries 10
    env:
      DATABASE_URL: postgresql://cockpit:cockpit@localhost:5432/cockpit_test
      JWT_ACCESS_SECRET: ci-only-secret-with-at-least-32-chars!!
      WEB_ORIGIN: http://localhost:5173
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version-file: .nvmrc, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test
      - run: npm exec -w apps/api -- prisma migrate deploy
      - run: npm run test:e2e -w apps/api
```

> [!ATENCAO] YAML não avisa erro de digitação
> Três erros que o editor aceita calado e só o CI acusa: `services` fora do job (workflow inválido),
> `--health-restries` no lugar de `--health-retries` (o contêiner do Postgres não sobe) e
> `JWT_ACESS_SECRET` com um C a menos (o Joi da 1.1 derruba a API: *"JWT_ACCESS_SECRET is required"*).
> Confira os nomes das variáveis contra o `env.validation.ts`, letra por letra.

Faça o push, abra o **Pull Request** com `Closes #<número da issue da Sprint 1>` na descrição, espere o
check `build-test` ficar verde, revise o seu PR e faça o *squash merge*.

#### Como deve ficar no fim da Sprint 1

- [ ] `npm run lint` sem aviso, `npm run build` e `npm run test` (1 teste) passam
- [ ] `npm run test:e2e -w apps/api` passa com **2 arquivos, 2 testes**
- [ ] `GET /health` devolve 200 com o banco `up`; `GET /api/v1/nada` devolve 404 em problem+json
- [ ] `openapi.json` tem o caminho `/health`
- [ ] `apps/api/.env.example` lista **todas** as variáveis do `env.validation.ts`, sem valores
- [ ] CI verde no PR, *squash merge* na `main`, branch apagada, issue da sprint fechada
- [ ] No Dojo, a missão 1.6 só é concluída depois disso tudo

**Commits sugeridos:** `feat(api): validate env with joi` · `feat(api): add prisma module` ·
`feat(api): configure bootstrap, swagger and logging` · `feat(api): add problem details filter` ·
`feat(api): add health check`

## Sprint 2 — Users e Auth

**Objetivo:** cadastro, login, refresh rotativo, logout e todas as rotas protegidas por padrão.
**Branch:** `feat/auth`

> [!OK] Provado em 31/10/2026
> 6 de 6 unitários e 8 de 8 e2e: login → `/users/me`, 401 sem token, mesma mensagem para senha errada e
> e-mail inexistente, reuso de refresh derrubando a família, 400 com campo extra, 429 no 6º login.

### 2.1 Modelos

Escreva `User` e `Session` no `schema.prisma` (documento 1, seção Modelo de dados). **Só os campos de
relação que já existem**: em `User`, deixe apenas `sessions Session[]` — `workspaces`, `tasks` e os demais
entram quando os modelos deles chegarem (o Prisma recusa relação para modelo que não existe).

```powershell
# 📍 api
npx prisma migrate dev --name init_users_sessions
npx prisma generate
```

Leia o SQL gerado em `prisma/migrations/<data>_init_users_sessions/migration.sql`. **Sempre** leia — é
lá que você descobre índice faltando. (Testado: `uuid(7)` e `@db.Timestamptz` saem como `UUID` e `TIMESTAMPTZ`.)

> [!INFO] Se aparecer `P3006` / `relation "User" already exists`
> O `migrate dev` usa um *shadow database* para comparar o schema. Se o provedor não deixar o Prisma criar
> esse banco sozinho, crie um terceiro branch no Neon (`shadow`) e aponte para ele no `prisma7.config.ts`:
> `datasource: { url: process.env['DATABASE_URL'], shadowDatabaseUrl: process.env['SHADOW_DATABASE_URL'] }`.

### 2.2 Gerar os módulos

```powershell
# 📍 raiz
npm i -w apps/api @nestjs/jwt argon2 @nestjs/throttler @nestjs/event-emitter
npm i -D -w apps/api vitest-mock-extended
# 📍 api
nest g module modules/users
nest g service modules/users
nest g controller modules/users
nest g module modules/auth
nest g service modules/auth
nest g controller modules/auth
nest g guard modules/auth/guards/jwt-auth --flat
nest g decorator common/decorators/public --flat
nest g decorator common/decorators/current-user --flat
```

> [!INFO] Aviso `npm warn allow-scripts ... argon2`
> O npm 11 não roda scripts de instalação sem aprovação. O argon2 já traz o binário pronto para Windows
> (`win32-x64`) e funciona mesmo assim — testado. Não precisa aprovar nada.

> [!INFO] Por que não `nest g resource` aqui?
> Auth não é CRUD: não tem "listar logins". O `resource` geraria cinco rotas que você apagaria. Escolher
> o gerador certo é parte do rito.

### 2.3 Peças centrais

```ts
// src/common/decorators/public.decorator.ts
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// src/common/decorators/current-user.decorator.ts
export type AuthUser = { id: string; email: string };
export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): AuthUser => ctx.switchToHttp().getRequest<{ user: AuthUser }>().user,
);
```

```ts
// src/modules/auth/guards/jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [ctx.getHandler(), ctx.getClass()]);
    if (isPublic) return true;

    const req = ctx.switchToHttp().getRequest<Request & { user?: AuthUser }>();
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) throw new UnauthorizedException();
    try {
      const payload = await this.jwt.verifyAsync<{ sub: string; email: string }>(token);
      req.user = { id: payload.sub, email: payload.email };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
```

```ts
// src/modules/auth/auth.module.ts — o JwtModule precisa ser GLOBAL: o guard global usa o JwtService
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        signOptions: { expiresIn: config.get<StringValue>('JWT_ACCESS_TTL', '15m') }, // StringValue vem de 'ms'
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```

```ts
// app.module.ts (trecho)
imports: [
  // ...
  ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
  EventEmitterModule.forRoot(),
],
providers: [
  { provide: APP_FILTER, useClass: ProblemDetailsFilter },
  { provide: APP_GUARD, useClass: ThrottlerGuard }, // primeiro: barra força bruta antes de validar token
  { provide: APP_GUARD, useClass: JwtAuthGuard },   // protegido por padrão; @Public() abre exceção
],
```

> [!ATENCAO] Agora o `/health` dá 401
> O guard global protege tudo, inclusive o health — testado. Ponha `@Public()` no `check()` do
> `HealthController` nesta sprint (na Sprint 1 o decorator ainda não existia).

### 2.4 Refresh rotativo (o coração da sprint)

```ts
// auth.service.ts (trecho)
const sha256 = (v: string) => createHash('sha256').update(v).digest('hex');

async register(dto: RegisterDto, userAgent?: string) {
  if (await this.users.findByEmail(dto.email)) throw new ConflictException('E-mail já cadastrado.');
  const user = await this.users.create({ email: dto.email, name: dto.name, passwordHash: await argon2.hash(dto.password) });
  await this.events.emitAsync('user.registered', { userId: user.id }); // ESPERA o workspace Pessoal (RN-01)
  return this.issueTokens(user, randomUUID(), userAgent);
}

async login(dto: LoginDto, userAgent?: string) {
  const user = await this.users.findByEmail(dto.email);
  if (!user || !(await argon2.verify(user.passwordHash, dto.password))) {
    throw new UnauthorizedException('Credenciais inválidas'); // mesma mensagem nos dois casos
  }
  return this.issueTokens(user, randomUUID(), userAgent); // nova família
}

async refresh(rawToken: string) {
  const session = await this.prisma.session.findUnique({ where: { tokenHash: sha256(rawToken) } });
  if (!session || session.expiresAt < new Date()) throw new UnauthorizedException();
  if (session.revokedAt) {
    // REUSO: alguém usou um token já trocado — derruba a família inteira
    await this.prisma.session.updateMany({ where: { familyId: session.familyId }, data: { revokedAt: new Date() } });
    throw new UnauthorizedException();
  }
  await this.prisma.session.update({ where: { id: session.id }, data: { revokedAt: new Date() } });
  const user = await this.users.findByIdOrThrow(session.userId);
  return this.issueTokens(user, session.familyId, session.userAgent ?? undefined); // mesma família
}

private async issueTokens(user: { id: string; email: string }, familyId: string, userAgent?: string) {
  const accessToken = await this.jwt.signAsync({ sub: user.id, email: user.email });
  const refreshToken = randomBytes(32).toString('base64url');
  const days = this.config.get<number>('REFRESH_TTL_DAYS', 30);
  await this.prisma.session.create({
    data: { userId: user.id, familyId, tokenHash: sha256(refreshToken), userAgent, expiresAt: new Date(Date.now() + days * 86_400_000) },
  });
  return { accessToken, refreshToken };
}
```

> [!ATENCAO] `emitAsync`, não `emit`
> `emit()` não espera o ouvinte: a resposta do cadastro voltava **antes** do workspace *Pessoal* existir e
> o teste pegava a lista vazia (testado na Sprint 3). Com `await emitAsync(...)` e
> `@OnEvent('user.registered', { promisify: true })` no ouvinte, o cadastro só responde depois.

O refresh vai em cookie, nunca no corpo — e **o retorno do controller tem que ser uma classe**, senão o
Swagger documenta a resposta como vazia e o front recebe `void` (testado na Sprint 4):

```ts
// dto/auth.dto.ts
export class LoginDto {
  @IsEmail() email: string;
  @IsString() @MinLength(8) password: string;
}
export class RegisterDto extends LoginDto {
  @IsString() @Length(1, 80) name: string;
}
export class AccessTokenDto {
  /** JWT de acesso, válido por 15 minutos */
  accessToken: string;
}
```

```ts
// auth.controller.ts (trecho)
const cookieOptions: CookieOptions = {
  httpOnly: true, secure: true, sameSite: 'strict', path: '/api/v1/auth', maxAge: 30 * 86_400_000,
};

@Public()
@Throttle({ default: { limit: 5, ttl: 60_000 } })
@Post('login')
@HttpCode(200)
async login(
  @Body() dto: LoginDto,
  @Req() req: Request,
  @Res({ passthrough: true }) res: Response,
): Promise<AccessTokenDto> {
  const { accessToken, refreshToken } = await this.auth.login(dto, req.headers['user-agent']);
  res.cookie('rt', refreshToken, cookieOptions);
  return { accessToken };
}
// register (201) e refresh (200, lê req.cookies.rt) seguem o mesmo molde; logout (204) revoga e limpa o cookie
```

### 2.5 Testes

Os specs gerados de `users.*` e `auth.controller` ("should be defined") quebram por falta de
dependências — transforme em teste de verdade ou apague. O do `AuthService`, com `vitest-mock-extended`:

```ts
describe('AuthService', () => {
  let service: AuthService;
  let prisma: DeepMockProxy<PrismaService>;
  let users: DeepMockProxy<UsersService>;

  beforeEach(async () => {
    prisma = mockDeep<PrismaService>();
    users = mockDeep<UsersService>();
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: UsersService, useValue: users },
        { provide: JwtService, useValue: mockDeep<JwtService>() },
        { provide: ConfigService, useValue: mockDeep<ConfigService>() },
        { provide: EventEmitter2, useValue: mockDeep<EventEmitter2>() },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('refresh: token já revogado derruba a família inteira', async () => {
    prisma.session.findUnique.mockResolvedValue({
      id: 's1', userId: 'u1', familyId: 'f1', tokenHash: 'h', userAgent: null,
      expiresAt: new Date(Date.now() + 60_000), revokedAt: new Date(), createdAt: new Date(),
    });
    await expect(service.refresh('velho')).rejects.toThrow(UnauthorizedException);
    expect(prisma.session.updateMany).toHaveBeenCalledWith({
      where: { familyId: 'f1' },
      data: { revokedAt: expect.any(Date) },
    });
  });
});
```

| Tipo | Caso |
|---|---|
| unit | `login` com senha errada e com e-mail inexistente dá a **mesma** exceção |
| unit | `refresh` com token revogado revoga a família inteira |
| unit | `JwtAuthGuard`: libera `@Public()`, recusa sem Bearer, põe `req.user` com token válido |
| e2e | register → login → `GET /users/me` com Bearer → 200, sem `passwordHash` na resposta |
| e2e | `GET /users/me` sem token → 401 em problem+json |
| e2e | refresh duas vezes com o **mesmo** cookie → a segunda falha e a sessão nova também morre |
| e2e | campo extra no corpo → 400 |
| e2e | 6 logins em 1 minuto → 429 |

Cada suíte e2e limpa o banco no `beforeAll`: `await app.get(PrismaService).$executeRawUnsafe('TRUNCATE "Session", "User" CASCADE')`.

**ADR:** `0005-jwt-memory-refresh-cookie.md`.

## Sprint 3 — Workspaces, Tasks, Tags e captura rápida

**Objetivo:** o núcleo do domínio, gerado no rito clássico do Nest.
**Branch:** `feat/tasks` (pode quebrar em três PRs: workspaces, tasks, quick-add)

> [!OK] Provado em 31/10/2026
> `nest g resource`, evento `user.registered` criando o *Pessoal*, isolamento 404 entre usuários, UUID v7
> no `ParseUUIDPipe` e no `@IsUUID('7')`, máquina de status com o enum do Prisma e `fractional-indexing`.
> 10 de 10 unitários e 11 de 11 e2e, iguais em duas execuções seguidas.

### 3.1 A receita `nest g resource`

```powershell
# 📍 api
nest g resource modules/workspaces
# ? What transport layer do you use?  REST API
# ? Would you like to generate CRUD entry points?  Yes
# (sem perguntas: nest g resource modules/workspaces --type rest --crud)
```

A CLI gera módulo, controller com as 5 rotas, service com métodos *stub*, `dto/create-*.dto.ts`,
`dto/update-*.dto.ts`, `entities/*.entity.ts` e dois `.spec.ts`, e registra o módulo no `AppModule`.
**O que fazer com cada arquivo gerado:**

| Arquivo gerado | O que você faz |
|---|---|
| `workspaces.module.ts` | mantém; a CLI já registrou no `AppModule` |
| `workspaces.controller.ts` | troca `+id` (number) por `@Param('id', ParseUUIDPipe) id: string`; injeta `@CurrentUser()` |
| `workspaces.service.ts` | implementa com Prisma; **todo** `where` recebe `userId` |
| `create-workspace.dto.ts` | escreve os campos com `class-validator` |
| `update-workspace.dto.ts` | mantém — já vem com `PartialType` de `@nestjs/swagger` (o plugin está instalado) |
| `entities/workspace.entity.ts` | apaga — o tipo de dado vem do Prisma; resposta documentada vira `*ResponseDto` quando precisar |
| `*.spec.ts` | escreve os testes de verdade ou apaga |

### 3.2 Workspaces

```powershell
# 📍 api — o schema ganha Workspace (e, em User, workspaces Workspace[])
npx prisma migrate dev --name add_workspaces
npx prisma generate
```

```ts
// create-workspace.dto.ts
export class CreateWorkspaceDto {
  /** Nome do contexto, ex.: Empresa, Freela */
  @IsString() @Length(1, 40) name: string;
  @IsOptional() @IsHexColor() color?: string;
}
```

```ts
// workspaces.service.ts (trecho)
findAll(userId: string) {
  return this.prisma.workspace.findMany({ where: { userId, archivedAt: null }, orderBy: { position: 'asc' } });
}
async findOne(userId: string, id: string) {
  const ws = await this.prisma.workspace.findFirst({ where: { id, userId } });
  if (!ws) throw new NotFoundException(); // RN-11: alheio = 404
  return ws;
}
@OnEvent('user.registered', { promisify: true })
async createDefault({ userId }: { userId: string }) {
  await this.prisma.workspace.create({ data: { userId, name: 'Pessoal' } });
}
```

### 3.3 Tasks

```powershell
# 📍 api — o schema ganha enum TaskStatus/TaskPriority, Task, Tag e TaskTag
npx prisma migrate dev --name add_tasks_tags
npx prisma generate
nest g resource modules/tasks --type rest --crud
nest g resource modules/tags --type rest --crud
```

**Máquina de status** — regra pura, escrita com TDD. Os enums vêm do client gerado:

```ts
// src/modules/tasks/task-status.machine.ts
import { ConflictException } from '@nestjs/common';
import { TaskStatus } from '../../generated/prisma/enums.js';

const TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  INBOX: ['TODO', 'DOING', 'DONE', 'CANCELED'],
  TODO: ['DOING', 'BLOCKED', 'DONE', 'CANCELED'],
  DOING: ['TODO', 'BLOCKED', 'DONE', 'CANCELED'],
  BLOCKED: ['TODO', 'DOING', 'CANCELED'],
  DONE: ['TODO'],
  CANCELED: ['TODO'],
};

export function assertTransition(from: TaskStatus, to: TaskStatus): void {
  if (!TRANSITIONS[from].includes(to)) {
    throw new ConflictException(`Não é possível ir de ${from} para ${to}.`);
  }
}
```

```ts
// task-status.machine.spec.ts
it.each<[TaskStatus, TaskStatus, boolean]>([
  ['INBOX', 'DONE', true],
  ['DONE', 'BLOCKED', false],
  ['BLOCKED', 'DONE', false],
  ['DONE', 'TODO', true],
])('%s → %s permitido=%s', (from, to, ok) => {
  const run = () => assertTransition(from, to);
  if (ok) expect(run).not.toThrow();
  else expect(run).toThrow(ConflictException);
});
```

**DTO de consulta** com filtros e paginação (reaproveite `PaginationQueryDto` de `common/dto`):

```ts
export class TaskQueryDto extends PaginationQueryDto {
  @IsOptional() @Transform(({ value }) => String(value).split(','))
  @IsEnum(TaskStatus, { each: true }) status?: TaskStatus[];
  @IsOptional() @IsUUID('7') workspaceId?: string;
  @IsOptional() @IsIn(['today', 'overdue', 'week']) due?: 'today' | 'overdue' | 'week';
  @IsOptional() @IsString() tag?: string;
  @IsOptional() @IsString() @MaxLength(100) q?: string;
}
```

**Transição** como rota própria — e o evento de domínio sai daqui:

```ts
// tasks.service.ts (trecho)
async changeStatus(userId: string, id: string, dto: ChangeStatusDto) {
  const task = await this.findOne(userId, id);
  assertTransition(task.status, dto.status);
  if (dto.status === 'BLOCKED' && !dto.reason) throw new BadRequestException('Informe o motivo do bloqueio.');
  const updated = await this.prisma.task.update({
    where: { id },
    data: {
      status: dto.status,
      blockedReason: dto.status === 'BLOCKED' ? dto.reason : null,
      completedAt: dto.status === 'DONE' ? new Date() : null,
    },
  });
  if (dto.status === 'DONE') await this.events.emitAsync('task.completed', { userId, taskId: id });
  if (task.status === 'DONE') await this.events.emitAsync('task.reopened', { userId, taskId: id });
  return updated;
}
```

### 3.4 Captura rápida (TDD de ponta a ponta)

```powershell
# 📍 api
nest g class modules/tasks/quick-add/quick-add.parser --flat
```

Escreva **primeiro** a tabela de testes, depois o parser. O parser é uma função pura que recebe o texto,
a data de "hoje" no fuso do usuário e as listas de workspaces/pessoas; devolve o resultado e avisos.
Não acessa banco — quem resolve nomes é o service.

```ts
// quick-add.parser.spec.ts (comece por estes e vá crescendo)
const today = '2026-10-31';  // uma sexta-feira — fixe a data, nunca use new Date() em teste
it.each([
  ['Revisar PR', { title: 'Revisar PR' }],
  ['Revisar PR !p1', { title: 'Revisar PR', priority: 'P1' }],
  ['Deploy amanhã', { title: 'Deploy', dueDate: '2026-11-01' }],
  ['Deploy seg', { title: 'Deploy', dueDate: '2026-11-02' }],
  ['Relatório 15/11 ~1h30', { title: 'Relatório', dueDate: '2026-11-15', estimateMin: 90 }],
  ['Bug #bug #urgente @empresa', { title: 'Bug', tags: ['bug', 'urgente'], workspace: 'empresa' }],
  ['POC filas >ana +3d', { title: 'POC filas', delegateTo: 'ana', dueDate: '2026-11-03' }],
  ['email do cliente #123 fechado', { title: 'email do cliente #123 fechado' }],  // #123 não é tag
])('"%s"', (text, expected) => {
  expect(parseQuickAdd(text, { today })).toMatchObject(expected);
});
```

> [!OK] Vitrine do portfólio
> Este parser, com 30+ casos em tabela e 100% de cobertura, é o arquivo que um recrutador técnico vai
> abrir. Capriche nos nomes, nos casos de borda (acentos, `amanhã`/`amanha`, data passada vira ano que
> vem) e no comentário de topo explicando a gramática.

### 3.5 Ordenação por índice fracionário

`POST /tasks/:id/move { before?: id, after?: id }` calcula um `position` entre os dois vizinhos sem
renumerar a lista (`npm i fractional-indexing`). Escreva o ADR `0007` explicando a escolha.

### 3.6 Testes obrigatórios da sprint

- e2e de **isolamento**: usuário B tenta `GET`, `PATCH`, `DELETE` e `POST /status` na tarefa de A → 404 nos quatro.
- e2e: `POST /tasks` com campo extra (`userId`) → 400 (*forbidNonWhitelisted*).
- e2e: `POST /tasks/:id/status` DONE → BLOCKED → 409 em problem+json.
- unit: parser (tabela) e máquina de status (tabela).

**Commits sugeridos:** `feat(workspaces): add crud with default workspace on register` ·
`feat(tasks): add crud with filters and cursor pagination` · `feat(tasks): add status state machine` ·
`feat(tasks): add quick-add parser and endpoints` · `feat(tags): add crud and task tagging` ·
`feat(tasks): add fractional ordering`

## Sprint 4 — Frontend: casca, login e cliente gerado

**Objetivo:** app React com design system, login funcionando e chamadas tipadas geradas do contrato.
**Branch:** `feat/web-shell`

> [!OK] Provado em 31/10/2026
> Tailwind 4 + shadcn 4.23 (Radix, 19 componentes), React Router **8.5** com rotas `lazy`, TanStack Query,
> orval 8 gerando hooks tipados do `openapi.json` real, login com React Hook Form + Zod 4, e Vitest + MSW
> (2 de 2). Build do front limpo; o lint só avisa dentro dos componentes do próprio shadcn.

> [!INFO] Versões que o npm instala hoje
> **React Router 8** (o desenho foi escrito pensando no 7 — a decisão D-06 continua: é o React Router,
> só que numa versão mais nova; a API de `createBrowserRouter` + `lazy` usada aqui funciona igual) e
> **Zod 4** (`z.email()` no lugar de `z.string().email()`).

### 4.1 Tailwind 4 e shadcn/ui

```powershell
# 📍 raiz
npm i -w apps/web tailwindcss @tailwindcss/vite
npm i -D -w apps/web @types/node
```

`apps/web/vite.config.ts` (projeto ESM: use `import.meta.dirname`, não `__dirname`):

```ts
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
  server: { proxy: { '/api': 'http://localhost:3000' } }, // mesmo site em dev: o cookie funciona
});
```

`src/index.css` passa a ter só `@import "tailwindcss";`. O alias `@/*` entra em **dois** tsconfigs, sem
`baseUrl` (o TypeScript 7 do Vite não usa mais `baseUrl`):

- `apps/web/tsconfig.json`: acrescente `"compilerOptions": { "paths": { "@/*": ["./src/*"] } }` ao lado de `files`/`references`;
- `apps/web/tsconfig.app.json`: acrescente `"paths": { "@/*": ["./src/*"] }` dentro de `compilerOptions`.

```powershell
# 📍 web (terceiro terminal, criado com cd apps/web — só para o shadcn)
npx shadcn@latest init -b radix -p nova
npx shadcn@latest add button input label card dialog sheet dropdown-menu command tooltip badge checkbox progress separator skeleton sonner tabs textarea popover calendar
```

> [!INFO] O que o shadcn 4 pergunta
> A biblioteca base (`-b`: `base`, `radix` ou `aria` — o desenho usa **radix**) e um *preset* visual
> (`-p`: Nova, Vega, Maia…). Sem as flags ele pergunta na tela. Ele instala as dependências pela raiz do
> monorepo (não cria lock em `apps/web` — testado).

Os componentes caem em `src/components/ui` e o utilitário em `src/lib/utils.ts`. **São código seu**: leia,
ajuste, mas não reescreva do zero. Em `index.css`, troque as variáveis do tema pelos **tokens de cor do
documento 1**.

> [!ATENCAO] `erasableSyntaxOnly` no front
> O template do Vite liga `erasableSyntaxOnly`: no web **não** existe `constructor(public x: T)` nem `enum`
> (testado: erro TS1294). Declare os campos da classe e use união de strings ou objeto `as const`.

### 4.2 Rotas, Query e providers

```powershell
# 📍 raiz
npm i -w apps/web react-router @tanstack/react-query @tanstack/react-query-devtools zustand react-hook-form zod @hookform/resolvers date-fns lucide-react
```

```tsx
// src/app/router.tsx
export const router = createBrowserRouter([
  { path: '/login', lazy: () => import('@/features/auth/LoginPage') },
  { path: '/register', lazy: () => import('@/features/auth/RegisterPage') },
  {
    element: <RequireAuth><AppShell /></RequireAuth>,
    children: [
      { index: true, element: <Navigate to="/today" replace /> },
      { path: 'today', lazy: () => import('@/features/today/TodayPage') },
      { path: 'inbox', lazy: () => import('@/features/tasks/InboxPage') },
      { path: 'tasks', lazy: () => import('@/features/tasks/TasksPage') },
    ],
  },
]);
```

Com `lazy`, cada página exporta uma função chamada **`Component`** (`export function Component() {...}`).

```tsx
// src/main.tsx — o TooltipProvider envolve tudo (o shadcn avisa ao instalar o tooltip)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>,
);
```

### 4.3 Cliente HTTP com refresh automático

```ts
// src/features/auth/session-store.ts — access token SÓ em memória (sem persist)
export const useSession = create<{ token: string | null; setToken: (t: string | null) => void }>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));
```

```ts
// src/api/http.ts — o orval 8 (client fetch) chama o mutator com (url, RequestInit)
let refreshing: Promise<string | null> | null = null;

export async function http<T>(url: string, init: RequestInit = {}): Promise<T> {
  const doFetch = () => {
    const token = useSession.getState().token;
    const headers = new Headers(init.headers);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetch(url, { ...init, headers, credentials: 'include' });
  };

  let res = await doFetch();
  if (res.status === 401 && !url.includes('/auth/')) {
    // uma renovação só, mesmo com várias requisições em paralelo
    refreshing ??= refreshAccessToken().finally(() => {
      refreshing = null;
    });
    if (await refreshing) res = await doFetch();
  }
  if (!res.ok) throw await ApiError.from(res); // lê o problem+json
  const data = res.status === 204 ? undefined : await res.json();
  return { data, status: res.status, headers: res.headers } as T; // formato que os hooks gerados esperam
}
```

`refreshAccessToken()` faz `POST /api/v1/auth/refresh` com `credentials: 'include'` e grava o novo token no
`useSession`. Ao abrir o app, o `RequireAuth` chama ele uma vez: com cookie válido, a sessão volta sem senha.

### 4.4 Gerar o cliente do contrato (orval)

```powershell
# 📍 raiz
npm i -D -w apps/web orval
```

```ts
// apps/web/orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
  cockpit: {
    input: '../../openapi.json',
    output: {
      mode: 'tags-split',
      target: 'src/api/generated',
      client: 'react-query',
      httpClient: 'fetch',
      override: { mutator: { path: 'src/api/http.ts', name: 'http' } },
    },
  },
});
```

Script `"api:gen": "orval"` no `apps/web/package.json`. A partir de agora: **mudou a API →
`npm run api:gen` na raiz** → o TypeScript aponta no front tudo o que quebrou. Os hooks saem com os nomes
da `operationIdFactory` da Sprint 1: `useAuthLogin()`, `useUsersMe()`, `useWorkspacesFindAll()`.

> [!ATENCAO] Hook com resposta `void`?
> É método de controller sem classe de retorno. Crie o DTO de resposta (ex.: `AccessTokenDto`), anote o
> retorno (`Promise<AccessTokenDto>`), rode `npm run api:gen` de novo.

### 4.5 Telas e testes desta sprint

- `LoginPage` e `RegisterPage` com React Hook Form + Zod, erro da API exibido no campo/toast:

```tsx
const schema = z.object({ email: z.email('E-mail inválido'), password: z.string().min(8, 'Mínimo 8 caracteres') });

export function Component() {
  const setToken = useSession((s) => s.setToken);
  const login = useAuthLogin();
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const onSubmit = form.handleSubmit(async (values) => {
    const res = await login.mutateAsync({ data: values });
    if (res.status === 200) setToken(res.data.accessToken);
  });
  // ...inputs com aria-label, mensagens com role="alert", <Button type="submit">Entrar</Button>
}
```

- `AppShell`: sidebar (navegação + workspaces com cor), topo, área de conteúdo, `<Outlet />`.
- Tema escuro/claro (classe `dark` no `<html>`, preferência salva em `localStorage` com try/catch).

**Testes do front:**

```powershell
# 📍 raiz
npm i -D -w apps/web vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom msw
```

```ts
// apps/web/vitest.config.ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({ test: { environment: 'jsdom', globals: true, setupFiles: ['./src/test/setup.ts'] } }),
);
```

```ts
// src/test/server.ts
export const server = setupServer(); // cada teste registra seus handlers com server.use(...)

// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); cleanup(); });
afterAll(() => server.close());
```

```tsx
// src/features/auth/LoginPage.test.tsx (trecho)
it('guarda o token em memória quando a API aceita', async () => {
  server.use(mock.post('*/api/v1/auth/login', () => HttpResponse.json({ accessToken: 'tok-123' })));
  renderPage(); // envolve em <QueryClientProvider client={new QueryClient()}>
  await userEvent.type(screen.getByLabelText('E-mail'), 'dev@x.dev');
  await userEvent.type(screen.getByLabelText('Senha'), 'segredo123');
  await userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
  await waitFor(() => expect(useSession.getState().token).toBe('tok-123'));
});
```

Duas configurações que o build cobra (testado): `"test": "vitest run"` nos scripts do web, e
`"vitest/globals"` em `types` no `tsconfig.app.json` — sem isso o `tsc -b` do build não conhece `describe`.

## Sprint 5 — Hoje, plano do dia e carry-over

**Objetivo:** a tela principal e os rituais de abertura e fechamento.
**Branch:** `feat/daily-plan`

### 5.1 API

> [!OK] Provado em 31/10/2026
> `@nestjs/schedule` registrando o cron `carry-over` e rodando contra o banco, `localToday`/`localHour`
> com Fortaleza, Tóquio e UTC (tabela de casos), `$transaction`, `ParseDatePipe` e as libs do front
> (dnd-kit, Recharts 3, react-markdown 10) compilando juntas. A tela e o ritual em si não foram montados.

```powershell
# 📍 raiz
npm i -w apps/api @nestjs/schedule @date-fns/tz date-fns
# 📍 api
npx prisma migrate dev --name add_daily_plans
npx prisma generate
nest g module modules/daily-plans
nest g controller modules/daily-plans
nest g service modules/daily-plans
nest g class modules/daily-plans/daily-plans.scheduler --flat --no-spec
nest g pipe common/pipes/parse-date --flat
```

Registre o agendador no `AppModule` — sem isso o `@Cron` não dispara (o guia antigo esquecia):
`imports: [..., ScheduleModule.forRoot()]`.

> [!ATENCAO] O pipe gerado não passa no lint
> `nest g pipe` cria `transform(value: any, metadata: ArgumentMetadata)`, e a regra `no-explicit-any`
> da Sprint 0 barra o commit (testado). É o rito: o gerado é ponto de partida. Versão final:
> `export class ParseDatePipe implements PipeTransform<unknown, string>` com `transform(value: unknown)`,
> que valida `^\d{4}-\d{2}-\d{2}$` e lança `BadRequestException('Data inválida: use YYYY-MM-DD.')`.

(Aqui não é `resource`: o plano é identificado pela **data**, não por id, e não tem "listar todos".)

**"Hoje" no fuso do usuário** — uma função só, usada em todo lugar:

```ts
// src/common/time/local-date.ts
import { TZDate } from '@date-fns/tz';
import { format } from 'date-fns';

export function localToday(timezone: string, now = new Date()): string {
  return format(new TZDate(now, timezone), 'yyyy-MM-dd');
}

/** Hora local (0–23): o job de carry-over procura quem está na hora 0. */
export function localHour(timezone: string, now = new Date()): number {
  return new TZDate(now, timezone).getHours();
}
```

```ts
// local-date.spec.ts — 31/10/2026 02:30 UTC é outro dia em cada fuso
const now = new Date('2026-10-31T02:30:00Z');
it.each([
  ['America/Fortaleza', '2026-10-30', 23],
  ['Asia/Tokyo', '2026-10-31', 11],
  ['UTC', '2026-10-31', 2],
])('%s → %s às %ih', (tz, day, hour) => {
  expect(localToday(tz, now)).toBe(day);
  expect(localHour(tz, now)).toBe(hour);
});
```

**Capacidade** (RN-04) calculada no service e devolvida junto com o plano:

```ts
const planned = items.reduce((sum, i) => sum + (i.task.estimateMin ?? 30), 0);
return { ...plan, capacity: { availableMin: user.workdayMinutes, plannedMin: planned, ratio: planned / user.workdayMinutes } };
```

**Carry-over por hora** (RN-05):

```ts
@Injectable()
export class DailyPlansScheduler {
  private readonly logger = new Logger(DailyPlansScheduler.name);
  constructor(private plans: DailyPlansService, private users: UsersService) {}

  @Cron('5 * * * *', { name: 'carry-over' })   // minuto 5 de toda hora; o nome deixa testar pelo SchedulerRegistry
  async carryOver() {
    const now = new Date();
    const users = await this.users.findWhoseLocalHourIs(0, now);   // quem acabou de virar o dia
    for (const u of users) await this.plans.carryOverFor(u, now);
    this.logger.log({ users: users.length }, 'carry-over done');
  }
}
```

`carryOverFor` roda numa **transação** (`prisma.$transaction`): marca os itens pendentes de ontem como
`carriedOver`, soma `carryOverCount` nas tarefas e cria o plano de hoje com elas no topo. Teste
unitário com fuso fixo (`America/Fortaleza` e `Asia/Tokyo`) e "agora" injetado.

**Ouça os eventos** de tarefa (`@OnEvent('task.completed', { promisify: true })` marca `doneAt` no item
do plano de hoje).

e2e do agendador: `expect(app.get(SchedulerRegistry).getCronJob('carry-over')).toBeDefined()` e
`await app.get(DailyPlansScheduler).carryOver()` — roda o job de verdade sem esperar a hora cheia.

### 5.2 Web

```powershell
# 📍 raiz
npm i -w apps/web @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

- `TodayPage`: seções Foco do dia, Também hoje, Cobrar hoje, Bloqueadas (wireframe do documento 1).
- `CapacityBar` com as três faixas de cor e texto acessível (`aria-valuenow`).
- `PlanningRitual` (3 passos) em `/today/plan`; arrastar com dnd-kit **e** com teclado.
- `ShutdownRitual` em `/today/close`: cada pendente → amanhã / backlog / cancelar; nota do dia.
- **Optimistic update** ao concluir:

```ts
const qc = useQueryClient();
const mutation = useChangeTaskStatus({
  mutation: {
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: todayKey });
      const previous = qc.getQueryData(todayKey);
      qc.setQueryData(todayKey, (old) => markDone(old, id, data.status));
      return { previous };
    },
    onError: (_e, _v, ctx) => qc.setQueryData(todayKey, ctx?.previous),
    onSettled: () => qc.invalidateQueries({ queryKey: todayKey }),
  },
});
```

- `QuickAdd` (`N`): input com *debounce* de 200 ms chamando `/tasks/quick-add/preview` e mostrando os
  chips; Enter grava.

## Sprint 6 — Foco e Standup

**Branch:** `feat/focus-standup`

> [!OK] Provado em 31/10/2026
> O índice parcial: a 2ª sessão **ativa** do mesmo usuário falha com `P2002`, e depois de encerrada a
> primeira, a nova passa. Um `migrate dev` seguinte gera migration **vazia**: o Prisma não tenta apagar
> o índice escrito à mão. O timer e o standup em si não foram montados.

**API:**

```powershell
# 📍 api — FocusSession no schema (e focus FocusSession[] em User)
npx prisma migrate dev --name add_focus_sessions --create-only
# abra prisma/migrations/<data>_add_focus_sessions/migration.sql e acrescente (documento 1, RN-06):
#   CREATE UNIQUE INDEX "FocusSession_one_active_per_user" ON "FocusSession"("userId") WHERE "endedAt" IS NULL;
npx prisma migrate dev
npx prisma generate
nest g module modules/focus
nest g controller modules/focus
nest g service modules/focus
nest g module modules/standup
nest g controller modules/standup
nest g service modules/standup
```

- `FocusService.start` encerra a sessão ativa e abre outra **na mesma transação**; o índice parcial é a
  rede de segurança se duas abas clicarem juntas (trate `P2002` como 409).
- `focus.stopped` → `TasksService` soma minutos em `trackedMin`.
- `StandupService`: função pura `previousWorkday(date)` (segunda → sexta) com teste em tabela; monta
  `{ yesterday, today, blockers, text }`, onde `text` já é o markdown pronto para copiar.

**Web:**

- `FocusTimer` em Zustand: guarda `startedAt` (não um contador!) e calcula o restante a cada tick —
  assim o timer não "atrasa" com a aba em segundo plano. `FocusPill` no topo, som opcional ao terminar.
- `StandupDialog` (`S`): filtro por workspace, botões copiar markdown/texto (`navigator.clipboard`).

## Sprint 7 — Pessoas, delegações e 1:1

**Branch:** `feat/people`

```powershell
# 📍 api
npx prisma migrate dev --name add_people_one_on_ones
npx prisma generate
nest g resource modules/people
nest g controller modules/people/one-on-ones --flat
nest g service modules/people/one-on-ones --flat
```

- `PeopleModule` agrupa pessoas e 1:1 (são do mesmo agregado). `OneOnOnesController` usa rotas aninhadas
  `/people/:personId/one-on-ones` e `/one-on-ones/:id`.
- **Criar 1:1** já traz a pauta: itens não discutidos da anterior (RN-08) + delegações abertas com a pessoa.
- **Encerrar 1:1** (`POST /one-on-ones/:id/close`): numa transação, itens `ACTION` viram tarefas delegadas
  (com `followUpAt`), e o evento `one-on-one.closed` é emitido.
- Delegação nas tarefas: valide RN-07 no DTO com um validador customizado
  (`@ValidateIf(o => o.delegatedToId) @IsDateString() followUpAt`).
- Web: `PeoplePage` (cards com próxima 1:1 e alerta de cadência vencida), `PersonPage`,
  `OneOnOneEditor` com humor 1–5 e itens marcáveis.

## Sprint 8 — Decisões, paleta de comandos e atalhos

**Branch:** `feat/decisions-command-palette`

```powershell
# 📍 api
npx prisma migrate dev --name add_decisions
npx prisma generate
nest g resource modules/decisions
```

```powershell
# 📍 raiz
npm i -w apps/web react-markdown
```

- Decisão com status `PROPOSED → ACCEPTED → SUPERSEDED`; ao substituir, a nova aponta para a antiga.
- Exportar decisão como markdown no formato ADR (`GET /decisions/:id/markdown`) — você pode colar no
  repositório de qualquer projeto. É o tipo de detalhe que mostra senioridade.
- Web: `DecisionEditor` com markdown (`react-markdown`), `CommandPalette` com o `command` do shadcn
  (cmdk): navegar, criar, buscar tarefa (chamando `/tasks?q=`), trocar workspace, iniciar foco.
- `useHotkeys` próprio (sem biblioteca: é um bom exercício) com sequências `G H`, `G I` e a tela `?`
  listando todos os atalhos. Teste: atalho não dispara dentro de `<input>`.

## Sprint 9 — Revisão semanal

**Branch:** `feat/insights`

```powershell
# 📍 api
nest g module modules/insights
nest g controller modules/insights
nest g service modules/insights
```

```powershell
# 📍 raiz
npm i -w apps/web recharts
```

- Consultas de agregação: concluídas por dia, minutos de foco por workspace, taxa planejado × feito,
  zumbis, delegações vencidas. Use `groupBy` do Prisma e, onde ele não alcançar, `$queryRaw` com
  *template tag* (parametrizado — nunca concatenar string).
- Parâmetro `week=2026-W44` (ISO week) validado por um pipe próprio.
- Web: `WeeklyReviewPage` com KPIs no topo, barras por dia e por contexto, lista de zumbis com ações,
  nota da semana.

## Sprint 10 — Produção e portfólio

**Branch:** `chore/deploy`

> [!INFO] O que a prova cobriu aqui
> A instalação do Playwright e o build de produção da API (`apps/api/dist/main.js`, o caminho do comando de
> start do Render). O deploy em si (Neon, Render, Vercel) depende das suas contas e **não** foi executado.

### 10.1 Deploy

| Peça | Onde | Configuração |
|---|---|---|
| Banco | Neon, branch `main` | `DATABASE_URL` com `sslmode=require` |
| API | Render (Web Service, Node) | build `npm ci && npm run build -w apps/api`, start `npm exec -w apps/api -- prisma migrate deploy && node apps/api/dist/main.js`, health check `/health` |
| Web | Vercel | raiz `apps/web`, build `npm run build`, `vercel.json` com rewrite de `/api/(.*)` para a URL da API |

Arquivo `apps/web/vercel.json`:

```json
{ "rewrites": [
  { "source": "/api/(.*)", "destination": "https://<sua-api>.onrender.com/api/$1" },
  { "source": "/(.*)", "destination": "/index.html" }
] }
```

### 10.2 Endurecer

- Smoke e2e com **Playwright** no CI: cadastro → captura rápida → plano do dia → concluir → standup.
  `npm i -D -w apps/web @playwright/test` (provado: 1.64.1) e, uma vez, `npx playwright install chromium`
  — esse segundo comando baixa o navegador (centenas de MB) e **não** foi executado na prova.
- `seed.ts` com um usuário demo e uma semana de dados (para o recrutador ver o app vivo).
- Lighthouse ≥ 90 em acessibilidade e boas práticas; `npm audit` sem alta/crítica.
- Página `/docs` (Swagger) acessível em produção, só leitura.

### 10.3 README de portfólio

O README é a vitrine. Estrutura recomendada:

1. Nome, uma frase, **GIF de 15 s** (captura rápida → plano → standup) e link do app no ar (usuário demo).
2. "Por que eu construí" — o problema do tech lead, em 3 linhas.
3. Funcionalidades com prints (tema escuro).
4. Arquitetura: o diagrama de contêineres e o link para `docs/adr/`.
5. Destaques técnicos: refresh rotativo com detecção de reuso, carry-over por fuso, contrato OpenAPI →
   cliente gerado, índice parcial, parser com TDD, optimistic updates.
6. Como rodar local (4 comandos), como testar, badges do CI e de cobertura.
7. Roadmap (o backlog v2) e licença.

# Anexo A · Referência

## A receita de um recurso Nest (12 passos)

Repita esta receita para cada recurso novo — é o "dia a dia" do dev NestJS:

1. Issue + branch `feat/<recurso>`.
2. Modelo no `schema.prisma` → `npx prisma migrate dev --name add_<recurso>` → **ler o SQL**.
3. `nest g resource modules/<recurso>` (CRUD) ou `nest g module/controller/service` (não CRUD).
4. Ler os arquivos gerados; apagar o que não serve (rota que não existe no desenho).
5. DTOs com `class-validator`; `PartialType` do `@nestjs/swagger` no update.
6. Service com Prisma, `userId` em **todo** `where`, 404 para alheio, regra de negócio aqui.
7. Controller fino: `ParseUUIDPipe`, `@CurrentUser()`, códigos HTTP certos (`201`, `204`).
8. Eventos de domínio se outro módulo precisar saber.
9. Testes unitários do service (Prisma mockado) e e2e das rotas (incluindo isolamento).
10. Conferir no `/docs`; `npm run api:gen`; corrigir o que o TypeScript apontar no front.
11. Commits pequenos → PR com descrição → CI verde → auto-review.
12. Squash merge, apagar branch, fechar issue, atualizar o README se mudou algo visível.

## Cola de comandos

| Comando | Gera |
|---|---|
| `nest new <app> --strict` | projeto novo |
| `nest g resource modules/x` | módulo + controller + service + DTOs + entity + specs (pergunta transporte e CRUD) |
| `nest g module modules/x` | `x.module.ts` e registra no módulo pai |
| `nest g controller modules/x` | controller + spec, registrado no módulo |
| `nest g service modules/x` | service + spec, registrado no módulo |
| `nest g guard <caminho> --flat` | guard |
| `nest g pipe` · `filter` · `interceptor` · `decorator` · `middleware` · `class` | a peça correspondente |
| flags úteis | `--flat` (sem pasta própria) · `--no-spec` (sem teste) · `--dry-run` (mostra sem gravar) |
| `npx prisma migrate dev --name x` | migration nova + aplica no dev (no Prisma 7 **não** regera o client) |
| `npx prisma generate` | regera o client em `src/generated/prisma` — depois de toda migration |
| `npx prisma migrate dev --create-only` | só cria o SQL, para você editar antes |
| `npx prisma migrate deploy` | aplica as pendentes (CI e produção) |
| `npx prisma migrate reset` | recria o banco de dev do zero (nunca em produção) |
| `npx prisma studio` | navegador visual do banco |
| `npx shadcn@latest init -b radix -p nova` | configura o shadcn 4 no web (uma vez) |
| `npx shadcn@latest add <comp>` | componente de UI no seu código |
| `nest g resource modules/x --type rest --crud` | o `resource` sem as perguntas |
| `npm run api:gen` | regera `openapi.json` e o cliente do front |

> [!INFO] Hábito de ouro
> Antes de qualquer `nest g` desconhecido, rode com `--dry-run` e veja o que ele vai criar e alterar.

## Boas práticas que este projeto exercita

### NestJS

- Injeção de dependência pelo construtor, sempre; nada de `new Service()` à mão.
- Um módulo exporta só o que outros precisam (`exports`) — o resto é privado.
- Configuração só via `ConfigService`; `process.env` aparece apenas na validação.
- Exceções HTTP do Nest no service são aceitáveis aqui; se o domínio crescer, troque por exceções de
  domínio traduzidas num filtro (anote como ADR quando fizer).
- `Logger` do Nest com contexto (`new Logger(X.name)`), nunca `console.log`.
- Transação quando duas escritas precisam acontecer juntas (`prisma.$transaction`).
- Testes e2e sobem o app **igual** ao `main.ts` — pipe esquecido no teste é bug escondido.

### React + TypeScript

- `strict` + `noUncheckedIndexedAccess`; tipos da API sempre gerados.
- Query keys centralizadas por feature (`taskKeys.list(filters)`), invalidação precisa.
- Formulário: schema Zod é a fonte da verdade; o tipo sai com `z.infer`.
- Acessibilidade não é etapa final: todo componente novo é testado com teclado.
- Sem `useEffect` para derivar estado; derive na renderização ou use `useMemo` quando medir que precisa.

### Como tech lead do próprio projeto

- Cada PR com descrição e "como testar" — você está treinando o hábito que cobra do time.
- ADR para toda decisão que você teria de explicar a alguém daqui a seis meses.
- Issue de "dívida técnica" quando cortar caminho conscientemente — com o porquê.
- Métrica pessoal: tempo de *lead time* por sprint no quadro do GitHub. Você vai usar o Cockpit para
  planejar o próprio Cockpit.

## Backlog v2 (depois do MVP)

| Item | Ideia técnica |
|---|---|
| Reuniões com itens de ação | módulo `meetings`, mesmo padrão do 1:1 |
| PRs do GitHub na Inbox | GitHub App/token pessoal, job a cada 10 min, `@nestjs/axios` |
| Calendário ICS | importar reuniões do dia e descontar da capacidade |
| PWA + notificações | `vite-plugin-pwa`, Web Push para "cobrar hoje" e "fechar o dia" |
| Modo offline | fila de mutações persistida do TanStack Query |
| Assistente de plano com IA | endpoint que manda backlog + capacidade para a API do Claude e sugere o dia |
| Exportar dados | `GET /users/me/export` em JSON — o dado é do usuário |
| Observabilidade | OpenTelemetry → Grafana Cloud |


# Anexo B · O desenho do Cockpit

## Como ler este anexo

É o desenho do Cockpit: produto, regras de negócio, arquitetura e decisões. Consulte quando uma sprint citar uma regra (RN-xx) ou uma decisão (D-xx).


# Anexo B · Produto

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

# Anexo B · Arquitetura

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

# Anexo B · Design

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

# Anexo B · Qualidade e operação

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
