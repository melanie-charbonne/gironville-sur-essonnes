import Link from 'next/link'
import classNames from 'classnames'
import styles from './ButtonMain.module.scss'
import ArrowLeft from '../../asset/images/icons/arrow-left.svg'

type ButtonMain = {
    arrow?: boolean
    secondary?: boolean
    loading?: boolean
    color?: string
    link?: string
    text: string
    onClick?: () => void
}

export default function ButtonMain({ arrow, secondary, loading, color, link, text, onClick }: ButtonMain) {
    return (
        <>
            {link ? (
                <Link href={link}>
                    <div className="flex justify-center">
                        <button
                            className={classNames(
                                `${styles.button}`,
                                'button',
                                'text-center',
                                'flex',
                                'justify-center',
                                'items-center',
                                'px-6',
                                'py-3',
                                'cursor-pointer',
                                {
                                    [styles.secondary]: secondary,
                                    [styles.light]: color === 'light',
                                    [styles.arrow]: arrow,
                                }
                            )}
                        >
                            <>
                                {text}
                                {arrow && <ArrowLeft className="ml-2" />}
                            </>
                        </button>
                    </div>
                </Link>
            ) : (
                <div className="flex justify-center no-link">
                    <button
                        onClick={onClick}
                        className={classNames(
                            `${styles.button}`,
                            'button',
                            'text-center',
                            'flex',
                            'justify-center',
                            'items-center',
                            'px-6',
                            'py-3',
                            'cursor-pointer',
                            {
                                [styles.secondary]: secondary,
                                [styles.light]: color === 'light',
                                [styles.arrow]: arrow,
                                [styles.loading]: loading,
                            }
                        )}
                    >
                        <>
                            {text}
                            {arrow && <ArrowLeft className="ml-2" />}
                        </>
                    </button>
                </div>
            )}
        </>
    )
}
