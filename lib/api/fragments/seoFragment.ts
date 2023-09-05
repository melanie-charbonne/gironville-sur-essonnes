import { gql } from '@apollo/client'
export const SEO_FRAGMENT = gql`
    fragment SeoFragment on PostTypeSEO {
        breadcrumbs {
            text
            url
        }
        title
        metaDesc
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphAuthor
        opengraphDescription
        opengraphTitle
        schema {
            raw
        }
        opengraphImage {
            sourceUrl
        }
        opengraphSiteName
        opengraphPublishedTime
        opengraphModifiedTime
    }
`
