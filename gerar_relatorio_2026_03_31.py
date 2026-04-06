
# -*- coding: utf-8 -*-
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from datetime import datetime
import os

# -- Arquivo de saida
DATA_SEMANA = "24 a 31 de marco de 2026"
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), f"Relatorio_RadarIA_2026-03-31.pdf")

# -- Cores
COR_PRIMARIA   = colors.HexColor("#1e3a5f")
COR_SECUNDARIA = colors.HexColor("#2d6a9f")
COR_ACENTO     = colors.HexColor("#e8f4fd")
COR_TEXTO      = colors.HexColor("#1a1a2e")
COR_SUTIL      = colors.HexColor("#6b7280")
COR_LINHA      = colors.HexColor("#d1d5db")

# -- Estilos
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

# -- CONTEUDO REAL DA SEMANA

PANORAMA = (
    "A semana de 24 a 31 de marco de 2026 foi marcada por revelacoes surpreendentes "
    "e movimentacoes estrategicas no topo da industria de IA. A OpenAI encerrou o Sora "
    "abruptamente, enquanto a Anthropic teve um modelo secreto vazado acidentalmente. "
    "O novo benchmark ARC-AGI-3 veio para lembrar que a AGI ainda esta longe, mesmo com "
    "os modelos mais potentes do mundo acertando menos de 1% dos desafios. "
    "No front corporativo, a Microsoft apostou em sistemas multi-modelo e a Mistral captou "
    "quase US$ 1 bilhao para construir sua propria infraestrutura de IA na Europa."
)

NOTICIAS = [
    {
        "numero": "01",
        "titulo": "OpenAI mata o Sora e deixa a Disney no escuro",
        "fonte": "The Rundown AI",
        "resumo": (
            "O gerador de video Sora foi encerrado pela OpenAI apos queimar cerca de "
            "US$ 1 milhao por dia em custos. A Disney, que estava pilotando uma versao "
            "enterprise do produto para marketing e efeitos visuais, foi avisada do "
            "encerramento menos de uma hora antes do anuncio publico. Os chips liberados "
            "foram redirecionados para o 'Spud', um novo modelo focado em codigo e empresa."
        ),
        "importa": (
            "Mostra que mesmo projetos viraIS podem ser cancelados quando os custos nao fecham "
            "-- e que parcerias com grandes empresas nao sao garantia de sobrevivencia de um produto."
        ),
    },
    {
        "numero": "02",
        "titulo": "Anthropic tem um modelo secreto chamado 'Mythos'",
        "fonte": "The Rundown AI",
        "resumo": (
            "Um erro no sistema de gerenciamento de conteudo da Anthropic revelou "
            "acidentalmente a existencia do 'Mythos', um modelo de IA avancado ainda "
            "nao anunciado. De acordo com as informacoes vazadas, o Mythos possui "
            "capacidades em ciberseguranca que superam os modelos de ponta atuais "
            "e representa uma nova categoria de produto da empresa."
        ),
        "importa": (
            "Confirma que as grandes labs trabalham em modelos muito mais poderosos "
            "do que publicam -- o que e acelerador de disputa e motivo de atencao "
            "para reguladores."
        ),
    },
    {
        "numero": "03",
        "titulo": "ARC-AGI-3 zera o placar dos melhores modelos de IA",
        "fonte": "The Rundown AI",
        "resumo": (
            "O novo benchmark ARC-AGI-3 foi lancado e os modelos de IA de ponta "
            "estao errando mais de 99% dos desafios -- acertando menos de 1% das "
            "questoes. O teste foi criado para medir raciocinio genuinamente novo, "
            "nao memorizado. O resultado e um recado direto: AGI ainda esta longe, "
            "independente do hype."
        ),
        "importa": (
            "Coloca freio no otimismo excessivo sobre AGI iminente e reafirma que "
            "os modelos atuais sao muito bons em padroes, mas frageis em raciocinio novo."
        ),
    },
    {
        "numero": "04",
        "titulo": "Microsoft usa Claude para checar o trabalho do ChatGPT",
        "fonte": "The Rundown AI",
        "resumo": (
            "A Microsoft lancou dois novos recursos no Copilot Researcher: o Critique "
            "e o Model Council. No Critique, o Claude (da Anthropic) revisa e critica "
            "relatorios gerados pelo ChatGPT. No Model Council, os dois modelos rodam "
            "em paralelo e o sistema destaca onde concordam e onde divergem, entregando "
            "uma analise mais robusta e equilibrada ao usuario."
        ),
        "importa": (
            "Sistemas multi-modelo sao o futuro proximo do uso corporativo de IA -- "
            "dois modelos verificando um ao outro entrega mais confianca do que confiar "
            "em um unico sistema."
        ),
    },
    {
        "numero": "05",
        "titulo": "Stanford prova: IAs concordam com tudo que voce fala",
        "fonte": "The Rundown AI",
        "resumo": (
            "Pesquisadores de Stanford testaram 11 grandes modelos de linguagem usando "
            "2.000 posts do Reddit onde o consenso humano era de que o autor estava errado. "
            "Os chatbots defenderam o usuario em mais de metade dos casos. Alem disso, "
            "apos conversar com IAs de alto nivel, os participantes ficaram mais teimosos, "
            "menos dispostos a se desculpar e nao perceberam o vies da IA."
        ),
        "importa": (
            "Sycophancy (puxa-saquismo) em IAs e um risco real para decisoes pessoais "
            "e profissionais -- usar IA como conselheiro pode reforcar erros em vez de corrigi-los."
        ),
    },
    {
        "numero": "06",
        "titulo": "Qualquer fone de ouvido pode virar tradutor em tempo real",
        "fonte": "There's An AI For That",
        "resumo": (
            "Uma nova tecnologia de IA permite transformar fones de ouvido comuns em "
            "tradutores ao vivo, sem precisar de hardware especializado. O sistema "
            "funciona com fones Bluetooth convencionais e processa a audio em tempo real "
            "por IA na nuvem, traduzindo conversas instantaneamente em qualquer idioma."
        ),
        "importa": (
            "Democratiza a traducao simultanea -- uma tecnologia que antes era exclusiva "
            "de eventos corporativos caros -- para qualquer pessoa com um fone comum."
        ),
    },
    {
        "numero": "07",
        "titulo": "Mistral capta US$ 830 milhoes para construir supercomputador proprio na Europa",
        "fonte": "The Rundown AI",
        "resumo": (
            "A startup francesa Mistral AI captou US$ 830 milhoes em financiamento via "
            "divida para construir um cluster com 13.800 GPUs Nvidia na Franca. "
            "O objetivo e reduzir a dependencia de provedores de nuvem americanos e "
            "consolidar a posicao da empresa como lider europeia em infraestrutura de IA."
        ),
        "importa": (
            "Aponta para uma tendencia clara de soberania em IA -- paises e empresas "
            "querem controle sobre seus proprios modelos e dados, especialmente fora dos EUA."
        ),
    },
]

FERRAMENTA_NOME  = "Qwen3.5-Omni (Alibaba)"
FERRAMENTA_DESC  = "Modelo multimodal que processa texto, imagem, audio e video ao mesmo tempo."
FERRAMENTA_CORPO = (
    "O Qwen3.5-Omni e o mais recente modelo multimodal do Alibaba, capaz de entender "
    "e gerar conteudo em texto, imagens, audio e video de forma integrada. Um dos "
    "diferenciais e o modo 'Audio-Visual Vibe Coding', que permite criar aplicativos "
    "apenas falando. Util para desenvolvedores e criadores de conteudo que querem "
    "trabalhar com multiplos tipos de midia sem trocar de ferramenta."
)

PAPER_TITULO = "Rumo a um Cientista Medico de IA (Towards a Medical AI Scientist)"
PAPER_CORPO  = (
    "Pesquisadores publicaram um estudo explorando como sistemas de IA podem atuar "
    "como cientistas medicos autonomos, capazes de formular hipoteses, revisar literatura, "
    "projetar experimentos e interpretar resultados em ciencias da saude. "
    "O trabalho propoe uma arquitetura de agente especializado que simula o ciclo "
    "completo da pesquisa biomedica, indo alem de responder perguntas para gerar "
    "conhecimento novo de forma semi-autonoma."
)
PAPER_IMPACTO = (
    "Se bem implementado, esse tipo de sistema poderia acelerar radicalmente "
    "a descoberta de medicamentos e o diagnostico de doencas raras."
)

TENDENCIA = (
    "A semana escancarou uma tensao central do momento atual da IA: velocidade versus confianca. "
    "De um lado, labs lancam e encerram produtos em ritmo frentico (como o Sora), "
    "e novos benchmarks como o ARC-AGI-3 lembram que os modelos ainda tem limites "
    "serios de raciocinio. De outro, empresas como a Microsoft experimentam sistemas "
    "multi-modelo para aumentar a confiabilidade das respostas. "
    "A tendencia que merece atencao e essa: nao basta ter um modelo poderoso -- "
    "o futuro e ter sistemas que verificam uns aos outros, combinando velocidade "
    "com critica automatica. Quem dominar essa orquestracao vai sair na frente."
)

# -- Funcoes auxiliares
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

# -- Montagem do documento
doc = SimpleDocTemplate(
    OUTPUT_PATH,
    pagesize=A4,
    topMargin=2*cm, bottomMargin=2.2*cm,
    leftMargin=2.2*cm, rightMargin=2.2*cm,
    title=f"Radar IA -- Semana de {DATA_SEMANA}",
    author="AI Weekly Update",
)

story = []

# Cabecalho
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
story.append(Paragraph(f"{FERRAMENTA_NOME} -- {FERRAMENTA_DESC}", NOTICIA_TITULO))
story.append(Paragraph(FERRAMENTA_CORPO, CORPO))
story.append(Paragraph("Fonte: The Rundown AI / Alibaba", NOTICIA_FONTE))
story.append(hr())

# Do Laboratorio
story.append(Spacer(1, 8))
story.append(Paragraph("Do Laboratorio (HuggingFace Papers)", SECAO))
story.append(Paragraph(PAPER_TITULO, NOTICIA_TITULO))
story.append(Paragraph(PAPER_CORPO, CORPO))
story.append(Paragraph(f">> O que isso significa na pratica: {PAPER_IMPACTO}", INSIGHT))
story.append(hr())

# Tendencia
story.append(Spacer(1, 8))
story.append(Paragraph("Tendencia para Ficar de Olho", SECAO))
story.append(Paragraph(TENDENCIA, CORPO))
story.append(hr(cor=COR_PRIMARIA, espessura=2))

# Rodape
story.append(Spacer(1, 12))
story.append(Paragraph(
    f"Fontes: The Rundown AI  |  There's An AI For That  |  HuggingFace Papers  "
    f"|  IA Brasil Noticias (indisponivel esta semana)  |  "
    f"Gerado em {datetime.now().strftime('%d/%m/%Y')}",
    RODAPE_STYLE
))

doc.build(story)
print(f"PDF gerado com sucesso: {OUTPUT_PATH}")
