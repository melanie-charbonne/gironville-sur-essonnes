import Link from 'next/link'
import { isEmpty } from 'lodash'
type BreadcrumbsProps = {
    breadcrumbs: {
        [x: string]: any
        text: string
        url: string
    }
}
const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
    if ( isEmpty(breadcrumbs)) return null
    
    return (
        <>
            <section className="breadcrumbs pb-3 mb-4 shadow-sm">
                <ol vocab="https://schema.org/" typeof="BreadcrumbList">
                    {breadcrumbs.map((crumb, index) => {
                        const isLastItem = index === breadcrumbs.length - 1
                        if (!isLastItem) {
                            return (
                                <li
                                    key={index}
                                    property="itemListElement"
                                    typeof="ListItem"
                                >
                                    <Link
                                        property="item"
                                        typeof="WebPage"
                                        href={crumb.url}
                                    >
                                        <span property="name">
                                            {crumb.text}
                                        </span>
                                    </Link>
                                    <span> / </span>
                                    <meta
                                        property="position"
                                        content={index + 1}
                                    ></meta>
                                </li>
                            )
                        } else {
                            return (
                                <li
                                    key={crumb.text+index}
                                    property="itemListElement"
                                    typeof="ListItem"
                                >
                                    <span property="name">{crumb.text}</span>
                                    <meta
                                        property="position"
                                        content={index + 1}
                                    ></meta>
                                </li>
                            )
                        }
                    })}
                </ol>
            </section>
        </>
    )
}

export default Breadcrumbs
