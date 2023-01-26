import { gql } from "@apollo/client"

export const MENU_FRAGMENT = gql`
    fragment MenuFragment on MenuItem {
        id
        label
        path
        url
    }
`