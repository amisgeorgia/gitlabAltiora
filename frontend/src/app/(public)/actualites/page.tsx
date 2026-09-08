import { Metadata } from "next";
import { articlesList } from "@/data/articles";
import { HeroSection } from "@/components/actualites/HeroSection";
import { FilterBar } from "@/components/actualites/FilterBar";
import { FeaturedArticle } from "@/components/actualites/FeaturedArticle";
import { ArticleGrid } from "@/components/actualites/ArticleGrid";
import { Pagination } from "@/components/actualites/Pagination";
import { NewsletterSection } from "@/components/actualites/NewsletterSection";
import { CtaSection } from "@/components/common/CtaSection";

export const metadata: Metadata = {
  title: "Actualités | ALTIORA PREST",
  description: "Plongez au cœur des tendances en matière de transformation digitale, d'intelligence artificielle et d'innovation d'entreprise.",
};

export default function ActualitesPage() {
  const featuredArticle = articlesList[0];
  const gridArticles = articlesList.slice(1, 7);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300 pb-10">
      <HeroSection />

      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        <FilterBar />
        <FeaturedArticle article={featuredArticle} />
        <ArticleGrid articles={gridArticles} />
        <Pagination />
      </div>

      <NewsletterSection />
      <CtaSection />
    </div>
  );
}