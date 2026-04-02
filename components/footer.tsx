export function Footer() {
  return (
    <footer className="mt-8 flex flex-col gap-5 border-t border-[rgba(15,92,192,0.14)] px-1.5 pt-6 text-[#f6fbff] sm:flex-row sm:justify-between">
      <div>
        <p className="mb-1.5 font-extrabold tracking-wider text-[var(--text)]">
          Liga de Inteligência Artificial na Saúde (LIAS)
        </p>
        <p className="text-[#f6fbff]">UNIFAL-MG</p>
      </div>
      <div>
        <p className="text-[#f6fbff]">Ano de criação do portal</p>
        <strong className="text-[#f6fbff]">2026</strong>
      </div>
    </footer>
  )
}
