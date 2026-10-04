import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { HeaderImage, SeoData } from "components";
import styles from './Articles.module.css';
import problemThumb from 'assets/images/article_bubbles/article-thumb-the-problem-with-esports_9.6.26.webp';
import fixItThumb from 'assets/images/article_bubbles/article-thumb-how-we-fix-it_9.6.26.webp';
import provideThumb from 'assets/images/article_bubbles/article-thumb-what-we-provide_9.6.26.webp';
import joinLeagueThumb from 'assets/images/article_bubbles/article-thumb-how-to-join-esports-league_9.6.26.webp';
import esportsBetterThumb from 'assets/images/article_bubbles/article-thumb-how-esports-can-be-better_9.6.26.webp';
import uniqueThumb from 'assets/images/article_bubbles/article-thumb-why-usync-is-unique_9.6.26.webp';
import bo7Thumb from 'assets/images/article_bubbles/article-thumb-bo7-controller-settings_9.6.26.webp';
import dpiThumb from 'assets/images/article_bubbles/article-thumb-best-dpi-valorant_9.6.26.webp';
import ps5Thumb from 'assets/images/article_bubbles/article-thumb-enable-120hz-ps5_9.6.26.webp';
import tournamentsNearYouThumb from 'assets/images/article_bubbles/article-thumb-esports-tournaments-near-you_9.6.26.webp';
import joinTournamentThumb from 'assets/images/article_bubbles/article-thumb-join-online-gaming-tournament_9.6.26.webp';

const ARTICLES = [
    {
        path: "/more/articles/The-Problem-With-Esports",
        thumbnail: problemThumb,
        category: "Industry",
        title: "The Problem With Esports",
        excerpt: "Esports has grown into a billion-dollar industry, yet it remains deeply decentralized. Discover the core challenges facing players and organizations today.",
    },
    {
        path: "/more/articles/How-We-Fix-It",
        thumbnail: fixItThumb,
        category: "Platform",
        title: "How We Fix It",
        excerpt: "uSync is building the solution. Learn how we're tackling the fragmentation problem head-on with a unified esports platform.",
    },
    {
        path: "/more/articles/What-We-Provide",
        thumbnail: provideThumb,
        category: "Platform",
        title: "What We Provide",
        excerpt: "From leagues and LANs to wagers and head-to-head matchups, here's everything uSync brings to the esports community.",
    },
    {
        path: "/more/articles/How-to-Join-an-Esports-League",
        thumbnail: joinLeagueThumb,
        category: "Guide",
        title: "How to Join an Esports League",
        excerpt: "New to competitive esports? This step-by-step guide walks you through everything you need to know to find and join your first league.",
    },
    {
        path: "/more/articles/How-Esports-Can-Be-Better",
        thumbnail: esportsBetterThumb,
        category: "Industry",
        title: "How Esports Can Be Better",
        excerpt: "The esports industry has enormous untapped potential. Here's our vision for a more connected, accessible competitive gaming ecosystem.",
    },
    {
        path: "/more/articles/why-usync-is-unique",
        thumbnail: uniqueThumb,
        category: "Platform",
        title: "Why uSync Is Like No Other Esports Platform",
        excerpt: "uSync isn't your standard esports website. It's an aggregator that brings leagues, LANs, tournaments, wagers, and more into one easy-to-use hub.",
    },
    {
        path: "/more/articles/black-ops-7-best-controller-settings",
        thumbnail: bo7Thumb,
        category: "Guide",
        title: "Best Black Ops 7 Controller Settings for Better Aim",
        excerpt: "Start with the right BO7 controller baseline: sensitivity, deadzone, aim assist, and layout settings to improve your aim and movement immediately.",
    },
    {
        path: "/more/articles/best-dpi-valorant-sensitivity",
        thumbnail: dpiThumb,
        category: "Guide",
        title: "Best DPI for VALORANT and How to Find Your Sensitivity",
        excerpt: "Start with 800 DPI and 0.25–0.40 in-game sensitivity. Learn how to calculate eDPI and tune your setup with a simple repeatable test.",
    },
    {
        path: "/more/articles/how-to-enable-120hz-ps5",
        thumbnail: ps5Thumb,
        category: "Guide",
        title: "How to Enable 120Hz on PS5 and Fix 120 FPS Problems",
        excerpt: "Step-by-step: connect via HDMI, enable 120Hz output, choose performance mode, enable in-game settings, and troubleshoot if PS5 stays at 60Hz.",
    },
    {
        path: "/more/articles/esports-tournaments-near-me",
        thumbnail: tournamentsNearYouThumb,
        category: "Guide",
        title: "How to Find Esports Tournaments Near You",
        excerpt: "Search by game and location on uSync, check local venues, verify eligibility, confirm the organizer, and prepare for event day.",
    },
    {
        path: "/more/articles/how-to-join-online-gaming-tournaments",
        thumbnail: joinTournamentThumb,
        category: "Guide",
        title: "How to Join an Online Gaming Tournament",
        excerpt: "Choose your game and format, find a reputable event on uSync, read the rules, register, prepare your connection, check in early, and play.",
    },
];

const CATEGORIES = ["All", "Guide", "Industry", "Platform"];

export const Articles = () => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        return ARTICLES.filter((a) => {
            const matchesCategory = activeCategory === "All" || a.category === activeCategory;
            const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
            return matchesCategory && matchesSearch;
        });
    }, [search, activeCategory]);

    return (
        <div className="standardContainer">
            <SeoData
                title={"Articles"}
                description="uSync articles showcase the disorganization in esports and how uSync brings the community together. Check out uSync's articles to learn more!"
                canonicalPath={"/more/articles"}
            />

            <HeaderImage imageClass={"articlesPage"} title={"uSync Articles"} />

            <div className={styles.controlsBar}>
                <input
                    type="search"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                    aria-label="Search articles"
                />
                <div className={styles.filterButtons}>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ""}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {search.trim() && (
                <p className={styles.resultsCount}>
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search.trim()}&rdquo;
                </p>
            )}

            {filtered.length > 0 ? (
                <div className={styles.articlesGrid}>
                    {filtered.map((article) => (
                        <Link key={article.path} to={article.path} className={styles.card}>
                            <img
                                src={article.thumbnail}
                                alt={article.title}
                                className={styles.thumbnail}
                            />
                            <div className={styles.cardBody}>
                                <span className={styles.categoryTag}>{article.category}</span>
                                <h2 className={styles.cardTitle}>{article.title}</h2>
                                <p className={styles.cardExcerpt}>{article.excerpt}</p>
                                <span className={styles.readMore}>Read Article</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className={styles.noResults}>
                    <p>No articles found for &ldquo;{search.trim()}&rdquo;.</p>
                    <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className={styles.clearBtn}>
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
