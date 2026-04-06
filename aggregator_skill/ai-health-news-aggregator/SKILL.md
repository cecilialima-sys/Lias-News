---
name: ai-health-news-aggregator
description: >
  Integra fontes científicas ao vivo (PubMed, SciELO, arXiv, RSS) em dashboards HTML de notícias sobre IA na saúde.
  Use esta skill SEMPRE que o usuário pedir para: conectar fontes de dados ao vivo em dashboards, integrar PubMed ou SciELO
  em páginas HTML, adicionar auto-refresh de notícias científicas, buscar artigos de IA na saúde automaticamente,
  agregar RSS feeds de saúde, ou qualquer combinação de fetch de APIs científicas + atualização automática de interface.
  Também use quando o usuário mencionar "atualização automática", "fontes ao vivo", "PubMed ao vivo", "feeds científicos",
  ou quiser que um painel exiba conteúdo real em vez de dados estáticos. Entregue sempre o HTML completo e funcional.
---

# AI Health News Aggregator Skill

Integra múltiplas fontes científicas (PubMed, SciELO, arXiv, RSS) em dashboards HTML com auto-refresh, sem modificar layout.

## 1. ARQUITETURA

- Seed data estática carrega imediatamente (página nunca fica em branco)
- Fetchers async em paralelo via Promise.allSettled (falhas isoladas)
- setInterval dispara refresh a cada 30 min
- Deduplicação por título normalizado via Set

## 2. FONTES E ENDPOINTS

### PubMed (CORS ok, sem chave)
- esearch: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term={Q}&retmax=3&retmode=json&sort=date&datetype=pdat&reldate=30
- esummary: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id={IDS}&retmode=json
- Retorna: title, source, fulljournalname, authors[], pubdate

### SciELO (CORS ok, sem chave)
- https://search.scielo.org/api/v1/search?q={Q}&lang=pt&count=3&sort=recent
- Retorna JSON: hits.hits[]._source com ti, ab, ta, dp

### arXiv (CORS ok, sem chave)
- https://export.arxiv.org/api/query?search_query={Q}&start=0&max_results=4&sortBy=submittedDate&sortOrder=descending
- Retorna Atom XML — parse via DOMParser
- Seletores: entry>title, entry>summary, entry>published, author>name

### RSS via allorigins proxy (CORS ok)
- https://api.allorigins.win/get?url={ENCODED_URL}
- Retorna { contents: "<rss xml>" } — parse via DOMParser
- Filtrar com isAIRelated() antes de incluir

Feeds recomendados:
- Healthcare IT News: https://www.healthcareitnews.com/rss.xml
- STAT News: https://www.statnews.com/feed/
- Medscape: https://feeds.feedburner.com/medscape/public
- MobiHealth News: https://www.mobihealthnews.com/rss.xml

## 3. FORMATO PADRÃO DE ARTIGO

{ area, impact, date, source, title, body }
- area: 'medicina' | 'odontologia' | 'enfermagem' | 'biomedicina' | 'nutrição' | 'farmácia'
- impact: 'Alto' | 'Médio'
- date: 'DD mon' (ex: '27 mar') via toDisplayDate()
- body: abstract truncado em 190 chars

## 4. CLASSIFICADORES

classifyArea(title, body): regex por especialidade, fallback 'medicina'
classifyImpact(title, body): keywords de alto impacto -> 'Alto', else 'Médio'
isAIRelated(title, body): filtra RSS — só inclui se contém keywords de IA

## 5. REGRAS QUANDO NÃO MODIFICAR LAYOUT

1. NUNCA alterar CSS
2. NUNCA alterar HTML estrutural
3. Substituir APENAS o bloco <script>
4. Manter SEED_NEWS original como fallback
5. Adicionar id="header-meta" no .header__meta para timestamp
6. Promise.allSettled SEMPRE (nunca Promise.all)
7. try/catch individual por fonte

## 6. CHECKLIST

- [ ] SEED_NEWS preservada
- [ ] Promise.allSettled com 4 fontes
- [ ] Set para deduplicação inicializado com seed
- [ ] setInterval(refresh, 30 * 60 * 1000)
- [ ] try/catch por fetcher
- [ ] classifyArea + classifyImpact em todos os artigos externos
- [ ] isAIRelated filtrando RSS
- [ ] toDisplayDate() padronizando todas as datas
- [ ] Meta atualizado com hora e fontes após refresh
- [ ] HTML entregue completo
