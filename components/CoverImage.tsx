import Image from 'next/image'
import DefautCoverImage from '../asset/images/default-cover-image.jpg'
import cx from 'classnames'
type CoverImageProps = {
    width?: number
    height?: number
    sizes?: string
    fill?: boolean
    classNames?: string
    containerClassNames?: string
    title: string
    featuredImage: {
        node: {
            altText: string
            sourceUrl: string 
        } 
    }
}

export default function CoverImage({
    width,
    height,
    sizes,
    fill,
    title,
    featuredImage,
    containerClassNames,
    classNames,
}: CoverImageProps) {
    const altText = featuredImage?.node?.altText
    return (
        <>
            <div
                className={cx('image-container relative', containerClassNames)}
            >
                <Image
                    src={featuredImage?.node?.sourceUrl}
                    alt={altText || `Image de couverture pour ${title}`}
                    width={width}
                    height={height}
                    sizes={sizes}
                    fill={fill}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8VQ8AAnkBewKPWHQAAAAASUVORK5CYII="
                    className={classNames}
                />
            </div>
        </>
    )
}
