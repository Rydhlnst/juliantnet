import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { faqs } from "@/data/faqs"
export const metadata: Metadata = { title: "FAQ", description: "Pertanyaan umum tentang internet Internet Cepat, pemasangan, dan coverage.", alternates: { canonical: "/faq" } }
export default function FaqPage() { return <><SiteHeader /><main className="mx-auto max-w-3xl px-5 py-16"><p className="text-sm font-black tracking-[.16em] text-primary uppercase">FAQ</p><h1 className="mt-3 text-5xl font-black tracking-tight">Pertanyaan yang sering ditanyakan.</h1><Accordion className="mt-10 rounded-2xl border border-border bg-white px-5" multiple>{faqs.map(([question, answer]) => <AccordionItem value={question} key={question}><AccordionTrigger className="py-5 text-base no-underline hover:no-underline">{question}</AccordionTrigger><AccordionContent className="leading-7 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></main><SiteFooter /></> }