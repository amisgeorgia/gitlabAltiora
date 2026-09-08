"use client"


import Link from "next/link"
import { Button } from "../ui/Button"

export function FormationNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-blue-950 dark:text-white mb-4">Formation introuvable</h1>
      <Link href="/formations">
        <Button>Retour au catalogue</Button>
      </Link>
    </div>
  );
}