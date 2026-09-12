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
  { name: "Hemat", speed: "50 Mbps", price: "RpXXX.XXX", devices: "1–3 perangkat", description: "Untuk browsing, belajar online, media sosial, dan streaming HD di rumah.", benefits: ["Internet unlimited", "Router WiFi", "Dukungan lokal"] },
  { name: "Keluarga", speed: "100 Mbps", price: "RpXXX.XXX", devices: "3–6 perangkat", description: "Untuk streaming 4K, rapat online, kelas digital, dan perangkat keluarga yang terhubung bersamaan.", benefits: ["Internet unlimited", "Router WiFi", "Instalasi terjadwal"], popular: true },
  { name: "Gamer", speed: "200 Mbps", price: "RpXXX.XXX", devices: "5–10 perangkat", description: "Untuk gaming, unduhan besar, streaming, dan rumah dengan banyak perangkat aktif.", benefits: ["Internet unlimited", "Router WiFi", "Prioritas penjadwalan"] },
  { name: "Ultra", speed: "500 Mbps", price: "RpXXX.XXX", devices: "Penggunaan berat", description: "Untuk kreator, keluarga besar, smart home, dan aktivitas online berintensitas tinggi.", benefits: ["Internet unlimited", "Router WiFi", "Konsultasi kebutuhan"] },
]