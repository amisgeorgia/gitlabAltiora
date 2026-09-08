import { Metadata } from "next";
import { notFound } from "next/navigation";
import { articlesList } from "@/data/articles";
import { ArticleHero } from "@/components/actualites/detail/ArticleHero";
import { ShareSidebar } from "@/components/actualites/detail/ShareSidebar";
import { ArticleContent } from "@/components/actualites/detail/ArticleContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Génération des chemins statiques à la compilation (SSG)
export async function generateStaticParams() {
  return articlesList.map((article) => ({
    slug: article.id,
  }));
}

// Génération dynamique des métadonnées (SEO)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesList.find((a) => a.id === slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articlesList.find((a) => a.id === slug);

  if (!article) {
    notFound(); // Redirige automatiquement vers la page 404
  }

  return (
    <article className="bg-white dark:bg-slate-900 pb-24 transition-colors duration-300">
      <ArticleHero article={article} />

      <div className="container mx-auto px-4 sm:px-8 max-w-4xl mt-16 flex flex-col md:flex-row gap-12">
        <ShareSidebar />
        <ArticleContent article={article} />
      </div>
    </article>
  );
}