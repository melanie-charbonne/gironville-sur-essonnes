import { gql } from '@apollo/client'
import ImageFragment from './fragments/imageFragment'
import PostFragment from './fragments/postFragment'

export const getNewsForHome = gql`
    query getNewsForHome {
        posts(last: 5, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                ...PostFragment
            }
        }
    }
    ${PostFragment}
    ${ImageFragment}
`
export const getAllNews = gql`
    query getAllNews($uri: String, $first: Int, $after: String) {
        page: pageBy(uri: $uri) {
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
    ${PostFragment}
    ${ImageFragment}
`
export const LoadMoreNews = gql`
    query LoadMoreNews($first: Int, $after: String) {
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
    ${PostFragment}
    ${ImageFragment}
`
