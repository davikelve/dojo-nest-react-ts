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
