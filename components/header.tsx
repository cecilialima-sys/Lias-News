"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ai-news", label: "Atualizações em Inteligência Artificial" },
  { href: "/ai-health", label: "Inteligência Artificial na Saúde" },
]

interface HeaderProps {
  compact?: boolean
}

export function Header({ compact = false }: HeaderProps) {
  const pathname = usePathname()
  const [isCondensed, setIsCondensed] = useState(false)

  useEffect(() => {
    if (compact) return

    const handleScroll = () => {
      setIsCondensed(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [compact])

  const condensed = compact || isCondensed

  return (
    <header
      className={`
        sticky top-0 z-10 mb-7 border border-[var(--border)] backdrop-blur-xl
        transition-all duration-200
        ${condensed 
          ? "rounded-b-[22px] bg-white/92 p-3 px-4 shadow-[0_18px_36px_rgba(10,43,92,0.12)]" 
          : "rounded-[28px] bg-white/76 p-5 shadow-[var(--shadow)]"
        }
      `}
    >
      <div className="flex flex-wrap items-center justify-between gap-5">
        <Link
          href="/"
          className="flex items-center gap-4 no-underline"
          aria-label="Página inicial da LIAS"
        >
          <div
            className={`
              grid place-items-center rounded-[22px] font-heading text-white font-bold tracking-wider
              bg-gradient-to-br from-[var(--success-dark)] via-[var(--primary)] to-[var(--accent)]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
              transition-all duration-200
              ${condensed ? "h-[54px] w-[54px] rounded-[18px] text-[0.98rem]" : "h-[68px] w-[68px] text-[1.1rem]"}
            `}
          >
            LIAS
          </div>
          <div>
            <p
              className={`
                m-0 font-bold uppercase tracking-wider text-[var(--primary)]
                ${condensed ? "mb-0.5 text-[0.72rem]" : "mb-2 text-[0.78rem]"}
              `}
            >
              Liga de Inteligência Artificial na Saúde
            </p>
          </div>
        </Link>

        <div
          className={`
            flex items-center justify-center border-none bg-transparent
            ${condensed ? "min-h-[72px] p-2.5 px-3.5" : "min-h-[92px] p-3 px-4"}
          `}
        >
          <Image
            src="https://www.unifal-mg.edu.br/portal2/wp-content/uploads/sites/52/2018/04/cropped-logo-unifal-1.png"
            alt="Logo oficial da UNIFAL-MG"
            width={200}
            height={64}
            className={`block w-auto object-contain ${condensed ? "max-h-12" : "max-h-16"}`}
          />
        </div>
      </div>

      <nav className={`flex flex-wrap gap-2.5 ${condensed ? "mt-3.5" : "mt-5"}`} aria-label="Navegação principal">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                rounded-full font-bold no-underline transition-all duration-200
                ${condensed ? "px-3.5 py-2.5" : "px-4 py-3"}
                ${isActive
                  ? "bg-gradient-to-br from-[var(--primary-dark)] to-[var(--success)] text-white"
                  : "text-[var(--muted)] hover:bg-gradient-to-br hover:from-[var(--primary-dark)] hover:to-[var(--success)] hover:text-white"
                }
              `}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
