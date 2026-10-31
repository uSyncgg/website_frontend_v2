import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ArticleLayout, LoadingWheel, SeoData } from "components";
import { ArticleBody } from "components/ArticleBody/ArticleBody";
import { getPublishedArticle } from "services/adminArticles";
import { NotFound } from "pages/NotFound";

// /more/articles/:slug for articles an admin published from /admin/analytics (the hand-written
// articles have their own routes, which match first).
export const PublishedArticle = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [state, setState] = useState('loading');

    useEffect(() => {
        let cancelled = false;
        setState('loading');
        getPublishedArticle(slug)
            .then(a => { if (!cancelled) { setArticle(a); setState('ready'); } })
            .catch(() => { if (!cancelled) setState('missing'); });
        return () => { cancelled = true; };
    }, [slug]);

    if (state === 'loading') return <div className="standardContainer"><SeoData title="Article" canonicalPath={`/more/articles/${slug}`} /><LoadingWheel /></div>;
    if (state === 'missing') return <NotFound />;

    return (
        <ArticleLayout article={article} takeaways={article.takeaways} faqs={article.faqs}>
            <ArticleBody body={article.body} />
        </ArticleLayout>
    );
};
