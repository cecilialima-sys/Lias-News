---
name: ai-weekly-update
description: >
  Gera automaticamente um relatório semanal de inteligência artificial e posts de carrossel para Instagram a partir de 4 fontes específicas de IA. Use esta skill SEMPRE que o usuário pedir: atualização semanal de IA, resumo de notícias de IA, post de Instagram sobre IA, notícias das fontes de IA, relatório semanal, "gerar update de IA", "criar post de IA", ou qualquer variação. Também use quando o usuário mencionar The Rundown AI, IA Brasil Notícias, There's An AI For That, ou HuggingFace Papers.
---

# Skill: AI Weekly Update

Gera dois entregáveis semanais sobre inteligência artificial:
1. **Relatório semanal** — Top 5-10 notícias com análise e contexto, formato resumo executivo (1 página)
2. **Carrossel para Instagram** — Imagem HTML interativa pronta para captura/download, linguagem acessível para leigos

---

## Fontes de Dados

Sempre buscar conteúdo nestas 4 URLs:

| Fonte | URL | Foco |
|---|---|---|
| The Rundown AI | https://www.therundown.ai/ | Notícias globais de IA em inglês |
| IA Brasil Notícias | https://iabrasilnoticias.com.br/ | Notícias de IA em português BR |
| There's An AI For That | https://newsletter.theresanaiforthat.com/ | Novos produtos e ferramentas de IA |
| HuggingFace Papers | https://huggingface.co/papers | Artigos acadêmicos e pesquisas recentes |

---

## Fluxo de Trabalho

### Passo 1 — Coleta de Conteúdo

Use `web_fetch` em cada uma das 4 fontes. Para cada uma extraia:
- Títulos das matérias/papers mais recentes
- Resumos ou trechos disponíveis
- Datas de publicação (priorize conteúdo da semana atual)

```
web_fetch: https://www.therundown.ai/
web_fetch: https://iabrasilnoticias.com.br/
web_fetch: https://newsletter.theresanaiforthat.com/
web_fetch: https://huggingface.co/papers
```

Se alguma fonte falhar, continue com as demais e mencione no relatório.

### Passo 2 — Curadoria e Análise

Selecione as **Top 5 a 10 notícias** da semana usando estes critérios (em ordem de prioridade):
1. Impacto prático para o público geral
2. Novidade/ineditismo da informação
3. Relevância para o mercado brasileiro
4. Importância científica (papers HuggingFace)

Para cada notícia selecionada, prepare:
- **Título** em português BR (traduzir se necessário)
- **Resumo** de 2-3 frases simples
- **Por que importa** — 1 frase de contexto/opinião
- **Fonte** de origem
- **Emoji** representativo

### Passo 3 — Gerar Relatório Semanal

Gere o relatório em markdown seguindo o template em `references/relatorio-template.md`.

O relatório deve ter:
- Cabeçalho com data da semana
- Resumo executivo de 3-4 frases (o "panorama da semana")
- Lista das Top 5-10 notícias com análise
- Seção "Ferramenta da Semana" (1 destaque do There's An AI For That)
- Seção "Do Laboratório" (1 paper relevante do HuggingFace, explicado de forma simples)
- Fechamento com reflexão/tendência

**Tom**: Profissional mas acessível. Opinativo mas equilibrado. Em português BR.

### Passo 4 — Gerar Carrossel para Instagram

Crie um arquivo HTML interativo com o carrossel. Consulte `references/carousel-design.md` para especificações visuais detalhadas.

**Estrutura do carrossel (slides)**:
1. **Capa** — "🤖 IA Esta Semana | [Data]" + subtítulo impactante
2. **Slides 2-6** — Uma notícia por slide (top 5)
3. **Slide final** — CTA + handle do perfil

**Regras do carrossel**:
- Linguagem ultra-simples (público leigo)
- Máx. 30 palavras por slide
- Emojis como apoio visual
- Deixar espaço para identidade visual do usuário (ver abaixo)

### Passo 5 — Identidade Visual

Se o usuário ainda não informou cores/nome do perfil, perguntar:
> "Para personalizar o carrossel, me diga: qual o nome do seu perfil no Instagram e suas cores preferidas (pode ser uma cor principal e uma secundária, ou um estilo como 'escuro e moderno' / 'claro e minimalista')."

Se o usuário já forneceu, aplicar na paleta do carrossel.

**Paleta padrão** (enquanto não informado): gradiente escuro `#0f0f1a` → `#1a1a2e`, acentos em `#7c3aed` (roxo) e `#06b6d4` (ciano). Tipografia: sans-serif moderna.

### Passo 6 — Entrega

Apresente ao usuário:
1. O relatório semanal em markdown (inline no chat)
2. O carrossel como arquivo HTML salvo em `/mnt/user-data/outputs/carrossel-ia-[data].html`
3. Use `present_files` para o HTML
4. Instruções de uso: "Abra o HTML no navegador, navegue pelos slides e tire print de cada um para publicar no Instagram"

---

## Notas Importantes

- **Idioma**: Todo o conteúdo final em Português BR, mesmo que a fonte seja em inglês
- **Citações**: Parafrasear sempre; nunca reproduzir trechos longos das fontes
- **Atualidade**: Priorizar conteúdo dos últimos 7 dias
- **Tom Instagram**: Conversa, não palestra. "Você sabia que..." não "Observa-se que..."
- **Erros de fetch**: Se uma fonte não carregar, mencionar no relatório e continuar com as demais

---

## Referências

- `references/relatorio-template.md` — Template completo do relatório semanal
- `references/carousel-design.md` — Especificações de design e código base do carrossel HTML
