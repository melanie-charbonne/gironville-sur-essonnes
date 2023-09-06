import { gql } from '@apollo/client'
import { AUTHOR_FRAGMENT } from './fragments/authorFragment'
import { SEO_FRAGMENT } from './fragments/seoFragment'

export const GET_EDITO_FOR_HOME = gql`
    query GET_EDITO_FOR_HOME($id: ID = "/accueil") {
        page(id: $id, idType: URI) {
            homePage {
                dictionary {
                    editoImage {
                        altText
                        sourceUrl
                    }
                }
            }
        }
        editos(last: 1, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                title
                excerpt
                uri
            }
        }
    }
`
export const GET_EDITO_BY_URI = gql`
    ${AUTHOR_FRAGMENT}
    ${SEO_FRAGMENT}
    query GET_EDITO_BY_URI($id: ID!) {
        edito(id: $id, idType: URI) {
            date
            title
            content
            uri
            author {
                node {
                    ...AuthorFragment
                }
            }
            seo {
                ...SeoFragment
            }
        }
    }
`

export const GET_EDITO_BY_ID = gql`
    ${AUTHOR_FRAGMENT}
    ${SEO_FRAGMENT}
    query GET_EDITO_BY_ID($id: ID!) {
        edito(idType: DATABASE_ID, id: $id) {
            date
            title
            content
            uri
            author {
                node {
                    ...AuthorFragment
                }
            }
            seo {
                ...SeoFragment
            }
        }
    }
`
