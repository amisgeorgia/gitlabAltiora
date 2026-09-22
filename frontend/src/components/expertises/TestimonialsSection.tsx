"use client";

import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/data/expertises.data";

export function TestimonialsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mx-auto max-w-350">
        {/* Conteneur encadré clair pour harmoniser avec la section précédente */}
        <div className="relative w-full overflow-hidden rounded-3xl sm:rounded-[36px] lg:rounded-[44px] bg-[#F8FAFC] border border-slate-200/80 p-8 sm:p-12 lg:p-16 shadow-xs">
          
          <div className="relative z-10 w-full">
            {/* Header */}
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#0B1F4D] tracking-tight">
                Avis Clients
              </h2>
            </div>
            
            {/* Grille des témoignages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TESTIMONIALS.map((review, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white p-7 lg:p-8 rounded-2xl shadow-xs border border-slate-200/60 flex flex-col justify-between hover:shadow-xl transition-all duration-300 overflow-hidden min-h-65"
                >
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#C59B27] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  
                  <div>
                    <h3 className="font-bold text-[#0B1F4D] mb-2 text-center text-lg group-hover:text-[#C59B27] transition-colors duration-300">
                      {review.name}
                    </h3>
                    
                    <div className="flex justify-center text-[#C59B27] mb-5 gap-1 group-hover:scale-105 transition-transform duration-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm text-center italic leading-relaxed flex-1 flex items-center justify-center">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}