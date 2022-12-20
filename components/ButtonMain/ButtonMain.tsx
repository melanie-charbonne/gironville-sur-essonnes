import Link from 'next/link'
import classNames from 'classnames'
import styles from './ButtonMain.module.scss'
import ArrowLeft from '../../asset/images/icons/arrow-left.svg'

type ButtonMain = {
    arrow?: Boolean
    secondary?: Boolean
    color?: string
    link: string
    text: string
}

export default function ButtonMain({ arrow, secondary, color, link, text }: ButtonMain) {
    return (
        <>
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
        </>
    )
}
