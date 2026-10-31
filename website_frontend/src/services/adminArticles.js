import apiClient from "./apiClient";
import { isMockAnalytics } from "./adminAnalytics";

// Admin-published articles (the /admin/analytics "Articles" tab) and their public reads.
//
// Backend contract (not built yet - set REACT_APP_ADMIN_ANALYTICS_MOCK=true to use browser storage instead):
//   GET    /articles                public, published articles, newest first -> { articles: [Article] }
//   GET    /articles/{slug}         public                                   -> Article
//   POST   /admin/articles          admin only, multipart/form-data:
//                                     data  = JSON string of the Article fields below (no image urls)
//                                     hero  = hero image file, thumb = thumbnail file
//                                   -> Article (with hero/thumb stored and `image` / `thumb` urls filled in)
//   POST   /admin/articles/images   admin only, multipart `file` -> { url }  (images used inside the body)
//   DELETE /admin/articles/{slug}   admin only
//
// Article = {
//   slug, name, category: 'Guide' | 'Industry' | 'Platform', title, headline, dek, description,
//   image, imageAlt, imageCredit, thumb, datePublished: 'YYYY-MM-DD', dateModified, readTime,
//   keywords: [string], takeaways: [string], faqs: [{ question, answer }],
//   body: string   // article markup, see components/ArticleBody
// }

const STORE_KEY = 'usync_mock_articles';

const readStore = () => {
    try {
        return JSON.parse(localStorage.getItem(STORE_KEY)) ?? [];
    } catch {
        return [];
    }
};

const writeStore = (articles) => {
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(articles));
    } catch {
        throw new Error('Browser storage is full. Try smaller images.');
    }
};

const newestFirst = (articles) =>
    [...articles].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

const toDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read the image.'));
    reader.readAsDataURL(file);
});

const authHeaders = (token) => ({ Authorization: `Bearer ${token}` });

export const getPublishedArticles = async () => {
    if (isMockAnalytics) return newestFirst(readStore());
    const res = await apiClient.get('/articles');
    return res.data.articles;
};

export const getPublishedArticle = async (slug) => {
    if (isMockAnalytics) {
        const found = readStore().find(a => a.slug === slug);
        if (!found) throw new Error('Article not found');
        return found;
    }
    const res = await apiClient.get(`/articles/${encodeURIComponent(slug)}`);
    return res.data;
};

export const getAdminArticles = async (token) => {
    if (isMockAnalytics) return newestFirst(readStore());
    const res = await apiClient.get('/articles', { headers: authHeaders(token) });
    return res.data.articles;
};

// fields: the Article without image urls. hero / thumb: File objects.
export const createArticle = async (token, fields, hero, thumb) => {
    if (isMockAnalytics) {
        const articles = readStore();
        if (articles.some(a => a.slug === fields.slug)) throw new Error('An article with that URL slug already exists.');
        const article = { ...fields, image: await toDataUrl(hero), thumb: await toDataUrl(thumb) };
        writeStore([...articles, article]);
        return article;
    }
    const form = new FormData();
    form.append('data', JSON.stringify(fields));
    form.append('hero', hero);
    form.append('thumb', thumb);
    const res = await apiClient.post('/admin/articles', form, { headers: authHeaders(token) });
    return res.data;
};

export const uploadArticleImage = async (token, file) => {
    if (isMockAnalytics) return toDataUrl(file);
    const form = new FormData();
    form.append('file', file);
    const res = await apiClient.post('/admin/articles/images', form, { headers: authHeaders(token) });
    return res.data.url;
};

export const deleteArticle = async (token, slug) => {
    if (isMockAnalytics) {
        writeStore(readStore().filter(a => a.slug !== slug));
        return;
    }
    await apiClient.delete(`/admin/articles/${encodeURIComponent(slug)}`, { headers: authHeaders(token) });
};
