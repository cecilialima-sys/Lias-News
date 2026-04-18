import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsCard } from "@/components/news-card"
import { NeuralBackground } from "@/components/neural-background"
import { getLatestNoticias } from "@/lib/noticias"
import { weeklyReports } from "@/lib/reports"

export default function HomePage() {
  const latestNews = getLatestNoticias(3)

  return (
    <>
      <NeuralBackground />
      <div className="relative z-[1] mx-auto w-[min(1180px,calc(100%-32px))] py-6 pb-10">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="mb-7 grid gap-5 md:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-10 shadow-[var(--shadow)] backdrop-blur-sm">
              <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
                Portal acadêmico de notícias e educação
              </p>
              <h2 className="m-0 max-w-[12ch] font-heading text-[clamp(2rem,4vw,3.8rem)] font-bold leading-none">
                Informação confiável sobre o futuro da saúde orientado por inteligência artificial.
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                Este é o portal informativo da <strong>Liga de Inteligência Artificial na Saúde (LIAS)</strong>,
                criado para divulgar notícias, pesquisas, aplicações clínicas e conteúdos educativos sobre tecnologia aplicada à saúde.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#ultimas-noticias"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-dark)] to-[var(--success)] px-4.5 font-bold text-white no-underline"
                >
                  Ver últimas notícias
                </Link>
                <Link
                  href="/ai-health"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(15,92,192,0.18)] bg-white/68 px-4.5 font-bold no-underline"
                >
                  Explorar IA na Saúde
                </Link>
              </div>
            </div>

            <aside className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] backdrop-blur-sm">
              <div className="rounded-[22px] bg-gradient-to-br from-[rgba(8,66,98,0.98)] via-[rgba(17,124,161,0.96)] to-[rgba(24,185,127,0.94)] p-4.5 text-white">
                <span className="mb-2 block text-[0.78rem] font-bold uppercase tracking-wider text-black">
                  Foco do portal
                </span>
                <strong className="text-[1.2rem] leading-snug">IA, saúde digital e inovação acadêmica</strong>
              </div>
              <div className="mt-4.5 grid gap-3.5">
                {[
                  { icon: "+", title: "Atualizações semanais", desc: "Estrutura pronta para publicar novas matérias com rapidez." },
                  { icon: "AI", title: "Curadoria temática", desc: "Separação entre tendências gerais de IA e aplicações em saúde." },
                  { icon: "LAB", title: "Perfil científico", desc: "Visual acadêmico inspirado em portais de notícias e pesquisa." },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="grid grid-cols-[auto_1fr] items-start gap-3.5 rounded-[22px] border border-[rgba(15,92,192,0.08)] bg-white/68 p-4"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-gradient-to-br from-[rgba(85,216,232,0.24)] to-[rgba(24,185,127,0.20)] text-[0.88rem] font-extrabold text-[var(--primary-dark)]">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="m-0 font-heading font-bold">{item.title}</h3>
                      <p className="m-0 leading-relaxed text-[var(--muted)]">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </aside>
          </section>

          {/* Highlights Section */}
          <section className="mb-8 grid gap-5 md:grid-cols-3">
            {[
              {
                tag: "Sobre a liga",
                title: "LIAS conecta inovação, ensino e saúde",
                desc: "A liga promove o debate sobre o uso responsável da inteligência artificial em cenários como diagnóstico, pesquisa científica, gestão hospitalar e apoio à decisão clínica. A LIAS é composta por discentes dos cursos da área da saúde e da Ciência da Computação da UNIFAL-MG, fortalecendo uma formação interdisciplinar voltada à inovação."
              },
              {
                tag: "Linhas editoriais",
                title: "Duas frentes para acompanhar o setor",
                desc: "Acompanhe um fluxo de notícias sobre ferramentas, pesquisas e mercado de IA, além de uma cobertura dedicada às transformações da inteligência artificial na saúde."
              },
              {
                tag: "Publicação simples",
                title: "Pronto para crescer com a liga",
                desc: "As matérias são carregadas a partir de um arquivo central, facilitando a manutenção semanal do portal."
              }
            ].map((item) => (
              <article
                key={item.tag}
                className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6.5 shadow-[var(--shadow)] backdrop-blur-sm"
              >
                <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
                  {item.tag}
                </p>
                <h3 className="m-0 font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--muted)]">{item.desc}</p>
              </article>
            ))}
          </section>

          <section className="mb-8">
            <div className="mb-4.5 flex flex-col items-start justify-between gap-4.5 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
                  Relatórios da semana
                </p>
                <h2 className="m-0 font-heading text-[clamp(1.5rem,2.8vw,2.4rem)] font-bold text-[#f6fbff]">
                  PDFs publicados no portal
                </h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {weeklyReports.map((report) => (
                <article
                  key={report.id}
                  className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6.5 shadow-[var(--shadow)] backdrop-blur-sm"
                >
                  <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
                    {report.categoria}
                  </p>
                  <h3 className="m-0 font-heading text-lg font-bold">
                    {report.titulo} • {report.periodo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[var(--muted)]">{report.descricao}</p>
                  <a
                    href={report.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-bold text-[#7be4ef] no-underline hover:underline"
                  >
                    Abrir relatório em PDF
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* Latest News Section */}
          <section id="ultimas-noticias" className="mb-4.5 flex flex-col items-start justify-between gap-4.5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
                Últimas notícias
              </p>
              <h2 className="m-0 font-heading text-[clamp(1.5rem,2.8vw,2.4rem)] font-bold text-[#f6fbff]">
                Destaques recentes do portal
              </h2>
            </div>
            <Link href="/ai-news" className="font-bold text-[#7be4ef] no-underline hover:underline">
              Ver cobertura completa
            </Link>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            {latestNews.map((noticia, index) => (
              <NewsCard key={noticia.id} noticia={noticia} featured={index === 0} />
            ))}
          </section>

          {/* Dual Panels */}
          <section className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6.5 shadow-[var(--shadow)] backdrop-blur-sm">
              <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
                Atualizações em Inteligência Artificial
              </p>
              <h3 className="m-0 font-heading text-lg font-bold">
                Ferramentas, pesquisas e tendências do mercado
              </h3>
              <p className="mt-2 leading-relaxed text-[var(--muted)]">
                Novos modelos, agentes inteligentes, regulações e pesquisas emergentes em IA para manter estudantes e docentes atualizados.
              </p>
              <Link href="/ai-news" className="mt-4 inline-block font-bold text-[#7be4ef] no-underline hover:underline">
                Ir para a seção
              </Link>
            </article>
            <article className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6.5 shadow-[var(--shadow)] backdrop-blur-sm">
              <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
                Inteligência Artificial na Saúde
              </p>
              <h3 className="m-0 font-heading text-lg font-bold">
                Diagnóstico, enfermagem, hospitais e ciência aplicada
              </h3>
              <p className="mt-2 leading-relaxed text-[var(--muted)]">
                Conteúdos sobre uso da IA em hospitais, apoio clínico, eficiência operacional e estudos científicos na área da saúde.
              </p>
              <Link href="/ai-health" className="mt-4 inline-block font-bold text-[#7be4ef] no-underline hover:underline">
                Ir para a seção
              </Link>
            </article>
          </section>

          {/* Editor Note */}
          <section className="mt-8 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6.5 shadow-[var(--shadow)] backdrop-blur-sm">
            <p className="mb-2 text-[0.78rem] font-bold uppercase tracking-wider text-[var(--primary)]">
              Publicação contínua
            </p>
            <h3 className="m-0 font-heading text-lg font-bold">
              Leitura das matérias dentro do portal
            </h3>
            <p className="mt-2 leading-relaxed text-[var(--muted)]">
              Cada notícia agora pode ser aberta em uma página interna do site, mantendo a experiência de navegação da LIAS
              e exibindo data, área temática e referência da publicação no próprio portal.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
