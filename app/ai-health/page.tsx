import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsCard } from "@/components/news-card"
import { NeuralBackground } from "@/components/neural-background"
import { getNoticiasByCategoria } from "@/lib/noticias"

export const metadata: Metadata = {
  title: "Inteligência Artificial na Saúde | LIAS News",
  description: "Notícias e conteúdos sobre aplicações da IA na saúde.",
}

export default function AIHealthPage() {
  const news = getNoticiasByCategoria("ai-health")

  const topics = [
    "Diagnóstico",
    "Enfermagem",
    "Hospitais",
    "Pesquisa clínica",
    "Gestão"
  ]

  return (
    <>
      <NeuralBackground />
      <div className="relative z-[1] mx-auto w-[min(1180px,calc(100%-32px))] py-6 pb-10">
        <Header />

        <main>
          {/* Page Hero */}
          <section className="mb-4.5 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-sm">
            <h2 className="mb-2.5 font-heading text-[clamp(2rem,4vw,3rem)] font-bold">
              Inteligência Artificial na Saúde
            </h2>
            <p className="leading-relaxed text-[var(--muted)]">
              Aplicações, pesquisas e inovações da IA no setor de saúde.
            </p>
          </section>

          {/* Topic Strip */}
          <section className="mb-6.5 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-[18px] border border-[var(--border)] bg-gradient-to-br from-white/90 to-[rgba(232,250,246,0.9)] p-4 text-center font-bold tracking-wider text-[var(--primary-dark)]"
              >
                {topic}
              </span>
            ))}
          </section>

          {/* News Grid */}
          <section className="mb-4.5 flex flex-col items-start justify-between gap-4.5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
                Cobertura completa
              </p>
              <h2 className="m-0 font-heading text-[clamp(1.5rem,2.8vw,2.4rem)] font-bold text-[#f6fbff]">
                Todas as notícias da seção
              </h2>
            </div>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            {news.length > 0 ? (
              news.map((noticia, index) => (
                <NewsCard key={noticia.id} noticia={noticia} featured={index === 0} />
              ))
            ) : (
              <div className="col-span-full rounded-[24px] border border-dashed border-[rgba(15,92,192,0.2)] bg-white/72 p-7 text-center text-[var(--muted)]">
                Nenhuma publicação encontrada nesta seção.
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
