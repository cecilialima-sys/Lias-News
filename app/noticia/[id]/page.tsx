import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NeuralBackground } from "@/components/neural-background"
import { getNoticiaById, noticias } from "@/lib/noticias"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return noticias.map((noticia) => ({
    id: noticia.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const noticia = getNoticiaById(id)

  if (!noticia) {
    return {
      title: "Notícia não encontrada | LIAS News",
    }
  }

  return {
    title: `${noticia.titulo} | LIAS News`,
    description: noticia.resumo,
  }
}

export default async function NoticiaPage({ params }: PageProps) {
  const { id } = await params
  const noticia = getNoticiaById(id)

  if (!noticia) {
    notFound()
  }

  const referenceLabel = noticia.fonte || noticia.referencia || "Fonte institucional"
  const originLink = noticia.categoria === "ai-news" ? "/ai-news" : "/ai-health"
  const originLabel = noticia.categoria === "ai-news"
    ? "Voltar para Atualizações em Inteligência Artificial"
    : "Voltar para Inteligência Artificial na Saúde"

  const paragraphs = noticia.conteudo || [noticia.resumo]

  return (
    <>
      <NeuralBackground />
      <div className="relative z-[1] mx-auto w-[min(1180px,calc(100%-32px))] py-6 pb-10">
        <Header compact />

        <main>
          <article className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur-sm">
            {/* Article Header */}
            <div className="mb-6 grid gap-3.5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-br from-[rgba(85,216,232,0.12)] to-[rgba(24,185,127,0.12)] px-3 py-2 text-[0.76rem] font-extrabold uppercase tracking-wider text-[var(--primary-dark)]">
                {noticia.rotulo}
              </span>
              <div className="flex flex-wrap gap-2.5 text-[0.92rem] text-[var(--muted)]">
                <span>{noticia.data}</span>
                <span>{noticia.area}</span>
              </div>
              <h1 className="m-0 font-heading text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight">
                {noticia.titulo}
              </h1>
              <p className="text-[var(--muted)]">{noticia.resumo}</p>
            </div>

            {/* Article Body */}
            <div className="grid gap-4.5">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="m-0 text-[1.02rem] leading-relaxed text-[var(--muted)]">
                  {paragraph}
                </p>
              ))}

              {/* Reference */}
              <div className="mt-2.5 border-t border-[rgba(15,92,192,0.12)] pt-4.5">
                <p className="text-[var(--muted)]">
                  <strong>Fonte ou referência:</strong> {referenceLabel}
                </p>
              </div>
            </div>

            {/* Article Actions */}
            <div className="mt-7 flex flex-wrap gap-3">
              {noticia.fonteUrl && (
                <a
                  href={noticia.fonteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(15,92,192,0.18)] bg-white/68 px-4.5 font-bold no-underline"
                >
                  Ver fonte original
                </a>
              )}
              <Link
                href={originLink}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(15,92,192,0.18)] bg-white/68 px-4.5 font-bold no-underline"
              >
                {originLabel}
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-dark)] to-[var(--success)] px-4.5 font-bold text-white no-underline"
              >
                Voltar para Home
              </Link>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}
