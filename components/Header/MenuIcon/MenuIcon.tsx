import classNames from 'classnames/bind'
import styles from './MenuIcon.module.scss'

const cx = classNames.bind(styles);

type menuIconProps = {
    menuOpen: boolean
    setMenuOpen: Function
    onClick?: Function
}

const MenuIcon = ({menuOpen}:menuIconProps) => {
    return (
        <div className={cx('menuIcon', { menuOpen: menuOpen })}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default MenuIcon
