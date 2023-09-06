import { gql } from '@apollo/client'
import { IMAGE_FRAGMENT } from './fragments/imageFragment'
import { POST_FRAGMENT } from './fragments/postFragment'
import { AUTHOR_FRAGMENT } from './fragments/authorFragment'
import { SEO_FRAGMENT } from './fragments/seoFragment'

export const GET_NEWS_FOR_HOME = gql`
    ${POST_FRAGMENT}
    ${IMAGE_FRAGMENT}
    query GET_NEWS_FOR_HOME {
        posts(last: 6, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
                node {
                    ...PostFragment
                }
            }
        }
    }
`
export const GET_ALL_NEWS = gql`
    ${POST_FRAGMENT}
    ${IMAGE_FRAGMENT}
    ${SEO_FRAGMENT}
    query GET_ALL_NEWS($id: ID!, $first: Int, $after: String) {
        page: page(id: $id, idType: URI) {
            content
            uri
            seo {
                ...SeoFragment
            }
        }
        posts: posts(
            first: $first
            after: $after
            where: { orderby: { field: DATE, order: DESC } }
        ) {
            pageInfo {
                hasNextPage
                endCursor
                offsetPagination {
                    total
                }
            }
            edges {
                node {
                    ...PostFragment
                    excerpt
                }
            }
        }
    }
`
export const LOAD_MORE_NEWS = gql`
    ${POST_FRAGMENT}
    ${IMAGE_FRAGMENT}
    query LOAD_MORE_NEWS($first: Int, $after: String) {
        posts(first: $first, after: $after) {
            edges {
                cursor
                node {
                    ...PostFragment
                    excerpt
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`
export const GET_NEWS_BY_URI = gql`
    ${POST_FRAGMENT}
    ${IMAGE_FRAGMENT}
    ${AUTHOR_FRAGMENT}
    ${SEO_FRAGMENT}
    query GET_NEWS_BY_URI($id: ID!) {
        post(id: $id, idType: URI) {
            ...PostFragment
            content
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
export const GET_NEWS_BY_ID = gql`
    ${POST_FRAGMENT}
    ${IMAGE_FRAGMENT}
    ${AUTHOR_FRAGMENT}
    ${SEO_FRAGMENT}
    query GET_NEWS_BY_ID($id: ID!) {
        post(idType: DATABASE_ID, id: $id) {
            ...PostFragment
            content
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
