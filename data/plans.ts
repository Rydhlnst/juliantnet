export type Plan = {
  name: string
  speed: string
  price: string
  devices: string
  description: string
  benefits: string[]
  popular?: boolean
}

export const plans: Plan[] = [
  { name: "Hemat", speed: "50 Mbps", price: "RpXXX.XXX", devices: "1–3 perangkat", description: "Untuk browsing, media sosial, dan streaming HD.", benefits: ["Internet unlimited", "Router WiFi", "Dukungan lokal"] },
  { name: "Keluarga", speed: "100 Mbps", price: "RpXXX.XXX", devices: "3–6 perangkat", description: "Untuk streaming 4K, kelas online, dan kerja dari rumah.", benefits: ["Internet unlimited", "Router WiFi", "Instalasi terjadwal"], popular: true },
  { name: "Gamer", speed: "200 Mbps", price: "RpXXX.XXX", devices: "5–10 perangkat", description: "Untuk gaming, unduhan besar, dan rumah pintar.", benefits: ["Internet unlimited", "Router WiFi", "Prioritas penjadwalan"] },
  { name: "Ultra", speed: "500 Mbps", price: "RpXXX.XXX", devices: "Penggunaan berat", description: "Untuk kreator, keluarga besar, dan kebutuhan intensif.", benefits: ["Internet unlimited", "Router WiFi", "Konsultasi kebutuhan"] },
]