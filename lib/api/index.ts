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
export const getEditoForHome = gql`
    query getEditoForHome($id: ID = "/accueil") {
        page(id: $id, idType: URI) {
            homePage {
                dictionary {
                    editoImage {
                        altText
                        sourceUrl
                    }
                }
            }
        }
        editos(last: 1, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
                title
                excerpt
            }
        }
    }
`
