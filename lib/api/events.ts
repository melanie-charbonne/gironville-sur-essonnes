import { gql } from '@apollo/client'
import ImageFragment from './fragments/imageFragment'


export const getEventsForHome = gql`
    query getEventsForHome {
        events(last: 5, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                featuredImage {
                    node {
                        ...ImageFragment
                    }
                }
                uri
                title
                event_details {
                    eventEndDate
                    eventLocation
                    eventStartDate
                }
            }
        }
    }
    ${ImageFragment}
`
