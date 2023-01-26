
import React from 'react'
import Logo from '../../asset/images/logo-gironville-sur-essone.svg'
import Link from 'next/link'
import Navigation from './Navigation'
import { client } from '../../lib/apollo'
import { GET_MENUS } from '../../lib/api/menus'

const Header = ({ menus }) => {
    console.log(menus)
    return (
        <>
            <header className="flex py-4 lg:py-8">
                <div className="w-1/4">
                    <Link href="/" passHref legacyBehavior>
                        <LogoWebsite />
                    </Link>
                </div>
                <div className="w-3/4">
                    <Navigation menus={menus?.headerMenu} />
                </div>
            </header>
        </>
    )
}
export default Header

const LogoWebsite = React.forwardRef<HTMLAnchorElement>((props, ref) => {
    return (
        <a ref={ref} {...props}>
            <Logo />
        </a>
    )
})

export const getStaticProps = async () => {
    const { data } = await client.query({
        query: GET_MENUS,
    })
    console.warn(data)

    return {
        props: {
            menus: {
                headerMenu: data?.headerMenu?.edges?.node,
                footerMenu: data?.footerMenu?.edges?.node,
            },
        },
    }
}