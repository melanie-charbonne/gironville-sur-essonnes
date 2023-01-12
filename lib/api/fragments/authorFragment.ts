import { gql } from '@apollo/client'
export const AUTHOR_FRAGMENT = gql`
    fragment authorFragment on Author {
        author {
            node {
                firstName
                lastName
                name
            }
        }
    }
`
