# Código Base — Gerador de PDF com ReportLab

Use este template como base. Substitua os placeholders pelo conteúdo real coletado das fontes.

```python
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, PageBreak
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from datetime import datetime

# ── Arquivo de saída ──────────────────────────────────────────────
DATA_SEMANA = "22 a 28 de março de 2025"   # <-- ajustar
OUTPUT_PATH = f"/home/claude/relatorio-ia-{datetime.now().strftime('%Y-%m-%d')}.pdf"

# ── Cores ─────────────────────────────────────────────────────────
COR_PRIMARIA   = colors.HexColor("#1e3a5f")   # azul escuro
COR_SECUNDARIA = colors.HexColor("#2d6a9f")   # azul médio
COR_ACENTO     = colors.HexColor("#e8f4fd")   # azul bem claro (fundo de card)
COR_TEXTO      = colors.HexColor("#1a1a2e")
COR_SUTIL      = colors.HexColor("#6b7280")
COR_LINHA      = colors.HexColor("#d1d5db")

# ── Estilos ───────────────────────────────────────────────────────
styles = getSampleStyleSheet()

TITULO_DOC = ParagraphStyle("TituloDoc",
    parent=styles["Normal"],
    fontSize=28, fontName="Helvetica-Bold",
    textColor=COR_PRIMARIA, spaceAfter=4,
    alignment=TA_LEFT)

SUBTITULO_DOC = ParagraphStyle("SubtituloDoc",
    parent=styles["Normal"],
    fontSize=13, fontName="Helvetica",
    textColor=COR_SUTIL, spaceAfter=18)

SECAO = ParagraphStyle("Secao",
    parent=styles["Normal"],
    fontSize=15, fontName="Helvetica-Bold",
    textColor=COR_PRIMARIA, spaceBefore=20, spaceAfter=10)

NOTICIA_TITULO = ParagraphStyle("NoticiaTitulo",
    parent=styles["Normal"],
    fontSize=13, fontName="Helvetica-Bold",
    textColor=COR_TEXTO, spaceBefore=14, spaceAfter=4)

NOTICIA_FONTE = ParagraphStyle("NoticiaFonte",
    parent=styles["Normal"],
    fontSize=9, fontName="Helvetica",
    textColor=COR_SUTIL, spaceAfter=4)

CORPO = ParagraphStyle("Corpo",
    parent=styles["Normal"],
    fontSize=11, fontName="Helvetica",
    textColor=COR_TEXTO, leading=17,
    alignment=TA_JUSTIFY, spaceAfter=6)

INSIGHT = ParagraphStyle("Insight",
    parent=styles["Normal"],
    fontSize=10, fontName="Helvetica-Oblique",
    textColor=COR_SECUNDARIA, leading=15,
    leftIndent=12, spaceAfter=14)

RODAPE_STYLE = ParagraphStyle("Rodape",
    parent=styles["Normal"],
    fontSize=8, fontName="Helvetica",
    textColor=COR_SUTIL, alignment=TA_CENTER)

# ── Conteúdo ──────────────────────────────────────────────────────
# SUBSTITUA os valores abaixo pelo conteúdo real coletado das fontes

PANORAMA = (
    "Esta semana foi marcada por importantes lancamentos no ecossistema de IA, "
    "com destaque para novos modelos multimodais e avancos em IA para saude. "
    "O mercado brasileiro tambem registrou movimentacoes relevantes."
    # <-- preencher com panorama real
)

NOTICIAS = [
    {
        "numero": "01",
        "titulo": "Titulo da Primeira Noticia Aqui",   # <-- preencher
        "fonte": "The Rundown AI",
        "resumo": "Resumo de 2-3 frases simples explicando o que aconteceu nesta noticia.",
        "importa": "Por que importa: uma frase de analise sobre o impacto real desta novidade.",
    },
    {
        "numero": "02",
        "titulo": "Titulo da Segunda Noticia Aqui",    # <-- preencher
        "fonte": "IA Brasil Noticias",
        "resumo": "Resumo de 2-3 frases da segunda noticia mais relevante da semana.",
        "importa": "Por que importa: contexto e relevancia para o mercado brasileiro.",
    },
    {
        "numero": "03",
        "titulo": "Titulo da Terceira Noticia",
        "fonte": "The Rundown AI",
        "resumo": "Resumo da terceira noticia.",
        "importa": "Por que importa: implicacoes praticas.",
    },
    {
        "numero": "04",
        "titulo": "Titulo da Quarta Noticia",
        "fonte": "There's An AI For That",
        "resumo": "Resumo da quarta noticia.",
        "importa": "Por que importa: relevancia para produtividade.",
    },
    {
        "numero": "05",
        "titulo": "Titulo da Quinta Noticia",
        "fonte": "HuggingFace Papers",
        "resumo": "Resumo da quinta noticia.",
        "importa": "Por que importa: impacto cientifico.",
    },
    # Adicione mais noticias se necessário (06, 07...)
]

FERRAMENTA_NOME   = "Nome da Ferramenta"           # <-- preencher
FERRAMENTA_DESC   = "O que a ferramenta faz em uma frase."
FERRAMENTA_CORPO  = "Descricao de 2-3 frases sobre como funciona e para quem e util."

PAPER_TITULO      = "Titulo do Paper Traduzido"     # <-- preencher
PAPER_CORPO       = "Pesquisadores descobriram que... [explicacao em linguagem simples]"
PAPER_IMPACTO     = "O que isso significa na pratica: uma frase sobre implicacoes reais."

TENDENCIA         = (
    "Reflexao final: 3-5 frases sobre uma tendencia emergente observada nas noticias desta semana."
    # <-- preencher com analise real
)

# ── Montagem do documento ─────────────────────────────────────────
def hr(cor=COR_LINHA, espessura=0.5, espaco_antes=6, espaco_depois=6):
    return HRFlowable(width="100%", thickness=espessura,
                      color=cor, spaceAfter=espaco_depois, spaceBefore=espaco_antes)

def linha_noticia(n):
    story = []
    story.append(Paragraph(f"{n['numero']}. {n['titulo']}", NOTICIA_TITULO))
    story.append(Paragraph(f"Fonte: {n['fonte']}", NOTICIA_FONTE))
    story.append(Paragraph(n["resumo"], CORPO))
    story.append(Paragraph(f">> Por que importa: {n['importa']}", INSIGHT))
    story.append(hr())
    return story

doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    topMargin=2*cm, bottomMargin=2.2*cm,
    leftMargin=2.2*cm, rightMargin=2.2*cm,
    title=f"Radar IA — Semana de {DATA_SEMANA}",
    author="AI Weekly Update",
)

story = []

# Cabeçalho
story.append(Paragraph("RADAR IA", TITULO_DOC))
story.append(Paragraph(f"Semana de {DATA_SEMANA}", SUBTITULO_DOC))
story.append(hr(cor=COR_PRIMARIA, espessura=2, espaco_antes=0, espaco_depois=16))

# Panorama
story.append(Paragraph("Panorama da Semana", SECAO))
story.append(Paragraph(PANORAMA, CORPO))
story.append(hr())

# Top Noticias
story.append(Spacer(1, 8))
story.append(Paragraph("Top Noticias da Semana", SECAO))
story.append(hr(espaco_antes=0))

for n in NOTICIAS:
    story.extend(linha_noticia(n))

# Ferramenta da Semana
story.append(Spacer(1, 8))
story.append(Paragraph("Ferramenta da Semana", SECAO))
story.append(Paragraph(f"{FERRAMENTA_NOME} — {FERRAMENTA_DESC}", NOTICIA_TITULO))
story.append(Paragraph(FERRAMENTA_CORPO, CORPO))
story.append(Paragraph("Fonte: There's An AI For That", NOTICIA_FONTE))
story.append(hr())

# Do Laboratório
story.append(Spacer(1, 8))
story.append(Paragraph("Do Laboratorio (HuggingFace Papers)", SECAO))
story.append(Paragraph(PAPER_TITULO, NOTICIA_TITULO))
story.append(Paragraph(PAPER_CORPO, CORPO))
story.append(Paragraph(f">> O que isso significa na pratica: {PAPER_IMPACTO}", INSIGHT))
story.append(hr())

# Tendência
story.append(Spacer(1, 8))
story.append(Paragraph("Tendencia para Ficar de Olho", SECAO))
story.append(Paragraph(TENDENCIA, CORPO))
story.append(hr(cor=COR_PRIMARIA, espessura=2))

# Rodapé
story.append(Spacer(1, 12))
story.append(Paragraph(
    f"Fontes: The Rundown AI  •  IA Brasil Noticias  •  There's An AI For That  •  HuggingFace Papers  |  Gerado em {datetime.now().strftime('%d/%m/%Y')}",
    RODAPE_STYLE
))

doc.build(story)
print(f"PDF gerado: {OUTPUT_PATH}")
```

## Notas de Uso

- **Emojis**: reportlab com fontes padrão (Helvetica) não renderiza emojis Unicode. Substitua por marcadores textuais como `>>`, `[DESTAQUE]`, ou numeros.
- **Acentuação**: Python 3 + UTF-8 suporta acentos normalmente. Strings com acentos funcionam em Paragraph.
- **Noticias adicionais**: Duplique os dicts em `NOTICIAS` para 6-10 itens conforme o conteúdo da semana.
- **Personalização de cores**: Altere `COR_PRIMARIA` e `COR_SECUNDARIA` para refletir identidade visual do usuário.
