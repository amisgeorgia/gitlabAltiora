import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ArticleNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-blue-950 dark:text-white mb-4">
        Article introuvable
      </h1>
      <Link href="/actualites">
        <Button>Retour aux actualités</Button>
      </Link>
    </div>
  );
}