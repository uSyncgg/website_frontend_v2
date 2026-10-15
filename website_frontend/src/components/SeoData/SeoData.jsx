import React from "react";
import {
    DEFAULT_OG_IMAGE,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_OG_IMAGE_HEIGHT,
    DEFAULT_OG_IMAGE_WIDTH,
    SITE_NAME,
    SITE_URL,
} from "utils/site";

/**
 * The one place every page declares itself to search engines, social cards and
 * AI answer engines.
 *
 * Props beyond the basics:
 *   type        og:type — "website" (default), "article", "event"
 *   robots      e.g. "noindex, nofollow" for checkout and other utility pages
 *   image*      per-page share card; pass imageWidth/imageHeight only when the
 *               real dimensions are known (see below)
 *   jsonLd      one structured-data object, or an array of them
 */
export const SeoData = ({
    title,
    description,
    canonicalPath,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    type = "website",
    robots,
    publishedTime,
    modifiedTime,
    author,
    jsonLd,
}) => {
    const siteName = SITE_NAME;
    const fullTitle = title ? `${siteName} | ${title}` : `${siteName} | Esports LANs, Tournaments, & Leagues Hub`;
    const fullUrl = `${SITE_URL}${canonicalPath}`;

    // Dimensions are only emitted when they are actually known: measured for
    // the fallback card, passed in for a custom one. Declaring a size the image
    // doesn't have is worse than declaring none, so an unmeasured custom image
    // simply gets no width/height.
    const usingFallbackImage = !image;
    const imgUrl = usingFallbackImage ? DEFAULT_OG_IMAGE : image;
    const imgWidth = usingFallbackImage ? DEFAULT_OG_IMAGE_WIDTH : imageWidth;
    const imgHeight = usingFallbackImage ? DEFAULT_OG_IMAGE_HEIGHT : imageHeight;
    const imgAlt = imageAlt || (usingFallbackImage ? DEFAULT_OG_IMAGE_ALT : undefined);

    const structuredData = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    return (
        <React.Fragment>
            {/* Standard SEO */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />
            {robots && <meta name="robots" content={robots} />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={imgUrl} />
            {imgWidth && <meta property="og:image:width" content={String(imgWidth)} />}
            {imgHeight && <meta property="og:image:height" content={String(imgHeight)} />}
            {imgAlt && <meta property="og:image:alt" content={imgAlt} />}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:type" content={type} />

            {/* Article metadata (og:type="article" pages only) */}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
            {author && <meta property="article:author" content={author} />}

            {/* Twitter Card — card type and @site live in public/index.html */}
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imgUrl} />
            {imgAlt && <meta name="twitter:image:alt" content={imgAlt} />}

            {/* Structured data */}
            {structuredData.map((data, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                />
            ))}
        </React.Fragment>
    )
}
