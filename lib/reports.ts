export interface WeeklyReport {
  id: string
  titulo: string
  periodo: string
  categoria: "Radar IA" | "IA na Saúde"
  href: string
  descricao: string
}

export const weeklyReports: WeeklyReport[] = [
  {
    id: "radar-ia-10-16-04-2026",
    titulo: "Radar IA",
    periodo: "10 a 16 de abril de 2026",
    categoria: "Radar IA",
    href: "/reports/radar-ia-semana-10-a-16-04-2026.pdf",
    descricao: "Panorama com Stanford AI Index 2026, regras do TSE, desinformação com IA, robotáxis e humanoides."
  },
  {
    id: "ia-saude-10-16-04-2026",
    titulo: "IA na Saúde",
    periodo: "10 a 16 de abril de 2026",
    categoria: "IA na Saúde",
    href: "/reports/ia-saude-semana-10-a-16-04-2026.pdf",
    descricao: "Edição com JAMA, FDA, Mount Sinai, investimento hospitalar e adoção clínica de IA."
  },
  {
    id: "radar-ia-01-07-04-2026",
    titulo: "Radar IA",
    periodo: "1 a 7 de abril de 2026",
    categoria: "Radar IA",
    href: "/reports/radar-ia-semana-07-04-2026.pdf",
    descricao: "Anthropic, distilação adversária, Gemma 4, aquisição do TBPN e empreendedorismo com IA."
  },
  {
    id: "ia-saude-03-09-04-2026",
    titulo: "IA na Saúde",
    periodo: "3 a 9 de abril de 2026",
    categoria: "IA na Saúde",
    href: "/reports/ia-saude-semana-03-a-09-04-2026.pdf",
    descricao: "Escribas de IA, AMIE do Google, UnitedHealth, confiança pública e cardiologia com IA."
  }
]
