Portal informativo da Liga de Inteligência Artificial na Saúde (LIAS), com foco em notícias, atualizações e conteúdos educativos sobre IA e saúde.

## Estrutura

- `index.html`: página inicial com apresentação institucional e destaques.
- `pages/ai-news.html`: notícias sobre tendências, ferramentas e pesquisas em IA.
- `pages/ai-health.html`: notícias e conteúdos sobre aplicações da IA na saúde.
- `noticia.html`: página interna para leitura completa de cada matéria.
- `data/noticias.js`: arquivo central para adicionar ou editar matérias.
- `script.js`: carrega automaticamente as notícias da seção correta.

## Como adicionar novas matérias

1. Abra `data/noticias.js`.
2. Copie um objeto existente e ajuste os campos:
   - `id`: identificador único da matéria
   - `categoria`: use `ai-news` ou `ai-health`
   - `rotulo`
   - `area`
   - `titulo`
   - `resumo`
   - `data`
   - `fonte` ou `referencia`
   - `fonteUrl`: link da fonte original
   - `conteudo`: lista de parágrafos para a página interna da matéria
3. Salve o arquivo. O site exibirá a nova matéria automaticamente na página correspondente.

## Observação

O topo do site já possui um espaço reservado para inserir a logo da UNIFAL-MG.
