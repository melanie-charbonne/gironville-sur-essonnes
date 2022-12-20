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
        <>
            <div className="image-container relative">
                <Image
                    src={featuredImage?.node?.sourceUrl}
                    alt={
                        altText ? altText : `Image de couverture pour ${title}`
                    }
                    width={width}
                    height={height}
                    sizes={sizes}
                    layout={layout}
                    className={classNames}
                />
            </div>
        </>
    )
}
