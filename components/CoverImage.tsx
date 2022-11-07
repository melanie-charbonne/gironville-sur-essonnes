import Image from 'next/image'

type CoverImageProps = {
    width?: number
    height?: number
    sizes?: string
    layout?: any
    classNames?: string
    title: string
    featuredImage: {
        node: {
            altText: string
            sourceUrl: string
        }
    }
}

export default function CoverImage ({
    width,
    height,
    sizes,
    layout,
    title,
    featuredImage,
    classNames,
}: CoverImageProps) {
    const altText = featuredImage?.node?.altText
    return (
        <Image
            width={width}
            height={height}
            sizes={sizes}
            layout={layout}
            alt={altText ? altText : `Image de couverture pour ${title}`}
            src={featuredImage?.node?.sourceUrl}
            className={classNames}
        />
    )
}
