import Image from 'next/image'
import cx from 'classnames'
import { ImgHTMLAttributes } from 'react'
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
    placeholder?: 'blur' | 'empty'
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
    placeholder,
}: CoverImageProps) {
    const altText = featuredImage?.node?.altText
    return (
        <>
            {featuredImage?.node?.sourceUrl && (
                <div
                    className={cx(
                        'image-container relative',
                        containerClassNames
                    )}
                >
                    <Image
                        src={featuredImage?.node?.sourceUrl}
                        alt={
                            altText
                                ? altText
                                : `Image de couverture pour ${title}`
                        }
                        width={width}
                        height={height}
                        fill={fill}
                        sizes={sizes}
                        className={classNames}
                        placeholder={placeholder}
                    />
                </div>
            )}
        </>
    )
}
