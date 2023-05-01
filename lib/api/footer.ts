import { gql } from '@apollo/client'

export const GET_FOOTER = gql`
    query GET_FOOTER($id: ID = "/config") {
        page(id: $id, idType: URI) {
            footer_infos {
                footerTitleColumn1
                footerTitleColumn2
                footerTitleColumn3
                footerAddress
                footerEmailAddress
                footerFacebookLink
                footerInstagramLink
                footerOpeningHours
                footerPhoneNumber
                footerYoutubeLink
            }
        }
    }
`