"use client"

import * as React from "react"
import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"

export type SiteLanguage = "en" | "zh"

const LANGUAGE_STORAGE_KEY = "cherie-site-language"
const LANGUAGE_EVENT = "cherie-language-change"

function readLanguagePreference(): SiteLanguage {
  if (typeof window === "undefined") {
    return "zh"
  }

  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en"
    ? "en"
    : "zh"
}

function writeLanguagePreference(language: SiteLanguage) {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  window.dispatchEvent(
    new CustomEvent<SiteLanguage>(LANGUAGE_EVENT, { detail: language })
  )
}

export function useLanguagePreference() {
  const [language, setLanguage] = React.useState<SiteLanguage>("zh")

  React.useEffect(() => {
    setLanguage(readLanguagePreference())

    function handleStorage(event: StorageEvent) {
      if (event.key === LANGUAGE_STORAGE_KEY) {
        setLanguage(readLanguagePreference())
      }
    }

    function handleLanguageChange(event: Event) {
      setLanguage((event as CustomEvent<SiteLanguage>).detail ?? "zh")
    }

    window.addEventListener("storage", handleStorage)
    window.addEventListener(LANGUAGE_EVENT, handleLanguageChange)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange)
    }
  }, [])

  const setPreferredLanguage = React.useCallback((next: SiteLanguage) => {
    setLanguage(next)
    writeLanguagePreference(next)
  }, [])

  return [language, setPreferredLanguage] as const
}

export function LanguageToggle() {
  const [language, setLanguage] = useLanguagePreference()
  const nextLanguage = language === "en" ? "zh" : "en"

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 gap-1.5 rounded-full px-2 font-mono text-[11px] uppercase"
      aria-label={`Switch language to ${
        nextLanguage === "en" ? "English" : "Chinese"
      }`}
      title={language === "en" ? "Switch to 中文" : "Switch to English"}
      onClick={() => setLanguage(nextLanguage)}
    >
      <Languages className="h-4 w-4" />
      <span aria-hidden="true">{language === "en" ? "EN" : "中"}</span>
      <span className="sr-only">
        {language === "en" ? "Switch to Chinese" : "Switch to English"}
      </span>
    </Button>
  )
}
