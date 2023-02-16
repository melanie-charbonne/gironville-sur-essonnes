import { gql } from '@apollo/client'
import { MENU_FRAGMENT } from './fragments/menusFragment'

export const GET_MENUS = gql`
    ${MENU_FRAGMENT}
    query GET_MENUS {
        headerMenu: menuItems(where: { location: PRIMARY, parentId: "0" }) {
            edges {
                node {
                    ...MenuFragment
                    childItems {
                        edges {
                            node {
                                ...MenuFragment
                            }
                        }
                    }
                }
            }
        }
        footerMenu: menuItems(where: { location: FOOTER, parentId: "0" }) {
            edges {
                node {
                    ...MenuFragment
                }
            }
        }
    }
`
