import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useWindowListener } from '../../../hooks/useWindowListener'
import { useMediaQuery } from 'react-responsive'
import Link from 'next/link'
import MenuIcon from '../MenuIcon/MenuIcon'
import classNames from 'classnames/bind'
import styles from './Navigation.module.scss'

const cx = classNames.bind(styles)

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
                <ul className={cx('nav__items-wrapper', 'lg:space-x-1')}>
                    {!isEmpty(mainMenu) &&
                        mainMenu.map((menuItem) => {
                            const children = menuItem?.node?.childItems?.edges
                            const nodeURL = menuItem?.node?.path.replace(
                                'api.',
                                ''
                            )
                        
                            return (
                                <li
                                    key={menuItem?.node?.id}
                                    className={cx(
                                        'nav__item',
                                        'group relative lg:hover:text-blue-dark'
                                    )}
                                    onClick={handleToggle}
                                    onBlur={handleHide}
                                    onFocus={handleShow}
                                >
                                    <Link
                                        href={nodeURL}
                                        className="font-medium lg:hover:text-blue-dark"
                                    >
                                        {menuItem?.node?.label}
                                    </Link>
                                    {children.length > 0 && (
                                        <ul
                                            className={cx(
                                                'nav__sub-items',
                                                'invisible lg:group-hover:visible absolute z-50 w-full flex flex-col left-1/2 -translate-x-1/2 lg:bg-blue-darker text-white shadow-2xl'
                                            )}
                                        >
                                            {children.map((child) => {
                                                const childrenNodeURL = child?.node?.url.replace('api.', '');
                                                <li
                                                    key={child?.node?.id}
                                                    className={cx(
                                                        'nav__sub-item'
                                                    )}
                                                >
                                                    <Link
                                                        href={childrenNodeURL}
                                                        className="font-medium"
                                                    >
                                                        {child?.node?.label}
                                                    </Link>
                                                </li>
                                            })}
                                        </ul>
                                    )}
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
