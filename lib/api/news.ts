import { gql } from '@apollo/client'
import {IMAGE_FRAGMENT} from './fragments/imageFragment'
import {POST_FRAGMENT} from './fragments/postFragment'

export const GET_NEWS_FOR_HOME = gql`
    query GET_NEWS_FOR_HOME {
        posts(last: 5, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                ...PostFragment
            }
        }
    }
    ${POST_FRAGMENT}
    ${IMAGE_FRAGMENT}
`
export const GET_ALL_NEWS = gql`
    query GET_ALL_NEWS($id: ID!, $first: Int, $after: String) {
        page: page(id: $id, idType: URI) {
            content
            uri
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
    ${POST_FRAGMENT}
    ${IMAGE_FRAGMENT}
`
export const LOAD_MORE_NEWS = gql`
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
    ${POST_FRAGMENT}
    ${IMAGE_FRAGMENT}
`
