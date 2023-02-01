import Link from 'next/link'
import CoverImage from '../CoverImage'
import PostDate from './PostDate'
import cx from 'classnames'
type Post = {
    uri: string
    featuredImage: {
        node: {
            altText: string
            sourceUrl: string
        }
    }
    title: string
    date: Date
    excerpt: string
    content: string
}
type PostCardProps = {
    post: Post
    width?: number
    height?: number
    sizes?: string
    layout?: string
    objectFit?: string
    containerClassNames?: string
    displayExcerpt?: boolean
    displayContent?: boolean
}
export default function PostCard({
    post,
    width,
    height,
    sizes,
    layout,
    objectFit,
    containerClassNames,
    displayExcerpt,
    displayContent,
}: PostCardProps) {
    return (
        <Link href={post.uri}>
            <article className="latest-posts-item card hover:cursor-pointer rounded-md overflow-hidden">
                {post.featuredImage && (
                    <CoverImage
                        width={width}
                        height={height}
                        sizes={sizes}
                        title={post.title}
                        featuredImage={post.featuredImage}
                        layout={layout}
                        classNames={cx(
                            'transition duration-250',
                            objectFit
                        )}
                        containerClassNames={containerClassNames}
                    />
                )}
                <PostDate date={post.date} />
                <h3>{post.title}</h3>
                {displayExcerpt ? (
                    <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                            __html: post.excerpt,
                        }}
                    />
                ) : displayContent ? (
                    <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                            __html: post.content,
                        }}
                    />
                ) : null}
            </article>
        </Link>
    )
}
