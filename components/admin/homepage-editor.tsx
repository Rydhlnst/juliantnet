"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowDown, ArrowUp, Check, Eye, EyeOff, ExternalLink, RotateCcw, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  HOME_SECTION_FIELDS,
  HOME_SECTION_LABELS,
  moveSection,
  type HomeField,
  type HomeSection,
  type HomeSectionKey,
} from "@/lib/home-content"

type EditorState = "idle" | "loading" | "saving" | "reordering" | "saved" | "error"

function getErrorMessage(response: Response, fallback: string) {
  return response.json().then((body: { error?: string }) => body.error ?? fallback).catch(() => fallback)
}

export function HomepageEditor() {
  const [sections, setSections] = useState<HomeSection[]>([])
  const [selectedKey, setSelectedKey] = useState<HomeSectionKey>("hero")
  const [draft, setDraft] = useState<Record<string, string>>({})
  const [isVisible, setIsVisible] = useState(true)
  const [state, setState] = useState<EditorState>("loading")
  const [message, setMessage] = useState("Loading homepage sections…")

  const selected = useMemo(() => sections.find((section) => section.key === selectedKey) ?? null, [sections, selectedKey])
  const selectedIndex = sections.findIndex((section) => section.key === selectedKey)

  useEffect(() => {
    void loadSections()
  }, [])

  useEffect(() => {
    if (!selected) return
    setDraft(selected.content)
    setIsVisible(selected.isVisible)
  }, [selected])

  async function loadSections() {
    setState("loading")
    setMessage("Loading homepage sections…")
    try {
      const response = await fetch("/api/admin/website", { cache: "no-store" })
      if (!response.ok) throw new Error(await getErrorMessage(response, "Unable to load homepage sections."))
      const data = (await response.json()) as { sections: HomeSection[] }
      setSections(data.sections)
      setState("idle")
      setMessage("Choose a section to edit its content.")
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Unable to load homepage sections.")
    }
  }

  async function saveSelected() {
    if (!selected) return
    setState("saving")
    setMessage("Saving changes…")
    try {
      const response = await fetch(`/api/admin/website/${selected.key}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: draft, isVisible }),
      })
      if (!response.ok) throw new Error(await getErrorMessage(response, "Unable to save this section."))
      setSections((current) => current.map((section) => section.key === selected.key ? { ...section, content: draft, isVisible } : section))
      setState("saved")
      setMessage("Changes saved. Reload the public website to preview them.")
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Unable to save this section.")
    }
  }

  async function reorder(direction: "up" | "down") {
    const nextKeys = moveSection(sections.map((section) => section.key), selectedKey, direction)
    if (nextKeys.join(",") === sections.map((section) => section.key).join(",")) return
    const previous = sections
    const byKey = new Map(sections.map((section) => [section.key, section]))
    setSections(nextKeys.map((key, sortOrder) => ({ ...byKey.get(key)!, sortOrder })))
    setState("reordering")
    setMessage("Saving section order…")
    try {
      const response = await fetch("/api/admin/website/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: nextKeys }),
      })
      if (!response.ok) throw new Error(await getErrorMessage(response, "Unable to reorder sections."))
      setState("saved")
      setMessage("Section order saved.")
    } catch (error) {
      setSections(previous)
      setState("error")
      setMessage(error instanceof Error ? error.message : "Unable to reorder sections.")
    }
  }

  function updateField(field: string, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    if (state === "saved" || state === "error") setState("idle")
  }

  if (state === "loading" && sections.length === 0) {
    return <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">{message}</div>
  }

  if (state === "error" && sections.length === 0) {
    return <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8"><p className="font-semibold">{message}</p><Button className="mt-4" variant="outline" onClick={() => void loadSections()}><RotateCcw />Try again</Button></div>
  }

  return <div className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
    <aside className="rounded-2xl border border-border bg-card p-3">
      <div className="px-3 py-3"><p className="text-xs font-bold tracking-[.16em] text-primary uppercase">Homepage</p><p className="mt-1 text-sm text-muted-foreground">Structured content</p></div>
      <div className="space-y-1" role="tablist" aria-label="Homepage sections">{sections.map((section) => <button key={section.key} type="button" role="tab" aria-selected={selectedKey === section.key} onClick={() => setSelectedKey(section.key)} className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${selectedKey === section.key ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><span>{HOME_SECTION_LABELS[section.key]}</span>{section.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4 opacity-50" />}</button>)}</div>
      <Button className="mt-4 w-full" variant="outline" render={<a href="/" target="_blank" rel="noreferrer" />}><ExternalLink />Preview website</Button>
    </aside>
    {selected && <section className="min-w-0 rounded-2xl border border-border bg-card p-5 sm:p-7" aria-labelledby="editor-title">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5"><div><p className="text-xs font-bold tracking-[.16em] text-primary uppercase">{HOME_SECTION_LABELS[selected.key]}</p><h1 id="editor-title" className="mt-2 text-2xl font-black tracking-tight">Edit homepage section</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Update only the fields supported by this section. Changes are published immediately after saving.</p></div><div className="flex items-center gap-2"><Button variant="outline" size="icon" aria-label="Move section up" disabled={selectedIndex <= 0 || state === "reordering"} onClick={() => void reorder("up")}><ArrowUp /></Button><Button variant="outline" size="icon" aria-label="Move section down" disabled={selectedIndex < 0 || selectedIndex >= sections.length - 1 || state === "reordering"} onClick={() => void reorder("down")}><ArrowDown /></Button></div></div>
      <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3"><div className="flex items-center gap-3"><span className={`grid size-8 place-items-center rounded-lg ${isVisible ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}</span><div><p className="text-sm font-bold">Section visibility</p><p className="text-xs text-muted-foreground">Hidden sections are omitted from the public homepage.</p></div></div><Button type="button" variant={isVisible ? "secondary" : "outline"} onClick={() => setIsVisible((value) => !value)}>{isVisible ? "Visible" : "Hidden"}</Button></div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{HOME_SECTION_FIELDS[selected.key].map((field) => <FieldEditor key={field.key} field={field} value={draft[field.key] ?? ""} disabled={state === "saving"} onChange={(value) => updateField(field.key, value)} />)}</div>
      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-border pt-5"><Button onClick={() => void saveSelected()} disabled={state === "saving" || state === "reordering"}><Save />{state === "saving" ? "Saving…" : "Save changes"}</Button>{state === "saved" && <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"><Check className="size-4" />{message}</p>}{state === "error" && <p className="text-sm font-semibold text-destructive">{message}</p>}{state !== "saved" && state !== "error" && state !== "saving" && <p className="text-sm text-muted-foreground">{message}</p>}</div>
    </section>}
  </div>
}

function FieldEditor({ field, value, disabled, onChange }: { field: HomeField; value: string; disabled: boolean; onChange: (value: string) => void }) {
  const id = `home-field-${field.key}`
  return <label className="block" htmlFor={id}><span className="text-sm font-bold">{field.label}</span>{field.type === "textarea" ? <textarea id={id} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} rows={4} className="mt-2 flex min-h-24 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50" /> : <Input id={id} type={field.type === "link" ? "text" : "text"} value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="mt-2 h-10" />}{field.help && <span className="mt-1 block text-xs text-muted-foreground">{field.help}</span>}</label>
}
