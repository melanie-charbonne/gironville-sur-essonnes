import { gql } from '@apollo/client'
export const EVENT_FRAGMENT = gql`
    fragment EventFragment on Event {
        uri
        title
        event_details {
            eventEndDate
            eventLocation
            eventStartDate
        }
        featuredImage {
            node {
                ...ImageFragment
            }
        }
    }
`