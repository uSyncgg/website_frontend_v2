import { SeoData } from '../SeoData/SeoData';
import styles from './LegalDocument.module.css';

export const LEGAL_CONTACT_EMAIL = "contact@usync.gg";

// mailto link, optionally pre-filling the subject line the legal pages ask people to use.
export const LegalEmail = ({ subject }) => (
    <a href={`mailto:${LEGAL_CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}>
        {LEGAL_CONTACT_EMAIL}
    </a>
);

// Scrolls to a section without changing the URL, so it adds no history entry and isn't seen as a page view.
const jumpTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// In-page link to another section of the same document.
export const SectionRef = ({ to, children }) => <a href={`#${to}`} onClick={jumpTo(to)}>{children}</a>;

// Highlighted callout box, such as the summary at the top of a document.
export const LegalNotice = ({ children }) => <div className={styles.notice}>{children}</div>;

// Boxed block of contact details.
export const LegalContactCard = ({ children }) => <div className={styles.contactCard}>{children}</div>;

// Bold label introducing the list that follows it.
export const LegalListLabel = ({ children }) => <p className={styles.listLabel}>{children}</p>;

// Paragraph in capitals, for disclaimers and limitations the law requires to be conspicuous.
export const LegalCaps = ({ children }) => <p className={styles.caps}>{children}</p>;

// Table with column headings. `rows` is an array of cell arrays, in the same order as `columns`;
// the first cell of each row must be unique, since it is used as the row key.
// `twoColumn` gives the first column a fixed width for label/description tables.
export const LegalTable = ({ columns, rows, twoColumn = false }) => (
    <div className={twoColumn ? `${styles.tableWrap} ${styles.twoColumn}` : styles.tableWrap}>
        <table>
            <thead>
                <tr>
                    {columns.map((column) => <th key={column} scope="col">{column}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((cells) => (
                    <tr key={cells[0]}>
                        {cells.map((cell, i) => <td key={i}>{cell}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Shared layout for legal pages (Terms of Service, Privacy Policy): header, sticky table of
// contents, and numbered sections. `sections` is [{ id, number, title, content }].
export const LegalDocument = ({ title, seoDescription, canonicalPath, lastUpdated, intro, sections }) => (
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
                                <SectionRef to={section.id}>
                                    <span className={styles.tocNumber}>{section.number}.</span> {section.title}
                                </SectionRef>
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
