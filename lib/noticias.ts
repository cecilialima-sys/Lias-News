export interface Noticia {
  id: string
  categoria: 'ai-news' | 'ai-health'
  rotulo: string
  area: string
  titulo: string
  resumo: string
  data: string
  fonte?: string
  referencia?: string
  fonteUrl?: string
  conteudo?: string[]
}

export const noticias: Noticia[] = [
  {
    id: "gemini-2-5-pro",
    categoria: "ai-news",
    rotulo: "Lançamento",
    area: "Modelos de linguagem",
    titulo: "Google lança Gemini 2.5 Pro com capacidade de raciocínio avançado",
    resumo: "Novo modelo combina performance competitiva e eficiência de custo, com foco em tarefas complexas como codificação e análise de dados.",
    data: "25 de março de 2025",
    fonte: "Google DeepMind",
    fonteUrl: "https://deepmind.google/technologies/gemini/",
    conteudo: [
      "O Google anunciou o lançamento do Gemini 2.5 Pro, seu mais novo modelo de linguagem de grande escala. O modelo foi desenvolvido com foco em raciocínio avançado, codificação de software e análise de dados complexos.",
      "Segundo a empresa, o Gemini 2.5 Pro apresenta melhorias significativas em tarefas que exigem múltiplas etapas de raciocínio, como resolução de problemas matemáticos, planejamento estratégico e geração de código.",
      "O novo modelo também oferece maior eficiência de custo em comparação com versões anteriores, o que pode facilitar sua adoção em aplicações comerciais e acadêmicas."
    ]
  },
  {
    id: "agentes-ia-2025",
    categoria: "ai-news",
    rotulo: "Tendência",
    area: "Agentes inteligentes",
    titulo: "2025 é apontado como o ano dos agentes de IA",
    resumo: "Especialistas destacam que modelos capazes de executar tarefas de forma autônoma devem se popularizar nos próximos meses.",
    data: "20 de março de 2025",
    fonte: "MIT Technology Review",
    fonteUrl: "https://www.technologyreview.com/",
    conteudo: [
      "Analistas de tecnologia apontam 2025 como o ano em que os agentes de inteligência artificial devem ganhar escala no mercado. Diferente de assistentes tradicionais, esses sistemas são projetados para realizar tarefas complexas de forma autônoma.",
      "Entre os exemplos citados estão agentes capazes de pesquisar informações, tomar decisões intermediárias e executar ações em nome do usuário, como agendamentos, compras ou análise de documentos.",
      "Empresas como OpenAI, Google e startups especializadas já demonstraram protótipos funcionais, e espera-se que novos produtos cheguem ao público geral ainda em 2025."
    ]
  },
  {
    id: "ia-diagnostico-cancer",
    categoria: "ai-health",
    rotulo: "Pesquisa",
    area: "Diagnóstico",
    titulo: "IA melhora detecção precoce de câncer de mama em estudo clínico",
    resumo: "Sistema de inteligência artificial demonstrou aumento de 20% na taxa de detecção de tumores em estágio inicial.",
    data: "18 de março de 2025",
    fonte: "Nature Medicine",
    fonteUrl: "https://www.nature.com/nm/",
    conteudo: [
      "Um estudo publicado na revista Nature Medicine mostrou que um sistema de inteligência artificial foi capaz de aumentar em 20% a detecção precoce de câncer de mama quando usado como ferramenta de apoio à decisão médica.",
      "O sistema analisou mamografias de mais de 80.000 pacientes e identificou padrões sutis que frequentemente passam despercebidos em exames de rotina.",
      "Os pesquisadores ressaltam que a IA não substitui o radiologista, mas atua como uma segunda opinião automatizada que pode reduzir a taxa de falsos negativos."
    ]
  },
  {
    id: "chatgpt-medicina",
    categoria: "ai-health",
    rotulo: "Aplicação",
    area: "Atendimento",
    titulo: "Hospitais testam uso de ChatGPT para triagem de pacientes",
    resumo: "Instituições de saúde avaliam uso de modelos de linguagem para auxiliar no acolhimento e direcionamento de pacientes.",
    data: "15 de março de 2025",
    fonte: "Healthcare IT News",
    fonteUrl: "https://www.healthcareitnews.com/",
    conteudo: [
      "Hospitais nos Estados Unidos e na Europa estão conduzindo projetos-piloto para avaliar o uso de modelos de linguagem como o ChatGPT no processo de triagem de pacientes.",
      "A proposta é utilizar a IA para coletar informações iniciais sobre os sintomas do paciente, organizar essas informações e sugerir prioridades de atendimento para a equipe médica.",
      "Especialistas alertam que o uso dessas ferramentas exige supervisão humana constante e protocolos claros de segurança de dados para garantir a privacidade das informações de saúde."
    ]
  },
  {
    id: "openai-gpt5",
    categoria: "ai-news",
    rotulo: "Expectativa",
    area: "Modelos de linguagem",
    titulo: "OpenAI deve lançar GPT-5 ainda em 2025",
    resumo: "Rumores indicam que a próxima geração do modelo pode trazer avanços significativos em raciocínio multimodal.",
    data: "12 de março de 2025",
    fonte: "The Verge",
    fonteUrl: "https://www.theverge.com/",
    conteudo: [
      "Segundo fontes próximas à OpenAI, a empresa planeja lançar o GPT-5 ainda em 2025. O novo modelo deve trazer avanços em raciocínio multimodal, integrando texto, imagem, áudio e vídeo de forma mais fluida.",
      "Espera-se também que o GPT-5 tenha capacidade aprimorada de memória de longo prazo, permitindo conversas mais consistentes ao longo do tempo.",
      "A OpenAI não confirmou oficialmente a data de lançamento, mas especialistas acreditam que o anúncio pode ocorrer no segundo semestre de 2025."
    ]
  },
  {
    id: "ia-enfermagem",
    categoria: "ai-health",
    rotulo: "Inovação",
    area: "Enfermagem",
    titulo: "Robôs com IA auxiliam enfermeiros em hospitais japoneses",
    resumo: "Tecnologia ajuda na movimentação de pacientes e no monitoramento de sinais vitais em tempo real.",
    data: "10 de março de 2025",
    fonte: "Japan Times",
    fonteUrl: "https://www.japantimes.co.jp/",
    conteudo: [
      "Hospitais no Japão estão implementando robôs equipados com inteligência artificial para auxiliar enfermeiros em tarefas rotineiras, como movimentação de pacientes e monitoramento de sinais vitais.",
      "Os robôs utilizam sensores avançados e algoritmos de aprendizado de máquina para detectar alterações nos sinais vitais e alertar a equipe médica em tempo real.",
      "A iniciativa busca reduzir a sobrecarga de trabalho dos profissionais de enfermagem e melhorar a qualidade do atendimento em um país que enfrenta escassez de mão de obra na área da saúde."
    ]
  }
]

export function getNoticiaById(id: string): Noticia | undefined {
  return noticias.find(n => n.id === id)
}

export function getNoticiasByCategoria(categoria: 'ai-news' | 'ai-health'): Noticia[] {
  return noticias.filter(n => n.categoria === categoria)
}

export function getLatestNoticias(limit: number = 3): Noticia[] {
  return noticias.slice(0, limit)
}
