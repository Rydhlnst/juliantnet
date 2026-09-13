import assert from "node:assert/strict"
import test from "node:test"
import { HOME_SECTION_ORDER, mergeHomeSectionContent, moveSection } from "@/lib/home-content"
import { buildHomeSections } from "@/lib/services/home-content"

test("merges persisted hero fields without dropping required defaults", () => {
  const content = mergeHomeSectionContent("hero", { heading: "Internet untuk semua" })

  assert.equal(content.heading, "Internet untuk semua")
  assert.equal(content.primaryCtaHref, "#coverage")
  assert.equal(content.benefitOne, "Internet unlimited")
})

test("discards unknown persisted fields", () => {
  const content = mergeHomeSectionContent("hero", { heading: "Updated", unknown: "unsafe" })

  assert.equal(content.heading, "Updated")
  assert.equal("unknown" in content, false)
})

test("returns every supported home section in canonical order", () => {
  const sections = buildHomeSections([])

  assert.deepEqual(sections.map((section) => section.key), HOME_SECTION_ORDER)
  assert.equal(sections.every((section) => section.isVisible), true)
})

test("moves a selected section one position earlier", () => {
  assert.deepEqual(moveSection(["hero", "coverage", "network"], "network", "up"), ["hero", "network", "coverage"])
})

test("keeps the default CTA link when persisted CTA content is partial", () => {
  const content = mergeHomeSectionContent("final-cta", { heading: "Get connected" })

  assert.equal(content.heading, "Get connected")
  assert.equal(content.ctaHref, "/cek-coverage")
})
