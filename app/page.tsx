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
import layout from "./home-page.module.css"
import referenceTheme from "./home-reference-overrides.module.css"

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
        <section key={section.key} className={layout.heroSection}>
          <div className={`${layout.container} ${layout.heroGrid}`}>
            <div>
              <p className={layout.eyebrow}>{c.eyebrow}</p>
              <h1 className={layout.heroTitle}>{c.heading}</h1>
              <p className={layout.heroBody}>{c.body}</p>
              <div className={layout.heroProof}>
                {[c.benefitOne, c.benefitTwo, c.benefitThree].map((item) => (
                  <span key={item}><Check className="size-4" />{item}</span>
                ))}
              </div>
              <div className={layout.heroActions}>
                <Link className={`${layout.primaryButton} ${layout.heroAction}`} href={c.primaryCtaHref}>
                  {c.primaryCtaLabel}<ArrowRight className="size-4" />
                </Link>
                <Link className={`${layout.secondaryButton} ${layout.heroAction}`} href={c.secondaryCtaHref}>{c.secondaryCtaLabel}</Link>
              </div>
            </div>
            <div className={layout.heroVisual}>
              <Image src={c.imageSrc} alt={c.imageAlt} fill priority sizes="(max-width: 800px) 100vw, 52vw" unoptimized={c.imageSrc.startsWith("http")} />
              <div className={layout.heroMetric}>
                <strong>{plans.length} pilihan</strong>
                <span>Paket internet yang siap disesuaikan dengan kebutuhanmu.</span>
              </div>
            </div>
          </div>
        </section>
      )
    }

    if (section.key === "coverage") {
      return (
        <section key={section.key} id="coverage" className={`${layout.darkSection} ${layout.coverageSection}`}>
          <div className={`${layout.container} ${layout.coverageGrid}`}>
            <div className={layout.coverageCopy}>
              <p className={layout.eyebrow}>{c.eyebrow}</p>
              <h2>{c.heading}</h2>
              <p>Masukkan lokasi kamu untuk mendapatkan hasil awal coverage dan rekomendasi koneksi yang sesuai.</p>
            </div>
            <div className={layout.coverageCard}><CoverageChecker /></div>
          </div>
        </section>
      )
    }

    if (section.key === "use-cases") {
      const items = [c.itemOne, c.itemTwo, c.itemThree, c.itemFour]
      return (
        <section key={section.key} className={`${layout.section} ${layout.useCasesSection}`}>
          <div className={layout.container}>
            <p className={layout.eyebrow}>{c.eyebrow}</p>
            <div className={layout.sectionHeader}>
              <h2 className={layout.sectionTitle}>{c.heading}</h2>
              <p className={layout.sectionIntro}>Pilihan koneksi yang dibuat untuk ritme rumah, kerja, dan aktivitas digitalmu.</p>
            </div>
            <div className={layout.useCasesGrid}>
              {items.map((item, index) => <article key={item} className={layout.useCase}><span>0{index + 1}</span><p>{item}</p></article>)}
            </div>
          </div>
        </section>
      )
    }

    if (section.key === "network") {
      const features = [[Router, c.featureOne], [RadioTower, c.featureTwo], [Wrench, c.featureThree], [Headphones, c.featureFour]] as const
      return (
        <section key={section.key} className={layout.networkSection}>
          <div className={`${layout.container} ${layout.networkGrid}`}>
            <div className={layout.networkVisual}>
              <Image src={c.imageSrc} alt={c.imageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized={c.imageSrc.startsWith("http")} />
            </div>
            <div>
              <p className={layout.eyebrow}>{c.eyebrow}</p>
              <h2 className={layout.sectionTitle}>{c.heading}</h2>
              <div className={layout.featureGrid}>{features.map(([Icon, label]) => <div key={label} className={layout.feature}><Icon className="size-5" /><p>{label}</p></div>)}</div>
            </div>
          </div>
        </section>
      )
    }

    if (section.key === "installation") {
      const steps = [c.stepOne, c.stepTwo, c.stepThree, c.stepFour, c.stepFive, c.stepSix]
      return (
        <section key={section.key} className={`${layout.darkSection} ${layout.installationSection}`}>
          <div className={layout.container}>
            <p className={layout.eyebrow}>{c.eyebrow}</p>
            <h2 className={layout.sectionTitle}>{c.heading}</h2>
            <ol className={layout.stepsGrid}>{steps.map((item, index) => <li key={item} className={layout.step}><span>0{index + 1}</span><p>{item}</p></li>)}</ol>
          </div>
        </section>
      )
    }

    if (section.key === "final-cta") {
      return (
        <section key={section.key} className={layout.finalCtaSection}>
          <div className={`${layout.container} text-center`}>
            <p className={layout.eyebrow}>{c.eyebrow}</p>
            <h2>{c.heading}</h2>
            <Link className={layout.finalCtaButton} href={c.ctaHref}>{c.ctaLabel}</Link>
          </div>
        </section>
      )
    }

    return null
  }

  return (
    <div className={`${layout.homePage} ${referenceTheme.theme}`}>
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
    </div>
  )
}

function PlansSection({ plans, settings }: { plans: Awaited<ReturnType<typeof getPublicPlans>>; settings: Awaited<ReturnType<typeof getPublicSettings>> }) {
  return (
    <section className={layout.plansSection}>
      <div className={layout.container}>
        <div className={layout.sectionHeader}>
          <div><p className={layout.eyebrow}>Paket internet</p><h2 className={layout.sectionTitle}>Pilih kecepatan sesuai ritmemu.</h2></div>
          <Link className="text-sm font-bold text-primary" href="/paket-internet">Bandingkan semua paket <ArrowRight className="ml-1 inline size-4" /></Link>
        </div>
        <div className={layout.plansGrid}>{plans.map((plan) => <PlanCard key={plan.id} plan={plan} settings={settings} />)}</div>
      </div>
    </section>
  )
}

function FaqSection({ faqs }: { faqs: Awaited<ReturnType<typeof getPublicFaqs>> }) {
  return (
    <section className={layout.faqSection}>
      <div className={`${layout.container} ${layout.faqGrid}`}>
        <div><p className={layout.eyebrow}>FAQ</p><h2 className={layout.sectionTitle}>Jawaban sebelum terhubung.</h2></div>
        <Accordion className="gap-3" multiple>
          {faqs.map((faq) => <AccordionItem key={faq.id} value={faq.id}><AccordionTrigger className="px-5 py-5 text-left text-sm font-bold">{faq.question}</AccordionTrigger><AccordionContent className="px-5 leading-7 text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
  )
}
