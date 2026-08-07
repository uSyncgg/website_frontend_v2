import React from "react";
import { SITE_NAME, SITE_URL } from "utils/site";

export const SeoData = ({ title, description, canonicalPath, image, type, publishedTime, modifiedTime, author }) => {
    const siteName = SITE_NAME;
    const fullTitle = title ? `${siteName} | ${title}` : `${siteName} | Esports LANs, Tournaments, & Leagues Hub`;
    const fullUrl = `${SITE_URL}${canonicalPath}`;
    const imgUrl = image ? `${image}` : "https://i.imgur.com/A0AhUZp.jpeg";

    return (
        <React.Fragment>
            {/* Standard SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={imgUrl} />
            <meta property="og:site_name" content={siteName} />
            {type && <meta property="og:type" content={type} />}

            {/* Article metadata (og:type="article" pages only) */}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {author && <meta property="article:author" content={author} />}

            {/* Twitter Card */}
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imgUrl} />
        </React.Fragment>
    )
}
