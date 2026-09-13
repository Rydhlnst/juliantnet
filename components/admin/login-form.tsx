"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AdminLoginForm() { const router = useRouter(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [pending, setPending] = useState(false); async function submit(event: FormEvent) { event.preventDefault(); setPending(true); setError(""); const result = await authClient.signIn.email({ email, password, callbackURL: "/admin" }); setPending(false); if (result.error) { setError("Email atau kata sandi tidak valid."); return } router.replace("/admin"); router.refresh() } return <form onSubmit={submit} className="space-y-5"><label className="grid gap-2 text-sm font-bold">Email<Input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label className="grid gap-2 text-sm font-bold">Kata sandi<Input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<Button type="submit" className="w-full" disabled={pending}>{pending ? "Memproses..." : "Masuk ke CMS"}</Button></form> }
