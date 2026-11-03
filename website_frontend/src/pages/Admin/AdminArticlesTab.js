import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { LoadingWheel } from "components";
import { useAuth } from "hooks";
import { createArticle, deleteArticle, getAdminArticles, uploadArticleImage } from "services/adminArticles";
import { getApiErrorMessage, getLoadErrorMessage } from "utils/apiError";
import styles from "./AdminAnalytics.module.css";

// Articles tab of /admin/analytics: publish a new article (shown at /more/articles/<slug>) and
// remove ones published here. Hand-written articles in the codebase aren't listed.

const CATEGORIES = ['Guide', 'Industry', 'Platform'];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const today = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD in local time

const slugify = (text) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const lines = (text) => text.split('\n').map(l => l.trim()).filter(Boolean);

// Server errors get the shared wording; local errors (mock storage, file reads) carry their own message.
const errorText = (err, fallback) => (err?.response ? getApiErrorMessage(err) : err?.message || fallback);

const EMPTY_FORM = {
    headline: '', title: '', slug: '', category: 'Guide', dek: '', description: '',
    imageAlt: '', imageCredit: '', readTime: '5', keywords: '', takeaways: '', body: '',
};

const REQUIRED = [
    ['headline', 'headline'], ['title', 'page title'], ['slug', 'URL slug'], ['dek', 'summary line'],
    ['description', 'SEO description'], ['imageAlt', 'hero image description'], ['body', 'article body'],
];

export const AdminArticlesTab = () => {
    const { session } = useAuth();
    const token = session?.access_token;

    const [articles, setArticles] = useState(null);
    const [loadError, setLoadError] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [slugEdited, setSlugEdited] = useState(false);
    const [faqs, setFaqs] = useState([]);
    const [hero, setHero] = useState(null);
    const [thumb, setThumb] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null); // { kind: 'error' | 'success', text }
    const bodyRef = useRef(null);

    const load = useCallback(() => {
        getAdminArticles(token)
            .then(list => { setArticles(list); setLoadError(null); })
            .catch(setLoadError);
    }, [token]);

    useEffect(() => { load(); }, [load]);

    const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

    const onHeadline = (e) => {
        const headline = e.target.value;
        setForm(f => ({ ...f, headline, ...(slugEdited ? {} : { slug: slugify(headline) }) }));
    };

    const pickImage = (setter) => (e) => {
        const file = e.target.files?.[0] ?? null;
        if (file && file.size > MAX_IMAGE_BYTES) {
            setMessage({ kind: 'error', text: 'Images must be 5 MB or smaller.' });
            e.target.value = '';
            return;
        }
        setter(file);
    };

    const insertBodyImage = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        if (file.size > MAX_IMAGE_BYTES) {
            setMessage({ kind: 'error', text: 'Images must be 5 MB or smaller.' });
            return;
        }
        try {
            const url = await uploadArticleImage(token, file);
            const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
            const snippet = `\n![${alt}](${url})\n`;
            const at = bodyRef.current?.selectionStart ?? form.body.length;
            setForm(f => ({ ...f, body: f.body.slice(0, at) + snippet + f.body.slice(at) }));
            setMessage(null);
        } catch (err) {
            setMessage({ kind: 'error', text: errorText(err, 'Could not upload that image.') });
        }
    };

    const validate = () => {
        const missing = REQUIRED.find(([key]) => !form[key].trim());
        if (missing) return `Please fill in the ${missing[1]}.`;
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.slug)) return 'The URL slug can only use lowercase letters, numbers and dashes.';
        if (!hero || !thumb) return 'Please add both a hero image and a thumbnail.';
        const minutes = Number(form.readTime);
        if (!Number.isInteger(minutes) || minutes < 1) return 'Read time must be a whole number of minutes.';
        if (faqs.some(f => !f.question.trim() || !f.answer.trim())) return 'Each FAQ needs a question and an answer (or remove it).';
        return null;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const problem = validate();
        if (problem) { setMessage({ kind: 'error', text: problem }); return; }

        const date = today();
        const fields = {
            slug: form.slug,
            name: form.headline.trim(),
            category: form.category,
            title: form.title.trim(),
            headline: form.headline.trim(),
            dek: form.dek.trim(),
            description: form.description.trim(),
            imageAlt: form.imageAlt.trim(),
            imageCredit: form.imageCredit.trim(),
            datePublished: date,
            dateModified: date,
            readTime: Number(form.readTime),
            keywords: form.keywords.split(',').map(k => k.trim()).filter(Boolean),
            takeaways: lines(form.takeaways),
            faqs: faqs.map(f => ({ question: f.question.trim(), answer: f.answer.trim() })),
            body: form.body,
        };

        setSaving(true);
        setMessage(null);
        try {
            await createArticle(token, fields, hero, thumb);
            setMessage({ kind: 'success', text: `Published. It is live at /more/articles/${fields.slug}.` });
            setForm(EMPTY_FORM);
            setSlugEdited(false);
            setFaqs([]);
            setHero(null);
            setThumb(null);
            formEl.reset();
            load();
        } catch (err) {
            setMessage({ kind: 'error', text: errorText(err, 'Could not publish the article.') });
        } finally {
            setSaving(false);
        }
    };

    const onDelete = async (article) => {
        if (!window.confirm(`Delete "${article.headline}"? It will disappear from the site.`)) return;
        try {
            await deleteArticle(token, article.slug);
            load();
        } catch (err) {
            setMessage({ kind: 'error', text: errorText(err, 'Could not delete the article.') });
        }
    };

    const updateFaq = (index, key) => (e) =>
        setFaqs(list => list.map((f, i) => (i === index ? { ...f, [key]: e.target.value } : f)));

    return (
        <>
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>Publish an article</h2>
                        <p className={styles.cardSubtitle}>It appears on the Articles page and at its own URL as soon as you publish.</p>
                    </div>
                </div>

                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.formRow}>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Headline</span>
                            <input className={styles.input} value={form.headline} onChange={onHeadline} maxLength={150} />
                        </label>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Page title (browser tab / Google)</span>
                            <input className={styles.input} value={form.title} onChange={set('title')} maxLength={110} />
                        </label>
                    </div>

                    <div className={styles.formRow}>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>URL slug</span>
                            <input
                                className={styles.input}
                                value={form.slug}
                                onChange={(e) => { setSlugEdited(true); setForm(f => ({ ...f, slug: e.target.value.toLowerCase() })); }}
                                maxLength={100}
                            />
                            <span className={styles.hint}>/more/articles/{form.slug || 'your-slug'}</span>
                        </label>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Category</span>
                            <select className={styles.input} value={form.category} onChange={set('category')}>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </label>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Read time (minutes)</span>
                            <input className={styles.input} type="number" min="1" value={form.readTime} onChange={set('readTime')} />
                        </label>
                    </div>

                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>Summary line (shown under the headline)</span>
                        <textarea className={styles.input} rows={2} value={form.dek} onChange={set('dek')} maxLength={300} />
                    </label>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>SEO description (shown on the Articles page and Google)</span>
                        <textarea className={styles.input} rows={2} value={form.description} onChange={set('description')} maxLength={300} />
                    </label>

                    <div className={styles.formRow}>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Hero image</span>
                            <input className={styles.input} type="file" accept="image/*" onChange={pickImage(setHero)} />
                            <span className={styles.hint}>Wide image at the top of the article. Max 5 MB.</span>
                        </label>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Thumbnail</span>
                            <input className={styles.input} type="file" accept="image/*" onChange={pickImage(setThumb)} />
                            <span className={styles.hint}>Shown on the Articles page card. Max 5 MB.</span>
                        </label>
                    </div>
                    <div className={styles.formRow}>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Hero image description (alt text)</span>
                            <input className={styles.input} value={form.imageAlt} onChange={set('imageAlt')} maxLength={200} />
                        </label>
                        <label className={styles.field}>
                            <span className={styles.fieldLabel}>Image credit (optional)</span>
                            <input className={styles.input} value={form.imageCredit} onChange={set('imageCredit')} maxLength={120} />
                        </label>
                    </div>

                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>Keywords (comma separated, optional)</span>
                        <input className={styles.input} value={form.keywords} onChange={set('keywords')} />
                    </label>
                    <label className={styles.field}>
                        <span className={styles.fieldLabel}>Key takeaways (one per line, optional)</span>
                        <textarea className={styles.input} rows={3} value={form.takeaways} onChange={set('takeaways')} />
                    </label>

                    <div className={styles.field}>
                        <label className={styles.fieldLabel} htmlFor="article-body">Article body</label>
                        <textarea
                            id="article-body"
                            ref={bodyRef}
                            className={`${styles.input} ${styles.textarea}`}
                            value={form.body}
                            onChange={set('body')}
                        />
                        <span className={styles.hint}>
                            Blank line between paragraphs. <code>## Heading</code>, <code>### Subheading</code>, <code>- bullet</code>,
                            {' '}<code>1. numbered</code>, <code>**bold**</code>, <code>[link text](https://...)</code>.
                        </span>
                        <label className={styles.field}>
                            <span className={styles.hint}>Insert an image at the cursor:</span>
                            <input className={styles.input} type="file" accept="image/*" onChange={insertBodyImage} />
                        </label>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>FAQs (optional)</span>
                        {faqs.map((faq, i) => (
                            <div className={styles.faqRow} key={i}>
                                <input className={styles.input} placeholder="Question" aria-label={`FAQ ${i + 1} question`} value={faq.question} onChange={updateFaq(i, 'question')} />
                                <textarea className={styles.input} rows={2} placeholder="Answer" aria-label={`FAQ ${i + 1} answer`} value={faq.answer} onChange={updateFaq(i, 'answer')} />
                                <div>
                                    <button type="button" className={styles.dangerButton} onClick={() => setFaqs(list => list.filter((_, j) => j !== i))}>Remove FAQ</button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <button type="button" className={styles.ghostButton} onClick={() => setFaqs(list => [...list, { question: '', answer: '' }])}>Add FAQ</button>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.primaryButton} disabled={saving}>{saving ? 'Publishing...' : 'Publish article'}</button>
                        {message && <span className={message.kind === 'error' ? styles.formError : styles.formSuccess} role="status">{message.text}</span>}
                    </div>
                </form>
            </section>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>Published from here</h2>
                        <p className={styles.cardSubtitle}>{articles ? `${articles.length} article${articles.length === 1 ? '' : 's'}` : 'Loading...'}</p>
                    </div>
                </div>

                {loadError && <p className={styles.error}>{getLoadErrorMessage(loadError, "Unable to load articles right now.")}</p>}
                {!loadError && !articles && <LoadingWheel />}
                {articles && articles.length === 0 && <p className={styles.cardSubtitle}>Nothing published from the dashboard yet.</p>}
                {articles && articles.length > 0 && (
                    <div className={styles.tableWrap}>
                        <table className={styles.table}>
                            <thead>
                                <tr><th>Headline</th><th>Category</th><th>Published</th><th /></tr>
                            </thead>
                            <tbody>
                                {articles.map(a => (
                                    <tr key={a.slug}>
                                        <td><Link to={`/more/articles/${a.slug}`}>{a.headline}</Link></td>
                                        <td>{a.category}</td>
                                        <td>{a.datePublished}</td>
                                        <td><button type="button" className={styles.dangerButton} onClick={() => onDelete(a)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    );
};
