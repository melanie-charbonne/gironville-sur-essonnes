
import React from 'react'
import Logo from '../../asset/images/logo-gironville-sur-essone.svg'
import Link from 'next/link'
import Navigation from './Navigation/Navigation'
import {isEmpty} from 'lodash'

const Header = ({ mainMenu }) => {
        return (
            <>
                <header className="flex py-4 lg:py-8">
                    <div className="w-3/4 lg:w-1/4">
                        <Link href="/" passHref legacyBehavior>
                            <LogoWebsite />
                        </Link>
                    </div>
                    {!isEmpty(mainMenu) && (
                        <div className="w-1/4 lg:w-3/4 flex justify-end items-center relative">
                            <Navigation mainMenu={mainMenu}/>
                        </div>
                    )}
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
