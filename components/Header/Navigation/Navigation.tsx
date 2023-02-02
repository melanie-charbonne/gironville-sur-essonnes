import { useState, useEffect } from 'react'
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
    const handleToggle = () => {
        setMenuOpen(!menuOpen)
    }
    const handleHide = () => setMenuOpen(false)
    const handleShow = () => setMenuOpen(true)

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '15px'
        }
        return () => {
            document.body.style.overflow = 'unset'
            document.body.style.paddingRight = '0px'
        }
    }, [menuOpen])

    return (
        <>
            <div
                className={cx('menu-icon-container', { menuOpen: menuOpen })}
                onClick={handleToggle}
            >
                <MenuIcon menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            <nav
                className={cx('nav', {
                    menuOpen: menuOpen,
                })}
            >
                <ul className={cx('nav__items-wrapper', 'lg:space-x-4')}>
                    {mainMenu.map((menuItem) => {
                        return (
                            <li
                                key={menuItem?.node?.id}
                                className={cx('nav__item')}
                                onClick={handleToggle}
                                onBlur={handleHide}
                                onFocus={handleShow}
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
                className={cx('backdrop', 'lg:hidden', {
                    visible: menuOpen,
                })}
                onClick={handleToggle}
            ></div>
        </>
    )
}
export default Navigation
