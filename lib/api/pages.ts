import { gql } from "@apollo/client";
import { IMAGE_FRAGMENT } from "./fragments/imageFragment";

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