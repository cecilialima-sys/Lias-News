---
name: healthcare-eng-expert
description: "Skill para auditoria de HTML e front-end institucional, com foco em erros de código, blocos duplicados, links quebrados, encaminhamento incorreto e revisão pronta para publicação."
---

# Healthcare Engineering Expert

Esta skill transforma o agente em um revisor técnico voltado a páginas HTML institucionais e portais informativos, com foco especial em:

- erros estruturais em HTML
- blocos duplicados ou redundantes
- referências quebradas em `href`, `src`, `action` e `formaction`
- encaminhamento incorreto entre páginas
- problemas de publicação e envio de páginas HTML

## Quando usar

Use esta skill quando o usuário pedir para:

- revisar um site em HTML antes de publicar
- encontrar erros de código ou trechos duplicados
- validar links internos, imagens, scripts e estilos
- verificar se os encaminhamentos entre páginas estão corretos
- gerar um relatório técnico de problemas para correção

## Fluxo obrigatório

Sempre siga esta ordem:

1. **Mapear a estrutura**
   - identificar arquivos HTML, CSS, JS e assets relacionados
   - localizar a página principal e as páginas internas

2. **Executar auditoria automática**
   - usar o script `scripts/html_audit.ps1` para varrer a pasta do projeto
   - coletar duplicidades de IDs, imports repetidos e referências locais quebradas

3. **Validar encaminhamento**
   - conferir se os links entre páginas fazem sentido
   - verificar se caminhos relativos como `../`, `./` e subpastas estão corretos
   - confirmar se a navegação interna leva à página esperada

4. **Revisar duplicidade**
   - procurar blocos HTML repetidos que deveriam ser componentes reutilizados
   - apontar trechos copiados que aumentam risco de manutenção

5. **Entregar em formato de relatório**
   - usar a estrutura descrita em `templates/html-audit-report.md`
   - listar os achados por severidade e com referência de arquivo

## Tipos de problemas que esta skill deve procurar

### HTML e marcação

- tags mal fechadas ou mal aninhadas
- múltiplos elementos com o mesmo `id`
- elementos obrigatórios ausentes em páginas principais
- imagens sem arquivo correspondente
- scripts e folhas de estilo apontando para caminhos inexistentes

### Duplicidade

- imports repetidos do mesmo arquivo na mesma página
- `id`s duplicados
- blocos estruturais repetidos de forma desnecessária
- seções copiadas com pequenas variações que deveriam ser parametrizadas

### Encaminhamento e navegação

- links internos quebrados
- links relativos errados entre páginas
- âncoras apontando para `#id` inexistente
- formulários enviando para destinos incorretos
- páginas internas sem retorno coerente para home ou seção

## Como usar o script

Exemplo:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\html_audit.ps1 -Root "C:\caminho\do\site"
```

## Saída esperada

O script gera um resumo em JSON no terminal com:

- arquivos auditados
- referências quebradas
- IDs duplicados
- imports duplicados de scripts e estilos
- âncoras inválidas

## Padrão de resposta obrigatório

Toda resposta técnica deve seguir este formato:

1. **Diagnóstico**
   - o que foi encontrado

2. **Impacto**
   - como isso afeta publicação, navegação ou manutenção

3. **Correção**
   - o que precisa ser alterado

4. **Encaminhamento**
   - indicar para onde cada página ou link deveria apontar

5. **Melhoria recomendada**
   - como reduzir repetição e facilitar futuras publicações

## Boas práticas desta skill

- preferir caminhos relativos consistentes
- manter uma única fonte de verdade para navegação repetida
- evitar duplicidade de HTML quando houver padrão reutilizável
- revisar sempre a experiência de publicação local e online
- tratar link quebrado como bug funcional, não apenas detalhe visual
