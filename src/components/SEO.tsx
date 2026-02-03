import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    name?: string;
    type?: string;
    image?: string;
    url?: string;
}

export default function SEO({
    title,
    description = "Wedness Dev is a technology agency specializing in risk analysis, problem mitigation, and system optimization to help businesses achieve significant growth.",
    name = "Wedness Dev",
    type = "website",
    image = "https://lovable.dev/opengraph-image-p98pqg.png",
    url
}: SEOProps) {
    const siteTitle = title ? `${title} | ${name}` : name;
    const currentUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{siteTitle}</title>
            <meta name='description' content={description} />

            {/* Open Graph tags (Facebook, LinkedIn) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={currentUrl} />

            {/* Twitter Card tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}
