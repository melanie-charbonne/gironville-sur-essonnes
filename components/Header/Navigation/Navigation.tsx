import { useState } from 'react'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import MenuIcon from '../MenuIcon/MenuIcon'
import cx from 'classnames'
const Navigation = ({mainMenu}) => {
   
    if (isEmpty(mainMenu)) {
        return null
    }

    const [menuOpen, setMenuOpen] = useState(false)
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
    
    return (
        <>
            <nav
                className={cx({
                    'block': menuOpen,
                    'hidden': !menuOpen
                })}
            >
                <ul
                    className={cx({
                        'flex justify-end items-center space-x-4': menuOpen,
                    })}
                >
                    {mainMenu.map((menuItem) => {
                        return (
                            <li key={menuItem?.node?.id}>
                                <Link href={menuItem?.node?.path}>
                                    <a className="font-medium">
                                        {menuItem?.node?.label}
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div
                className={cx('menu-icon-container', { menuOpen: menuOpen })}
                onClick={toggleMenu}
            >
                <MenuIcon menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
        </>
    )
}
export default Navigation
