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
    // <div className="dark:bg-slate-900 transition-colors duration-300 pb-10 space-y-8 sm:space-y-12">
    <main className="w-full pt-10 sm:pt-14 lg:pt-16 dark:bg-slate-900 transition-colors duration-300 pb-10 space-y-8 sm:space-y-12">
      <HeroSection />
      <FilterBar />
      <FeaturedArticle article={featuredArticle} />
      <ArticleGrid articles={gridArticles} />
      <Pagination />
      <NewsletterSection />
      <CtaSection />
    </main>
    // </div>
  );
}