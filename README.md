# 🥋 Dojo — NestJS, React e TypeScript

Um curso autodidata, em português, para quem **já programa** e precisa chegar a nível pleno/sênior em
**NestJS, React e TypeScript** estudando à noite, depois do trabalho. Foi escrito para quem vem de **Oracle
PL/SQL e Oracle Forms**: toda lição parte do que esse público já domina e diz onde a analogia quebra.

Ele roda na sua máquina, abre no navegador e diz o que fazer hoje.

- **168 lições** em 15 trilhas, de 8 minutos cada, em três níveis: Fundamento, Pleno e Sênior.
- **Exercícios que rodam de verdade:** você escreve a previsão, o Dojo executa o código no Node ou passa
  pelo compilador TypeScript, e mostra a sua previsão ao lado do resultado real.
- **Sessão do tamanho da sua energia:** 15, 60 ou 120 minutos. A de 15 já conta como dia cumprido.
- **Revisão espaçada embutida:** 798 cartões que voltam quando você estaria esquecendo, mais os seus.
- **Ofensiva com escudo:** um dia perdido é coberto. A regra é nunca dois seguidos.
- **Trilha de migração de legado** (Forms → web) e 94 "perguntas de corredor" para treinar a resposta de
  um minuto: veredito, custo, risco e primeiro passo.
- **Um projeto para construir**, o Cockpit, com guia sprint a sprint, 5 provas sem IA e 24 desafios de
  depuração.

## Começar

Você precisa do [Node.js](https://nodejs.org) **24 ou mais novo** e do Git.

```bash
git clone https://github.com/davikelve/dojo-nest-react-ts.git
cd dojo-nest-react-ts
npm install
npm start
```

O navegador abre em `http://localhost:4321`. No Windows, depois da primeira vez, bastam dois cliques em
`Estudar.cmd`; no Linux e no macOS, `./estudar.sh`.

Depois leia a **Parte 1** do guia (10 minutos): aba **Guia** dentro do Dojo, ou o arquivo
[`guia/GUIA.html`](guia/GUIA.html) (baixe e abra no navegador), ou a versão em texto,
[`guia/GUIA.md`](guia/GUIA.md).

## As trilhas

| Trilha | Lições | Trilha | Lições |
|---|---:|---|---:|
| 🟦 TypeScript | 14 | 🔄 Dados no front | 8 |
| 🟨 JavaScript e Node | 11 | 🎨 UI e acessibilidade | 6 |
| 🌐 HTTP e APIs | 10 | 🧰 Ferramentas | 7 |
| 🟥 NestJS | 18 | 🚀 Produção | 9 |
| 🗄️ Dados | 13 | 🏛️ Arquitetura | 12 |
| 🔐 Segurança | 11 | 🔁 Migração Forms → web | 14 |
| 🧪 Testes | 9 | 🧭 Tech lead | 8 |
| ⚛️ React | 18 | | |

A rota mistura as trilhas de propósito e é dividida em 5 fases, cada uma com uma prova (o "chefão") feita
com o relógio correndo e sem IA.

## Como funciona por dentro

| Pasta | O que tem |
|---|---|
| `servidor.mjs` | Servidor local em Node puro. Só escuta em `127.0.0.1` e toda chamada exige o token da sessão |
| `web/` | A tela, em JavaScript puro, sem framework e sem build |
| `conteudo/` | As lições (um JSON por trilha), a ementa, a rota e os desafios |
| `motor/` | Executa os trechos num processo Node separado e confere tipos com o compilador |
| `validar.mjs` | Roda cada exercício e reprova a lição se a saída real for diferente da esperada |
| `guia/` | O documento único do curso e as fontes dele |
| `meu-progresso/` | O seu progresso e o seu diário. Fica só na sua máquina (está no `.gitignore`) |

O Dojo não usa banco, não tem conta e não envia nada para lugar nenhum.

```bash
npm test        # lógica, servidor e todas as lições (executa os 318 exercícios)
npm run links   # confere se as fontes oficiais citadas respondem
```

## O que foi conferido, e o que não foi

- Os exercícios "preveja a saída" e "compila ou não compila?" são **executados** pelo validador. Lição
  cuja saída real difere da esperada não entra.
- O **texto** das lições foi escrito com apoio de IA (Claude) e revisado por amostragem. Pode conter erro.
  Trechos de bibliotecas que o projeto de exemplo ainda não usa são ilustrativos, e a lição avisa.
- Achou algo errado? Teste no Laboratório do Dojo e abra uma *issue*. Correção é muito bem-vinda: veja o
  [CONTRIBUINDO.md](CONTRIBUINDO.md).

Nenhum curso entrega senioridade em semanas. O que este entrega é um caminho com dose realista e uma
régua honesta para medir onde você está.

## Licença

[MIT](LICENSE). Use, adapte e compartilhe.

Feito por **Davi Kelve**.
