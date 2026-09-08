import {Star} from "lucide-react"
import {motion} from "framer-motion"
import { TESTIMONIALS } from "@/data/expertises.data"


export function TestimonialsSection() {
  return (
    <div className="container mx-auto max-w-7xl mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white">Avis Clients</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((review, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gold-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <h3 className="font-bold text-blue-950 dark:text-white mb-2 text-center text-lg group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">{review.name}</h3>
            <div className="flex justify-center text-gold-500 mb-6 gap-1 group-hover:scale-110 transition-transform duration-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm text-center italic leading-relaxed flex-1 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              "{review.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}