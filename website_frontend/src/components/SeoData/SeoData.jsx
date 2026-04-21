import React from "react";

export const SeoData = ({ title, description, canonicalPath, image }) => {
    const siteName = "uSync";
    const fullTitle = title ? `${siteName} | ${title}` : `${siteName} | Esports LANs, Tournaments, & Leagues Hub`;
    const baseUrl = "https://usync.gg";
    const fullUrl = `${baseUrl}${canonicalPath}`;
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

            {/* Twitter Card */}
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imgUrl} />        
        </React.Fragment>
    )
}
