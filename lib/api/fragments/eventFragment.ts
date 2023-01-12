import { gql } from '@apollo/client'
export const EVENT_FRAGMENT = gql`
    fragment eventFragment on Event {
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