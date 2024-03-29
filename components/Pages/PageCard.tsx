import Link from 'next/link'
import CoverImage from '../CoverImage'
import cx from 'classnames'

type PageCardProps = {
    pageChildren: {
        title: string
        uri: string
        featuredImage: {
            node: {
                altText: string
                sourceUrl: string
            }
        }
    }
    width?: number
    height?: number
    sizes?: string
    objectFit?: string
    containerClassNames?: string
}
const PageCard = ({
    pageChildren,
    width,
    height,
    sizes,
    objectFit,
    containerClassNames,
}: PageCardProps) => {
    return (
        <>
            <Link href={pageChildren?.uri}>
                <article className="card hover:cursor-pointer">
                    <CoverImage
                        width={width}
                        height={height}
                        sizes={sizes}
                        title={pageChildren.title}
                        featuredImage={pageChildren.featuredImage}
                        fill
                        classNames={cx('transition duration-250', objectFit)}
                        containerClassNames={containerClassNames}
                    />

                    <h3>{pageChildren?.title}</h3>
                </article>
            </Link>
        </>
    )
}
export default PageCard
