import assert from "node:assert/strict"
import test from "node:test"
import { getAdminShellMainClassName } from "@/lib/admin-layout"

test("keeps dashboard content clear of the fixed sidebar", () => {
  const className = getAdminShellMainClassName()

  assert.match(className, /(?:^|\s)lg:pl-72(?:\s|$)/)
  assert.doesNotMatch(className, /lg:pl-\[17rem\]/)
})
