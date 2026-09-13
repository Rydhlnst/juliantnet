export function generateWhatsAppUrl(phone: string, message: string) {
  const normalizedPhone = phone.replace(/\D/g, "").replace(/^0/, "62")
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`
}

export function packageWhatsAppMessage(brandName: string, planName: string, speedMbps: number) {
  return `Halo ${brandName}, saya tertarik dengan paket ${planName} ${speedMbps} Mbps. Bisa dibantu cek coverage di lokasi saya?`
}
