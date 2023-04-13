import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useWindowListener } from '../../../hooks/useWindowListener'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import MenuIcon from '../MenuIcon/MenuIcon'
import classNames from 'classnames/bind'
import styles from './Navigation.module.scss'

let cx = classNames.bind(styles)

type NavigationProps = {
    mainMenu: String[]
}

const Navigation = ({ mainMenu }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const handleToggle = () => {
        setMenuOpen(!menuOpen)
    }
    const handleHide = () => setMenuOpen(false)
    const handleShow = () => setMenuOpen(true)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })

    useEffect(() => {
        if (isTabletOrMobile && menuOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = '15px'
        }
        return () => {
            document.body.style.overflow = 'unset'
            document.body.style.paddingRight = '0px'
        }
    }, [isTabletOrMobile, menuOpen])

    useWindowListener('resize', () => {
        handleHide()
    })

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
                    {!isEmpty(mainMenu) &&
                        mainMenu.map((menuItem) => (
                            <li
                                key={menuItem?.node?.id}
                                className={cx('nav__item')}
                                onClick={handleToggle}
                                onBlur={handleHide}
                                onFocus={handleShow}
                            >
                                <Link
                                    href={menuItem?.node?.path}
                                    className="font-medium"
                                >
                                    {menuItem?.node?.label}
                                </Link>
                            </li>
                        ))}
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
