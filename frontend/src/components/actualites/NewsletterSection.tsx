"use client"

import { Mail } from "lucide-react"

export function NewsletterSection() {
  return (
    <div className="w-full bg-[#0f172a] py-12 mb-12">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <Mail className="h-8 w-8 text-gold-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Restez informé
        </h2>
        <p className="text-slate-300 mb-10 text-lg">
          Recevez nos derniers articles, analyses et invitations à nos événements exclusifs directement dans votre boîte mail.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Votre adresse email"
            required
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gold-500 text-blue-950 font-bold rounded-xl hover:bg-gold-400 transition-colors shrink-0 shadow-lg shadow-gold-500/20"
          >
            S'abonner
          </button>
        </form>
      </div>
    </div>
  );
}