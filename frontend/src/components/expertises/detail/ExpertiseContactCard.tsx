"use client";

import React, { useState } from "react";
import { Send, Phone, Mail, CheckCircle2, Loader2 } from "lucide-react";

interface ExpertiseContactCardProps {
  expertiseTitle: string;
}

export function ExpertiseContactCard({ expertiseTitle }: ExpertiseContactCardProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulation d'envoi rapide
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 800);
  };

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-[#08183A] border border-white/10 p-6 sm:p-8 text-white sticky top-28 sr-fade-up">
      {/* En-tête de la carte */}
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
        Intéressé par cette expertise ?
      </h3>
      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
        Laissez-nous un message et un de nos experts vous recontactera rapidement.
      </p>

      {/* Formulaire */}
      {isSubmitted ? (
        <div className="py-8 px-4 rounded-xl bg-[#0B2556] border border-[#DDA83A]/40 text-center flex flex-col items-center justify-center animate-fade-in mb-6">
          <CheckCircle2 className="w-12 h-12 text-[#DDA83A] mb-3" />
          <h4 className="text-base font-bold text-white mb-1">Message envoyé !</h4>
          <p className="text-xs text-slate-300">
            Merci. Notre équipe dédiée à l&apos;expertise <span className="text-[#DDA83A] font-semibold">{expertiseTitle}</span> vous répondra dans les plus brefs délais.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          {/* Nom complet */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold text-slate-200 mb-1.5"
            >
              Nom complet
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Votre nom"
              className="w-full rounded-xl bg-[#0E2350] border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#DDA83A] focus:ring-1 focus:ring-[#DDA83A] transition-all"
            />
          </div>

          {/* Email professionnel */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-slate-200 mb-1.5"
            >
              Email professionnel
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="nom@entreprise.com"
              className="w-full rounded-xl bg-[#0E2350] border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#DDA83A] focus:ring-1 focus:ring-[#DDA83A] transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-slate-200 mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Décrivez brièvement votre besoin..."
              className="w-full rounded-xl bg-[#0E2350] border border-white/15 px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#DDA83A] focus:ring-1 focus:ring-[#DDA83A] transition-all resize-none"
            />
          </div>

          {/* Bouton Envoyer sans shadow */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#DDA83A] hover:bg-[#c9952d] active:scale-[0.98] text-[#09152E] py-3.5 px-6 text-sm font-bold transition-all duration-300 disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <span>Envoyer</span>
                <Send className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Coordonnées directes en bas de carte */}
      <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
        <a
          href="tel:+261340710633"
          className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors group"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-[#DDA83A] group-hover:bg-[#DDA83A] group-hover:text-[#09152E] transition-all shrink-0">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>034 07 106 33</span>
        </a>

        <a
          href="mailto:contact@altioraconnect.mg"
          className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors group"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-[#DDA83A] group-hover:bg-[#DDA83A] group-hover:text-[#09152E] transition-all shrink-0">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">contact@altioraconnect.mg</span>
        </a>
      </div>
    </div>
  );
}

