import { gql } from "@apollo/client"
export const POST_FRAGMENT = gql`
    fragment PostFragment on Post {
        title
        date
        uri
        featuredImage {
            node {
                ...ImageFragment
            }
        }
    }
`