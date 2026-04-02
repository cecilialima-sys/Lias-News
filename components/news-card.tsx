import Link from "next/link"
import type { Noticia } from "@/lib/noticias"

interface NewsCardProps {
  noticia: Noticia
  featured?: boolean
}

export function NewsCard({ noticia, featured = false }: NewsCardProps) {
  const referenceLabel = noticia.fonte || noticia.referencia || "Fonte institucional"

  return (
    <article
      className={`
        flex flex-col gap-3.5 rounded-[28px] border border-[var(--border)] p-6 backdrop-blur-sm shadow-[var(--shadow)]
        ${featured 
          ? "col-span-2 bg-[linear-gradient(135deg,rgba(11,61,104,0.12),rgba(85,216,232,0.08),rgba(24,185,127,0.08)),#ffffff] max-md:col-span-1" 
          : "bg-[var(--surface)]"
        }
      `}
    >
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-br from-[rgba(85,216,232,0.12)] to-[rgba(24,185,127,0.12)] px-3 py-2 text-[0.76rem] font-extrabold uppercase tracking-wider text-[var(--primary-dark)]">
        {noticia.rotulo}
      </span>
      
      <div className="flex flex-wrap gap-2.5 text-[0.88rem] text-[var(--muted)]">
        <span>{noticia.data}</span>
        <span>{noticia.area}</span>
      </div>
      
      <h3 className="m-0 font-heading text-[1.3rem] font-bold leading-tight">
        {noticia.titulo}
      </h3>
      
      <p className="m-0 leading-relaxed text-[var(--muted)]">
        {noticia.resumo}
      </p>
      
      <p className="flex flex-wrap gap-2.5 text-[0.88rem] text-[var(--muted)]">
        {referenceLabel}
      </p>
      
      <Link
        href={`/noticia/${noticia.id}`}
        className="mt-auto font-bold text-[var(--primary)] no-underline hover:underline"
      >
        Ler matéria no portal
      </Link>
    </article>
  )
}
