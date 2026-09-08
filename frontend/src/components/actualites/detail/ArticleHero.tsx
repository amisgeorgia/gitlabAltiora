import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { Article } from "@/data/articles";

interface ArticleHeroProps {
  article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <div className="relative h-[60vh] min-h-100 w-full">
      <div className="absolute inset-0 bg-blue-950/40 z-10" />
      <Image
        src={article.images[0]}
        alt={article.title}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 z-20 flex items-end pb-16">
        <div className="container mx-auto px-4 sm:px-8 max-w-4xl">
          <Link
            href="/actualites"
            className="inline-flex items-center text-white hover:text-gold-400 transition-colors mb-6 drop-shadow-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux actualités
          </Link>
          <div className="mb-6 flex items-center space-x-4">
            <span className="px-4 py-1.5 bg-gold-500 text-blue-950 text-sm font-bold rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-white flex items-center text-sm font-medium drop-shadow-md">
              <Calendar className="h-4 w-4 mr-2" /> {article.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg max-w-4xl">
            {article.title}
          </h1>
        </div>
      </div>
    </div>
  );
}