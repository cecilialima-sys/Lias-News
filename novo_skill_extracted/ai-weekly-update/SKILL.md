---
name: ai-weekly-update
description: >
  Gera automaticamente um relatório semanal de inteligência artificial e posts de carrossel para Instagram a partir de 4 fontes específicas de IA. Use esta skill SEMPRE que o usuário pedir: atualização semanal de IA, resumo de notícias de IA, post de Instagram sobre IA, notícias das fontes de IA, relatório semanal, "gerar update de IA", "criar post de IA", ou qualquer variação. Também use quando o usuário mencionar The Rundown AI, IA Brasil Notícias, There's An AI For That, ou HuggingFace Papers.
---

# Skill: AI Weekly Update

Gera **três entregáveis** semanais sobre inteligência artificial:
1. **Relatório semanal em PDF** — Top 5-10 notícias com análise, formato resumo executivo profissional
2. **Carrossel para Instagram (HTML)** — 7 slides 1080×1080px com botão de download por slide
3. **Caption do Instagram** — Texto pronto para colar na publicação

---

## Fontes de Dados

Sempre buscar conteúdo nestas 4 URLs via `web_fetch`:

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

### Passo 3 — Gerar Relatório em PDF

Gere o relatório como PDF seguindo estas etapas:

**3a.** Monte o conteúdo seguindo o template em `references/relatorio-template.md`.

**3b.** Crie um arquivo Python `/home/claude/gerar_relatorio.py` usando `reportlab` com o conteúdo real. Use o template de código em `references/pdf-report-code.md`.

**3c.** Execute o script:
```bash
pip install reportlab --break-system-packages -q
python /home/claude/gerar_relatorio.py
```

**3d.** Copie o PDF para outputs:
```bash
cp /home/claude/relatorio-ia-[data].pdf /mnt/user-data/outputs/
```

O PDF deve ter:
- Cabecalho com titulo e data da semana
- Resumo executivo de 3-4 frases (panorama da semana)
- Lista das Top 5-10 noticias com analise
- Secao "Ferramenta da Semana"
- Secao "Do Laboratorio" (HuggingFace paper)
- Fechamento com tendencia
- Rodape com fontes consultadas

**Tom**: Profissional mas acessível. Opinativo mas equilibrado. Em português BR.

### Passo 4 — Gerar Carrossel para Instagram

Crie um arquivo HTML interativo com o carrossel. Consulte `references/carousel-design.md` para especificações visuais detalhadas.

**Estrutura do carrossel (slides)**:
1. **Capa** — "IA Esta Semana | [Data]" + subtítulo impactante
2. **Slides 2-6** — Uma notícia por slide (top 5)
3. **Slide final** — CTA + handle do perfil

**Regras do carrossel**:
- Linguagem ultra-simples (público leigo)
- Máx. 30 palavras por slide
- Emojis como apoio visual
- Botão "Salvar este slide" em cada slide usando html2canvas (CDN incluído no HTML)
- Deixar espaço para identidade visual do usuário

**Sobre o botão de download por slide**: Cada slide deve ter um botão fixo no canto inferior direito (fora da área de captura) que use `html2canvas` para capturar apenas o `.slide-wrapper` e fazer download como PNG nomeado `slide-N-[data].png`. Veja implementação em `references/carousel-design.md`.

### Passo 5 — Gerar Caption do Instagram

Gere o texto da publicação para colar no Instagram junto com o carrossel:

```
Estrutura da caption:
- Linha 1: Frase de gancho impactante (máx. 125 chars, aparece antes do "mais")
- Linha em branco
- 5 bullets com as manchetes das notícias (use emojis)
- Linha em branco
- CTA: "Arrasta para ver tudo"
- Linha em branco
- Hashtags (20-25): mistura de PT-BR e EN sobre IA, tecnologia, inovação
- Handle do perfil (se fornecido)
```

Gere a caption em português BR. Tom conversacional, dinâmico, sem formalidades.

### Passo 6 — Identidade Visual

Se o usuário ainda não informou cores/nome do perfil, perguntar:
> "Para personalizar o carrossel, me diga: qual o nome do seu perfil no Instagram e suas cores preferidas (pode ser uma cor principal e uma secundária, ou um estilo como 'escuro e moderno' / 'claro e minimalista')."

Se o usuário já forneceu, aplicar na paleta do carrossel.

**Paleta padrão** (enquanto não informado): gradiente escuro #0f0f1a -> #1a1a2e, acentos em #7c3aed (roxo) e #06b6d4 (ciano). Tipografia: sans-serif moderna.

### Passo 7 — Entrega

Apresente ao usuário na seguinte ordem:
1. **PDF do relatório** — use `present_files` com o caminho do PDF
2. **Carrossel HTML** — use `present_files` com o caminho do HTML; instrução: "Abra no navegador e clique em 'Salvar este slide' em cada slide para baixar as imagens PNG prontas para o Instagram"
3. **Caption do Instagram** — cole diretamente no chat em bloco de código para fácil cópia

---

## Notas Importantes

- **Idioma**: Todo o conteúdo final em Português BR, mesmo que a fonte seja em inglês
- **Citações**: Parafrasear sempre; nunca reproduzir trechos longos das fontes
- **Atualidade**: Priorizar conteúdo dos últimos 7 dias
- **Tom Instagram**: Conversa, não palestra. "Você sabia que..." não "Observa-se que..."
- **Erros de fetch**: Se uma fonte não carregar, mencionar no relatório e continuar com as demais
- **Emojis no PDF**: reportlab não suporta emojis Unicode diretamente — use marcadores textuais como ">>" ou "[DESTAQUE]" em substituição, ou registre a fonte DejaVuSans se disponível no sistema

---

## Referências

- `references/relatorio-template.md` — Template de conteúdo do relatório semanal
- `references/pdf-report-code.md` — Código Python base para gerar o PDF com reportlab
- `references/carousel-design.md` — Especificações de design e código base do carrossel HTML (inclui botão de download por slide)
