"use client"

import { ContactHero } from "./ContactHero"
import { ContactInfo } from "./ContactInfo"
import { ContactForm } from "./ContactForm"

export function ContactClient() {
  return (
    <>
      <ContactHero />
      <div className="bg-slate-50 dark:bg-slate-900 py-10 overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}