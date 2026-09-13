import type { ReactNode } from "react"

declare global {
  type LayoutProps<_Route extends string = string> = { children: ReactNode }
  type PageProps<_Route extends string = string> = { searchParams: Promise<Record<string, string | string[] | undefined>> }
  type RouteContext<_Route extends string = string> = { params: Promise<Record<string, string>> }
}

export {}
