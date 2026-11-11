# Contribuindo

Correção de lição, exercício novo e lição nova são bem-vindos. A regra da casa: **nada entra por leitura**.
Todo exercício executável é rodado pelo validador.

## Corrigir ou escrever uma lição

As lições ficam em `conteudo/<trilha>.json`, no formato `{ "licoes": [ ... ] }`. O `id` e o `titulo` de
cada lição são fixos e vêm de `conteudo/_ementa.json`.

```json
{
  "id": "ts-03",
  "titulo": "<igual à ementa>",
  "minutos": 8,
  "ponte": "O conceito ligado a PL/SQL, Forms ou banco, e onde a analogia quebra.",
  "texto": "Markdown, de 300 a 700 palavras.",
  "naPratica": "Onde isso aparece no trabalho real ou no Cockpit.",
  "exercicios": [],
  "cartoes": [{ "frente": "...", "verso": "..." }],
  "fontes": [{ "titulo": "...", "url": "https://..." }]
}
```

Markdown aceito: negrito, itálico, código, blocos de código, listas, subtítulo `###`, tabela e citação.

| Exercício | Campos | Como é conferido |
|---|---|---|
| `prever` | `enunciado`, `linguagem` (`ts` ou `js`), `codigo`, `saida`, `explicacao` | o validador roda o código e compara a saída |
| `compila` | `enunciado`, `codigo`, `compila`, e se for `false`: `erro` (ex.: `"TS2322"`) e `linha` opcional, `explicacao` | o validador passa pelo compilador em modo estrito |
| `quiz` | `pergunta`, `opcoes` (3 ou 4), `correta` (índice), `explicacao` | formato |
| `corredor` | `pergunta`, `pontos` (3 a 6), `modelo` | formato |
| `pratica` | `titulo`, `minutos`, `passos`, `prontoQuando` | formato |

Regras do `prever`: roda com `node trecho.mts`, que apaga os tipos sem checar. Não use `enum`,
`namespace`, *parameter properties*, decorators, JSX nem `import` de pacote npm. A saída tem que ser
determinística: sem acaso, sem hora atual, timers com folga de pelo menos 20 ms. Fuso fixo em
`America/Sao_Paulo`.

Nas perguntas de corredor, use `{{nome}}` onde entra o nome de quem estuda.

Toda lição precisa de 3 a 6 exercícios (pelo menos um `quiz`), de 3 a 6 cartões e de pelo menos uma fonte
oficial.

## Antes de abrir o PR

```bash
node validar.mjs conteudo/<trilha>.json   # precisa terminar em APROVADO: 0 falhas
npm test
```

Escreva em português do Brasil, direto, com o termo técnico em inglês e a tradução na primeira vez. Diga
quando usar, quando não usar e o custo. Exemplos sempre genéricos: nada de nome de empresa, sistema ou
tabela reais.
