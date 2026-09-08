"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";

export function FormationsHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0D1322] rounded-[2.5rem] p-8 md:p-12 lg:p-16 mb-12 flex flex-col-reverse lg:flex-row items-center gap-12 text-white shadow-2xl border border-white/5"
    >
      <div className="flex-1 text-center lg:text-left">
        <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-700 dark:text-gold-400 font-bold text-sm tracking-wider uppercase mb-6">
          NOS FORMATIONS
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 dark:text-white leading-tight mb-6">
          Développez les <br />
          <span className="text-gold-500">compétences de demain.</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
          Des programmes certifiants conçus par des experts pour propulser votre carrière et structurer la croissance de votre organisation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link href="#catalogue" className="px-6 py-3.5 bg-blue-950 text-white rounded-xl font-semibold hover:bg-blue-900 transition-colors flex items-center shadow-lg">
            Explorer le catalogue <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="#tarifs" className="px-6 py-3.5 bg-white dark:bg-slate-700 text-blue-950 dark:text-white border border-slate-200 dark:border-slate-600 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm">
            Consulter nos tarifs
          </Link>
        </div>
      </div>

      <div className="flex-1 relative w-full max-w-lg mx-auto">
        <div className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-4/3 shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
            alt="Formation en cours"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-10 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
            <CheckCircle2 className="h-6 w-6 text-blue-950 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-blue-950 dark:text-white">Certification</div>
          </div>
        </div>

        <div className="absolute top-1/4 -right-6 bg-white dark:bg-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 z-10 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gold-500 border-2 border-white flex items-center justify-center text-white">
              <Star className="h-4 w-4 fill-current" />
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-blue-950 dark:text-white">98% de satisfaction</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}