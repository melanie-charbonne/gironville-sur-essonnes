import { gql } from '@apollo/client'

export const GET_THE_HERO = gql`
    query GET_THE_HERO($id: ID = "/accueil") {
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
