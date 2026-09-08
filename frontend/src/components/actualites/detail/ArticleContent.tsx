import { Article } from "@/data/articles";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const hasSections = article.content && article.content.length > 0;

  return (
    <div className="flex-1">
      <div className="prose prose-lg prose-slate max-w-none dark:prose-invert">
        {/* Chapeau / Extrait de l'article */}
        {article.excerpt && (
          <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-8">
            {article.excerpt}
          </p>
        )}

        {/* Parcours des sections dynamiques */}
        {hasSections ? (
          article.content?.map((section, index) => (
            <div key={index} className="mb-8">
              {/* Titre de section (optionnel) */}
              {section.heading && (
                <h3 className="text-2xl font-bold text-blue-950 dark:text-white mt-8 mb-4">
                  {section.heading}
                </h3>
              )}

              {/* Paragraphes de la section */}
              {section.paragraphs?.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}

              {/* Affichage de la citation (Quote) sous le premier bloc */}
              {index === 0 && article.quote && (
                <blockquote className="border-l-4 border-gold-500 pl-6 italic text-slate-700 dark:text-slate-300 my-8 font-medium">
                  &ldquo;{article.quote}&rdquo;
                </blockquote>
              )}
            </div>
          ))
        ) : (
          /* Sécurité si un article n'a pas encore de 'content' renseigné */
          <div>
            <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              Cet article aborde le sujet :{" "}
              <strong className="text-blue-950 dark:text-white">{article.title}</strong>.
            </p>
            {article.quote && (
              <blockquote className="border-l-4 border-gold-500 pl-6 italic text-slate-700 dark:text-slate-300 my-8">
                &ldquo;{article.quote}&rdquo;
              </blockquote>
            )}
          </div>
        )}
      </div>
    </div>
  );
}