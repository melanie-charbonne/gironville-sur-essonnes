import Link from 'next/link'
import Image from 'next/image'
import CoverImage from '../CoverImage'
import DefautCoverImage from '../../asset/images/default-cover-image.jpg'
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
                    {pageChildren.featuredImage ? (
                        <CoverImage
                            width={width}
                            height={height}
                            sizes={sizes}
                            title={pageChildren.title}
                            featuredImage={pageChildren.featuredImage}
                            fill
                            classNames={cx(
                                'transition duration-250',
                                objectFit
                            )}
                            containerClassNames={containerClassNames}
                        />
                    ) : (
                        <div className="image-container relative w-full h-56 md:h-[300px] mb-2">
                            <Image
                                src={DefautCoverImage}
                                alt={`Image de couverture pour ${pageChildren.title}`}
                                width={width}
                                height={height}
                                sizes={sizes}
                                fill
                                loading="lazy"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}

                    <h3>{pageChildren?.title}</h3>
                </article>
            </Link>
        </>
    )
}
export default PageCard
