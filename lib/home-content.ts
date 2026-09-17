export const HOME_SECTION_ORDER = [
  "hero",
  "coverage",
  "use-cases",
  "network",
  "installation",
  "final-cta",
  "footer",
] as const

export type HomeSectionKey = (typeof HOME_SECTION_ORDER)[number]
export type HomeFieldType = "text" | "textarea" | "link" | "image"
export type HomeSectionContent = Record<string, string>

export type HomeField = {
  key: string
  label: string
  type: HomeFieldType
  help?: string
}

export const HOME_SECTION_LABELS: Record<HomeSectionKey, string> = {
  hero: "Hero",
  coverage: "Coverage",
  "use-cases": "Use cases",
  network: "Network",
  installation: "Installation",
  "final-cta": "Final CTA",
  footer: "Footer",
}

export const HOME_SECTION_FIELDS: Record<HomeSectionKey, readonly HomeField[]> = {
  hero: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "heading", label: "Heading", type: "textarea" },
    { key: "body", label: "Body", type: "textarea" },
    { key: "benefitOne", label: "Benefit 1", type: "text" },
    { key: "benefitTwo", label: "Benefit 2", type: "text" },
    { key: "benefitThree", label: "Benefit 3", type: "text" },
    { key: "primaryCtaLabel", label: "Primary CTA label", type: "text" },
    { key: "primaryCtaHref", label: "Primary CTA link", type: "link", help: "Use a page path or #section anchor." },
    { key: "secondaryCtaLabel", label: "Secondary CTA label", type: "text" },
    { key: "secondaryCtaHref", label: "Secondary CTA link", type: "link", help: "Use a page path or #section anchor." },
    { key: "imageSrc", label: "Image path", type: "image", help: "Use an existing public path such as /brand/image.png." },
    { key: "imageAlt", label: "Image alt text", type: "text" },
  ],
  coverage: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "heading", label: "Heading", type: "textarea" },
  ],
  "use-cases": [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "heading", label: "Heading", type: "textarea" },
    { key: "itemOne", label: "Item 1", type: "text" },
    { key: "itemTwo", label: "Item 2", type: "text" },
    { key: "itemThree", label: "Item 3", type: "text" },
    { key: "itemFour", label: "Item 4", type: "text" },
  ],
  network: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "heading", label: "Heading", type: "textarea" },
    { key: "featureOne", label: "Feature 1", type: "text" },
    { key: "featureTwo", label: "Feature 2", type: "text" },
    { key: "featureThree", label: "Feature 3", type: "text" },
    { key: "featureFour", label: "Feature 4", type: "text" },
    { key: "imageSrc", label: "Image path", type: "image", help: "Use an existing public path such as /brand/image.png." },
    { key: "imageAlt", label: "Image alt text", type: "text" },
  ],
  installation: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "heading", label: "Heading", type: "textarea" },
    { key: "stepOne", label: "Step 1", type: "text" },
    { key: "stepTwo", label: "Step 2", type: "text" },
    { key: "stepThree", label: "Step 3", type: "text" },
    { key: "stepFour", label: "Step 4", type: "text" },
    { key: "stepFive", label: "Step 5", type: "text" },
    { key: "stepSix", label: "Step 6", type: "text" },
  ],
  "final-cta": [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "heading", label: "Heading", type: "textarea" },
    { key: "ctaLabel", label: "CTA label", type: "text" },
    { key: "ctaHref", label: "CTA link", type: "link", help: "Use a page path or #section anchor." },
  ],
  footer: [
    { key: "footerCopy", label: "Footer copy", type: "textarea" },
    { key: "contactLabel", label: "Contact link label", type: "text" },
  ],
}

export const HOME_SECTION_DEFAULTS: Record<HomeSectionKey, HomeSectionContent> = {
  hero: {
    eyebrow: "Internet WiFi cepat untuk rumah & bisnis",
    heading: "WiFi cepat. Stabil. Tanpa ribet.",
    body: "Nikmati koneksi untuk streaming, gaming, belajar, bekerja, dan operasional usaha kecil tanpa rebutan bandwidth.",
    benefitOne: "Internet unlimited",
    benefitTwo: "Instalasi terjadwal",
    benefitThree: "Dukungan responsif",
    primaryCtaLabel: "Cek Coverage",
    primaryCtaHref: "#coverage",
    secondaryCtaLabel: "Lihat Paket",
    secondaryCtaHref: "/paket-internet",
    imageSrc: "/brand/juliant-hero.jpeg",
    imageAlt: "Pelanggan Juliant.net menikmati internet cepat di ruang kerja",
  },
  coverage: {
    eyebrow: "Cek jaringan di lokasimu",
    heading: "Temukan koneksi untuk rumah atau bisnismu.",
  },
  "use-cases": {
    eyebrow: "Untuk aktivitas sehari-hari",
    heading: "Satu koneksi untuk kerja, belajar, hiburan, dan usaha.",
    itemOne: "Streaming tanpa buffering",
    itemTwo: "Gaming lebih stabil",
    itemThree: "Meeting tanpa putus",
    itemFour: "Belajar lebih nyaman",
  },
  network: {
    eyebrow: "Jaringan & pemasangan",
    heading: "Langkah yang jelas dari coverage sampai WiFi aktif.",
    featureOne: "Internet sesuai kebutuhan",
    featureTwo: "Informasi coverage jelas",
    featureThree: "Instalasi terjadwal",
    featureFour: "Bantuan mudah dijangkau",
    imageSrc: "/brand/juliant-connectivity.jpeg",
    imageAlt: "Pelanggan Juliant.net terhubung dengan aktivitas digital",
  },
  installation: {
    eyebrow: "Cara mulai",
    heading: "Internetan dalam enam langkah.",
    stepOne: "Cek coverage",
    stepTwo: "Pilih paket",
    stepThree: "Isi data",
    stepFour: "Konfirmasi",
    stepFive: "Teknisi datang",
    stepSix: "Internet aktif",
  },
  "final-cta": {
    eyebrow: "Siap terhubung?",
    heading: "Bawa koneksi yang lebih nyaman ke lokasimu.",
    ctaLabel: "Cek Coverage",
    ctaHref: "/cek-coverage",
  },
  footer: {
    footerCopy: "Internet WiFi cepat dan stabil untuk rumah dan bisnis.",
    contactLabel: "Chat WhatsApp",
  },
}

export type HomeSection = {
  id: string
  key: HomeSectionKey
  label: string
  content: HomeSectionContent
  sortOrder: number
  isVisible: boolean
}

export function allowedHomeContentFields(key: HomeSectionKey) {
  return HOME_SECTION_FIELDS[key].map((field) => field.key)
}

export function pickAllowedFields(key: HomeSectionKey, persisted: Record<string, string> | null | undefined) {
  const allowed = new Set(allowedHomeContentFields(key))
  return Object.fromEntries(Object.entries(persisted ?? {}).filter(([field]) => allowed.has(field)))
}

const LEGACY_IMAGE_PATHS = new Set(["/brand/internet-cepat-character.png", "/brand/internet-cepat-infrastructure.png", "/brand/internet-cepat-workspace.png"])
const REPLACEMENT_IMAGE_PATHS: Partial<Record<HomeSectionKey, string>> = {
  hero: "/brand/juliant-hero.jpeg",
  network: "/brand/juliant-connectivity.jpeg",
}

export function mergeHomeSectionContent(key: HomeSectionKey, persisted: Record<string, string> | null | undefined) {
  const content = { ...HOME_SECTION_DEFAULTS[key], ...pickAllowedFields(key, persisted) }
  if (content.imageSrc && LEGACY_IMAGE_PATHS.has(content.imageSrc) && REPLACEMENT_IMAGE_PATHS[key]) {
    content.imageSrc = REPLACEMENT_IMAGE_PATHS[key]
  }
  return content
}

export function moveSection<T extends string>(sections: T[], selected: T, direction: "up" | "down") {
  const currentIndex = sections.indexOf(selected)
  if (currentIndex < 0) return sections
  const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
  if (nextIndex < 0 || nextIndex >= sections.length) return sections
  const next = [...sections]
  ;[next[currentIndex], next[nextIndex]] = [next[nextIndex], next[currentIndex]]
  return next
}
