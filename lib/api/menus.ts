import { gql } from '@apollo/client'
import { MENU_FRAGMENT } from './fragments/menusFragment'

export const GET_MENUS = gql`
    ${MENU_FRAGMENT}
    query GET_MENUS(
        $locationHeaderMenu: MenuLocationEnum = PRIMARY
        $locationFooterMenu: MenuLocationEnum = FOOTER
    ) {
        headerMenu: menuItems(
            where: { location: $locationHeaderMenu, parentId: "0" }
        ) {
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
        footerMenu: menuItems(
            where: { location: $locationFooterMenu, parentId: "0" }
        ) {
            edges {
                node {
                    ...MenuFragment
                }
            }
        }
    }
`
