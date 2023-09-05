import { gql } from '@apollo/client'
import { EVENT_FRAGMENT } from './fragments/eventFragment'
import { IMAGE_FRAGMENT } from './fragments/imageFragment'
import { AUTHOR_FRAGMENT } from './fragments/authorFragment'
import { SEO_FRAGMENT } from './fragments/seoFragment'

export const GET_EVENTS_FOR_HOME = gql`
    ${EVENT_FRAGMENT}
    ${IMAGE_FRAGMENT}
    query GET_EVENTS_FOR_HOME {
        events(last: 5, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
                node {
                    ...EventFragment
                }
            }
        }
    }
`
export const GET_ALL_EVENTS = gql`
    ${EVENT_FRAGMENT}
    ${IMAGE_FRAGMENT}
    query GET_ALL_EVENTS($id: ID!, $first: Int, $after: String) {
        page: page(id: $id, idType: URI) {
            content
            uri
        }
        events: events(
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
                cursor
                node {
                    ...EventFragment
                    excerpt
                }
            }
        }
    }
`
export const LOAD_MORE_EVENTS = gql`
    ${EVENT_FRAGMENT}
    ${IMAGE_FRAGMENT}
    query LOAD_MORE_EVENTS($first: Int, $after: String) {
        events(first: $first, after: $after) {
            edges {
                cursor
                node {
                    ...EventFragment
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

export const GET_EVENT_BY_URI = gql`
    ${AUTHOR_FRAGMENT}
    ${EVENT_FRAGMENT}
    ${IMAGE_FRAGMENT}
    ${SEO_FRAGMENT}
    query GET_EVENT_BY_URI($id: ID!) {
        event(id: $id, idType: URI) {
            ...EventFragment
            author {
                node {
                    ...AuthorFragment
                }
            }
            content
            seo {
                ...SeoFragment
            }
        }
    }
`
export const GET_EVENT_BY_ID = gql`
    ${AUTHOR_FRAGMENT}
    ${EVENT_FRAGMENT}
    ${IMAGE_FRAGMENT}
    query GET_EVENT_BY_ID($id: ID!) {
        event(idType: DATABASE_ID, id: $id) {
            ...EventFragment
            author {
                node {
                    ...AuthorFragment
                }
            }
            content
        }
    }
`