import { NextSeo } from 'next-seo'
/**
 * Custom SEO component
 *
 * Used to seo meta tags for each page
 *
 * @param {Object} seo Seo.
 * @param {string} uri Page URI.
 * @see https://www.npmjs.com/package/next-seo
 *
 * @returns {JSX.Element}
 *
 */

type SeoProps = {
    seo: {
        canonical: string
        title: string
        metaDesc: string
        metaRobotsNoindex: boolean
        metaRobotsNofollow: boolean
        opengraphDescription: string
        opengraphTitle: string
        opengraphImage: {
            sourceUrl: string
        }
        opengraphUrl: string
        opengraphSiteName: string
    }
    uri: string
}
const Seo = ({ seo, uri }: SeoProps) => {
    const {
        title,
        metaDesc,
        metaRobotsNoindex,
        metaRobotsNofollow,
        opengraphDescription,
        opengraphTitle,
        opengraphImage,
        opengraphSiteName,
    } = seo

    const currentLocation =
        typeof window !== 'undefined' ? window.location.origin : null
    
    const opengraphUrl =
        (process.env.NEXT_PUBLIC_WORDPRESS_URL
            ? process.env.NEXT_PUBLIC_WORDPRESS_URL
            : currentLocation) + uri

    return (
        <NextSeo
            title={title}
            description={opengraphDescription || metaDesc}
            canonical={opengraphUrl}
            noindex={metaRobotsNoindex}
            nofollow={metaRobotsNofollow}
            openGraph={{
                type: 'website',
                locale: 'fr_FR',
                url: opengraphUrl,
                title: opengraphTitle,
                description: opengraphDescription,
                images: [
                    {
                        url: opengraphImage?.sourceUrl,
                        width: 1280,
                        height: 720,
                    },
                ],
                /* eslint-disable */
                site_name: opengraphSiteName,
                /* eslint-enable */
            }}
        />
    )
}

export default Seo
