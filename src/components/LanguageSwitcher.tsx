// src/components/LanguageSwitcher.tsx
"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Language } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage("en" as Language)}
        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
          language === "en"
            ? "bg-navy text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        title={t.language.english}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("dz" as Language)}
        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
          language === "dz"
            ? "bg-navy text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        title={t.language.darja}
      >
        DZ
      </button>
    </div>
  );
}
