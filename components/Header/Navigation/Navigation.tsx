import { useState } from 'react'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import MenuIcon from '../MenuIcon/MenuIcon'
import classNames from 'classnames/bind'
import styles from './Navigation.module.scss'

let cx = classNames.bind(styles)

const Navigation = ({ mainMenu }) => {
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
                className={cx('nav', {
                    menuOpen: menuOpen,
                })}
            >
                <ul className="nav__items-wrapper">
                    {mainMenu.map((menuItem) => {
                        return (
                            <li
                                key={menuItem?.node?.id}
                                className="nav__item"
                            >
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
