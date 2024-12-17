export const htmlPlugin = ({
    publicPath = '/',
    title,
    description = '',
    og_url = '',
    og_image = '',
}) => {
    return {
        name: 'html-transform',
        transformIndexHtml(html) {
            return html.replace(
                /<meta content="%META%" \/>/,
                function (match, p1) {
                    return (
                        `<link rel="icon" type="image/png" sizes="32x32" href="${publicPath}favicon-32x32.png" />` +
                        `<link rel="icon" type="image/png" sizes="16x16" href="${publicPath}favicon-16x16.png" />` +
                        `<title>${title}</title>` +
                        `<meta name="title" content="${title}" />` +
                        `<meta name="description" content="${description}" />` +
                        //  <!-- Open Graph / Facebook -->
                        `<meta property="og:type" content="website" />` +
                        (og_url
                            ? `<meta property="og:url" content="${og_url}" />`
                            : '') +
                        `<meta property="og:title" content="${title}" />` +
                        `<meta property="og:description" content="${description}" />` +
                        (og_image
                            ? `<meta property="og:image" content="${og_image}" /></meta>`
                            : '') +
                        // <!-- Twitter -->
                        `<meta property="twitter:card" content="summary_large_image" />` +
                        (og_url
                            ? `<meta property="twitter:url" content="${og_url}" />`
                            : '') +
                        `<meta property="twitter:title" content="${title}" />` +
                        `<meta property="twitter:description" content="${description}" />` +
                        (og_image
                            ? `<meta property="twitter:image" content="${og_image}" />`
                            : '')
                    );
                },
            );
        },
    };
};
