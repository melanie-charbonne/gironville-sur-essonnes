import { gql } from '@apollo/client'

export const getTheHero = gql`
    query getTheHero($id: ID = "/accueil") {
        page(id: $id, idType: URI) {
            homePage {
                theHero {
                    heroTitle
                    heroDescription
                    heroImage {
                        altText
                        sourceUrl
                    }
                }
            }
        }
    }
`
export const getNewsForHome = gql`
    query getNewsForHome {
        posts(last: 5, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                date
                title
                uri
                featuredImage {
                    node {
                        altText
                        sourceUrl
                    }
                }
            }
        }
    }
`
export const getEventsForHome = gql`
    query getEventsForHome {
        events(last: 5, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                featuredImage {
                    node {
                        altText
                        sourceUrl
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
`
