"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Masukkan nama lengkap."),
  phone: z.string().trim().min(8, "Masukkan nomor WhatsApp yang valid."),
  email: z.string().trim().email("Masukkan email yang valid."),
  address: z.string().trim().min(6, "Masukkan alamat pemasangan."),
})

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm({ defaultValues: { name: "", phone: "", email: "", address: "" }, validators: { onChange: registrationSchema }, onSubmit: async () => setSubmitted(true) })
  if (submitted) return <div className="rounded-2xl bg-primary/10 p-6 text-primary"><h2 className="text-xl font-black">Data awal siap dikonfirmasi.</h2><p className="mt-2 text-sm leading-6">Permintaan ini masih berupa simulasi. Hubungkan form ke CRM atau sistem pendaftaran sebelum menerima data pelanggan nyata.</p></div>
  return <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); void form.handleSubmit() }} noValidate>
    <div className="grid gap-5 sm:grid-cols-2"><form.Field name="name">{(field) => <label className="grid gap-2 text-sm font-bold">Nama lengkap<Input value={field.state.value} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="Nama Anda" />{field.state.meta.errors.length > 0 && <span className="text-xs text-destructive">Periksa nama lengkap Anda.</span>}</label>}</form.Field><form.Field name="phone">{(field) => <label className="grid gap-2 text-sm font-bold">Nomor WhatsApp<Input inputMode="tel" value={field.state.value} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="08xxxxxxxxxx" />{field.state.meta.errors.length > 0 && <span className="text-xs text-destructive">Periksa nomor WhatsApp Anda.</span>}</label>}</form.Field></div>
    <form.Field name="email">{(field) => <label className="grid gap-2 text-sm font-bold">Email<Input type="email" value={field.state.value} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="nama@email.com" />{field.state.meta.errors.length > 0 && <span className="text-xs text-destructive">Periksa email Anda.</span>}</label>}</form.Field>
    <form.Field name="address">{(field) => <label className="grid gap-2 text-sm font-bold">Alamat pemasangan<Input value={field.state.value} onBlur={field.handleBlur} onChange={(event) => field.handleChange(event.target.value)} placeholder="Alamat lengkap" />{field.state.meta.errors.length > 0 && <span className="text-xs text-destructive">Periksa alamat pemasangan Anda.</span>}</label>}</form.Field>
    <Button type="submit" className="h-11 rounded-xl px-5 font-bold">Kirim data awal</Button>
  </form>
}