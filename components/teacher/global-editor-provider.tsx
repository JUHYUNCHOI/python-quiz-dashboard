"use client"

import { GlobalTeacherEditorButton } from "./global-editor-button"

/**
 * Thin client wrapper — rendered inside the server layout so it can
 * access the AuthContext and conditionally show the floating editor.
 */
export function GlobalEditorProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <GlobalTeacherEditorButton />
    </>
  )
}
