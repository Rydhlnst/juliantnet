import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Headphones, RadioTower, Router, Wrench } from "lucide-react"
import { CoverageChecker } from "@/components/coverage-checker"
import { PlanCard } from "@/components/plan-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getHomeContent } from "@/lib/services/home-content"
import type { HomeSection } from "@/lib/home-content"
import { getPublicFaqs, getPublicPlans, getPublicSettings } from "@/lib/services/public"

export const metadata: Metadata = {
  title: "Internet Cepat untuk Rumah & Bisnis",
  description: "Internet WiFi cepat dan stabil untuk rumah dan bisnis. Cek coverage, bandingkan paket, dan daftar pemasangan online.",
  alternates: { canonical: "/" },
}

export default async function Home() {
  const [plans, faqs, settings, home] = await Promise.all([
    getPublicPlans(),
    getPublicFaqs(),
    getPublicSettings(),
    getHomeContent(),
  ])
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  const renderSection = (section: HomeSection) => {
    const c = section.content
    if (!section.isVisible || section.key === "footer") return null

    if (section.key === "hero") {
      return (
        <section key={section.key} className="overflow-hidden border-b border-border/70 bg-background">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[minmax(0,.88fr)_minmax(420px,1.12fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
            <div className="max-w-xl">
              <p className="eyebrow">{c.eyebrow}</p>
              <h1 className="mt-5 whitespace-pre-line text-5xl font-black leading-[.98] tracking-[-.065em] sm:text-6xl lg:text-[4.65rem]">{c.heading}</h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">{c.body}</p>
              <div className="mt-8 grid gap-3 text-sm font-semibold sm:grid-cols-3 sm:gap-5">
                {[c.benefitOne, c.benefitTwo, c.benefitThree].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-primary" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90" href={c.primaryCtaHref}>
                  {c.primaryCtaLabel}
                  <ArrowRight className="size-4" />
                </Link>
                <Link className="inline-flex h-12 items-center rounded-full border border-border bg-background px-6 text-sm font-bold transition hover:border-primary hover:text-primary" href={c.secondaryCtaHref}>
                  {c.secondaryCtaLabel}
                </Link>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-border/70 bg-muted shadow-[0_24px_70px_-32px_rgba(16,33,63,.45)]">
              <Image src={c.imageSrc} alt={c.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 58vw" unoptimized={c.imageSrc.startsWith("http")} className="object-cover" />
            </div>
          </div>
        </section>
      )
    }

    if (section.key === "coverage") {
      return (
        <section key={section.key} id="coverage" className="bg-secondary px-5 py-16 text-secondary-foreground sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-16">
            <div className="max-w-md">
              <p className="eyebrow text-accent">{c.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl">{c.heading}</h2>
              <p className="mt-5 text-sm leading-7 text-secondary-foreground/65">Masukkan lokasi kamu untuk mendapatkan hasil awal coverage dan rekomendasi koneksi yang sesuai.</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white p-5 text-foreground shadow-2xl shadow-black/10 sm:p-7">
              <CoverageChecker />
            </div>
          </div>
        </section>
      )
    }

    if (section.key === "use-cases") {
      return (
        <section key={section.key} className="border-b border-border/70 bg-muted/35 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="eyebrow">{c.eyebrow}</p>
            <div className="mt-6 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <h2 className="max-w-lg text-3xl font-black leading-tight tracking-[-.045em] sm:text-4xl">{c.heading}</h2>
              <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-[1.25rem] border border-border bg-background sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                {[c.itemOne, c.itemTwo, c.itemThree, c.itemFour].map((item, index) => (
                  <div key={item} className={index > 1 ? "border-t border-border p-6 text-sm font-bold leading-6" : "p-6 text-sm font-bold leading-6"}>
                    <span className="mb-8 block text-xs font-black tracking-[.16em] text-primary">0{index + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }

    if (section.key === "network") {
      const features = [[Router, c.featureOne], [RadioTower, c.featureTwo], [Wrench, c.featureThree], [Headphones, c.featureFour]] as const
      return (
        <section key={section.key} className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-20">
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-border/70 bg-muted shadow-[0_24px_70px_-32px_rgba(16,33,63,.45)]">
              <Image src={c.imageSrc} alt={c.imageAlt} fill sizes="(max-width: 1024px) 100vw, 55vw" unoptimized={c.imageSrc.startsWith("http")} className="object-cover" />
            </div>
            <div className="max-w-xl">
              <p className="eyebrow">{c.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-.045em] sm:text-4xl">{c.heading}</h2>
              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                {features.map(([Icon, label]) => (
                  <div key={label} className="border-t border-border pt-4">
                    <Icon className="size-5 text-primary" />
                    <p className="mt-4 text-sm font-bold leading-6">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }

    if (section.key === "installation") {
      const steps = [c.stepOne, c.stepTwo, c.stepThree, c.stepFour, c.stepFive, c.stepSix]
      return (
        <section key={section.key} className="border-y border-white/10 bg-secondary py-20 text-secondary-foreground sm:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="eyebrow text-accent">{c.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-[-.045em] sm:text-4xl">{c.heading}</h2>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">
              {steps.map((item, index) => (
                <li key={item} className="border-t border-accent/70 pt-4">
                  <span className="text-xs font-black tracking-[.16em] text-accent">0{index + 1}</span>
                  <p className="mt-4 text-sm font-bold leading-6">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )
    }

    if (section.key === "final-cta") {
      return (
        <section key={section.key} className="bg-primary px-5 py-20 text-primary-foreground sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary-foreground/70">{c.eyebrow}</p>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-[-.055em] sm:text-5xl">{c.heading}</h2>
            <Link className="mt-9 inline-flex h-12 items-center rounded-full bg-background px-6 text-sm font-bold text-foreground shadow-sm transition hover:bg-background/90" href={c.ctaHref}>{c.ctaLabel}</Link>
          </div>
        </section>
      )
    }

    return null
  }

  return (
    <>
      <SiteHeader />
      <main id="main">
        {home.filter((section) => section.key !== "footer").map((section) => (
          <div key={section.key}>
            {renderSection(section)}
            {section.key === "coverage" && <PlansSection plans={plans} settings={settings} />}
            {section.key === "network" && <FaqSection faqs={faqs} />}
          </div>
        ))}
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

function PlansSection({ plans, settings }: { plans: Awaited<ReturnType<typeof getPublicPlans>>; settings: Awaited<ReturnType<typeof getPublicSettings>> }) {
  return (
    <section className="border-b border-border/70 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Paket internet</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-4xl">Pilih kecepatan sesuai ritmemu.</h2>
          </div>
          <Link className="text-sm font-bold text-primary transition hover:text-primary/75" href="/paket-internet">Bandingkan semua paket <ArrowRight className="ml-1 inline size-4" /></Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{plans.map((plan) => <PlanCard key={plan.id} plan={plan} settings={settings} />)}</div>
      </div>
    </section>
  )
}

function FaqSection({ faqs }: { faqs: Awaited<ReturnType<typeof getPublicFaqs>> }) {
  return (
    <section className="border-b border-border/70 bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.75fr_1.25fr] lg:gap-20 lg:px-8">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 max-w-sm text-3xl font-black leading-tight tracking-[-.045em] sm:text-4xl">Jawaban sebelum terhubung.</h2>
        </div>
        <Accordion className="gap-3" multiple>
          {faqs.map((faq) => <AccordionItem className="rounded-[1rem] border border-border bg-card px-5 transition-colors data-[open]:border-primary/40" key={faq.id} value={faq.id}><AccordionTrigger className="py-5 text-left text-sm font-bold">{faq.question}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
  )
}