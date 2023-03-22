import { gql } from '@apollo/client'
import { IMAGE_FRAGMENT } from './fragments/imageFragment'

export const GET_PAGE_BY_URI = gql`
    ${IMAGE_FRAGMENT}
    query GET_PAGE_BY_URI($id: ID!) {
        page(id: $id, idType: URI) {
            title
            content
            featuredImage {
                node {
                    ...ImageFragment
                }
            }
            children {
                nodes {
                    ... on Page {
                        id
                        content
                        title
                        featuredImage {
                            node {
                                ...ImageFragment
                            }
                        }
                        uri
                    }
                }
            }
        }
    }
`

export const GET_PAGE = gql`
    query GET_PAGE($uri: String) {
        page: pageBy(uri: $uri) {
            id
            title
            content
            slug
            uri
        }
    }
`

export const GET_PAGE_BY_ID = gql`
    ${IMAGE_FRAGMENT}
    query GET_PAGE_BY_ID($id: ID!) {
        page(idType: DATABASE_ID, id: $id) {
            id
            title
            content
            featuredImage {
                node {
                    ...ImageFragment
                }
            }
            slug
            uri
            status
        }
    }
`
