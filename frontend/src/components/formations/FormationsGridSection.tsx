"use client"

import {motion} from "framer-motion"
import { FormationCard, Formation } from "./FormationsCard"

interface FormationsGridProps {
  formations: Formation[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};


export function FormationsGridSection({ formations }: FormationsGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
    >
      {formations.map((formation) => (
        <FormationCard key={formation.id} formation={formation} />
      ))}
    </motion.div>
  );
}