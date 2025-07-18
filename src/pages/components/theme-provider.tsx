"use client"

import * as React from "react"

// Dummy ThemeProvider that just renders children to avoid errors
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
