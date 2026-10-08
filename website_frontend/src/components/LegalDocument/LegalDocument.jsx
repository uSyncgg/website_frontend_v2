import { useEffect } from 'react';
import { SeoData } from '../SeoData/SeoData';
import styles from './LegalDocument.module.css';

export const LEGAL_CONTACT_EMAIL = "contact@usync.gg";

// mailto link, optionally pre-filling the subject line the legal pages ask people to use.
export const LegalEmail = ({ subject }) => (
    <a href={`mailto:${LEGAL_CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}>
        {LEGAL_CONTACT_EMAIL}
    </a>
);

// In-page link to another section of the same document.
export const SectionRef = ({ to, children }) => <a href={`#${to}`}>{children}</a>;

// Shared layout for legal pages (Terms of Service, Privacy Policy): header, sticky table of
// contents, and numbered sections. `sections` is [{ id, number, title, content }].
export const LegalDocument = ({ title, seoDescription, canonicalPath, lastUpdated, intro, sections }) => {
    // The page renders client-side, so the browser can't jump to a #section on first load by itself.
    // A timeout (not requestAnimationFrame, which pauses in background tabs) runs after ScrollToTop's reset.
    useEffect(() => {
        const id = window.location.hash.slice(1);
        if (!id) return;
        const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="standardContainer">
            <SeoData title={title} description={seoDescription} canonicalPath={canonicalPath} />

            <div className={styles.legalPage}>
                <header className={styles.header}>
                    <p className={styles.eyebrow}>Legal</p>
                    <h1 className={styles.pageTitle}>{title}</h1>
                    <span className={styles.titleAccent} />
                    <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
                </header>

                <div className={styles.layout}>
                    <nav className={styles.toc} aria-label={`${title} sections`}>
                        <p className={styles.tocLabel}>On this page</p>
                        <ol>
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <a href={`#${section.id}`}>
                                        <span className={styles.tocNumber}>{section.number}.</span> {section.title}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <article className={styles.content}>
                        {intro}

                        {sections.map((section) => (
                            <section key={section.id} id={section.id} className={styles.section}>
                                <h2>
                                    <span className={styles.sectionNumber}>{section.number}.</span> {section.title}
                                </h2>
                                {section.content}
                            </section>
                        ))}
                    </article>
                </div>
            </div>
        </div>
    );
};
