import { Link } from "react-router";
import { SeoData } from "components/SeoData/SeoData";
import { articleList } from "pages/More/Articles/articlesData";
import styles from "./ArticleLayout.module.css";

const BASE_URL = "https://usync.gg";

const formatDate = (isoDate) =>
    new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

const JsonLd = ({ data }) => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
);

export const ArticleLayout = ({ article, takeaways, faqs, children }) => {
    const url = `${BASE_URL}/more/articles/${article.slug}`;
    const related = articleList
        .filter((a) => a.slug !== article.slug)
        .sort((a, b) => (b.category === article.category) - (a.category === article.category))
        .slice(0, 4);

    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.headline,
        description: article.description,
        image: [article.image],
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        author: {
            "@type": "Organization",
            name: "uSync",
            url: BASE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: "uSync",
            logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/favicon_png.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        keywords: article.keywords?.join(", "),
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Articles", item: `${BASE_URL}/more/articles` },
            { "@type": "ListItem", position: 3, name: article.name, item: url },
        ],
    };

    const faqLd = faqs?.length
        ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map(({ question, answer }) => ({
                  "@type": "Question",
                  name: question,
                  acceptedAnswer: { "@type": "Answer", text: answer },
              })),
          }
        : null;

    return (
        <div className="standardContainer">
            <SeoData
                title={article.title}
                description={article.description}
                canonicalPath={`/more/articles/${article.slug}`}
                image={article.image}
                type="article"
                publishedTime={article.datePublished}
                modifiedTime={article.dateModified}
                author="uSync"
            />
            <JsonLd data={articleLd} />
            <JsonLd data={breadcrumbLd} />
            {faqLd && <JsonLd data={faqLd} />}

            <article className={styles.article}>
                <header className={styles.header}>
                    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
                        <ol>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/more/articles">Articles</Link></li>
                            <li aria-current="page">{article.name}</li>
                        </ol>
                    </nav>

                    <p className={styles.eyebrow}>{article.category}</p>
                    <h1 className={styles.headline}>{article.headline}</h1>
                    <p className={styles.dek}>{article.dek}</p>

                    <div className={styles.byline}>
                        <img src="/favicon_png.png" alt="uSync logo" className={styles.avatar} />
                        <div className={styles.bylineText}>
                            <span className={styles.author}>uSync Team</span>
                            <span className={styles.dates}>
                                <time dateTime={article.datePublished}>
                                    {formatDate(article.datePublished)}
                                </time>
                                {article.dateModified !== article.datePublished && (
                                    <>
                                        {" · Updated "}
                                        <time dateTime={article.dateModified}>
                                            {formatDate(article.dateModified)}
                                        </time>
                                    </>
                                )}
                                {" · "}{article.readTime} min read
                            </span>
                        </div>
                    </div>
                </header>

                <figure className={styles.hero}>
                    <img src={article.image} alt={article.imageAlt} />
                    {article.imageCredit && (
                        <figcaption>Image Credit: {article.imageCredit}</figcaption>
                    )}
                </figure>

                {takeaways?.length > 0 && (
                    <aside className={styles.takeaways} aria-label="Key takeaways">
                        <h2>Key Takeaways</h2>
                        <ul>
                            {takeaways.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </aside>
                )}

                <div className={styles.body}>{children}</div>

                {faqs?.length > 0 && (
                    <section className={styles.faq} aria-label="Frequently asked questions">
                        <h2>Frequently Asked Questions</h2>
                        {faqs.map(({ question, answer }) => (
                            <div className={styles.faqItem} key={question}>
                                <h3>{question}</h3>
                                <p>{answer}</p>
                            </div>
                        ))}
                    </section>
                )}
            </article>

            <section className={styles.cta}>
                <div className={styles.ctaGlow} />
                <h2>Find Your Next Event on uSync</h2>
                <p>Leagues, LANs, tournaments, and wagers for every major title, all in one place.</p>
                <Link to="/games" className={styles.ctaButton}>Explore Events</Link>
            </section>

            <section className={styles.related} aria-label="More articles">
                <h2>More From uSync</h2>
                <div className={styles.relatedGrid}>
                    {related.map((a) => (
                        <Link
                            to={`/more/articles/${a.slug}`}
                            className={styles.relatedCard}
                            key={a.slug}
                        >
                            <img src={a.thumb} alt="" loading="lazy" />
                            <div className={styles.relatedInfo}>
                                <span className={styles.relatedCategory}>{a.category}</span>
                                <span className={styles.relatedTitle}>{a.headline}</span>
                                <span className={styles.relatedMeta}>{a.readTime} min read</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};
