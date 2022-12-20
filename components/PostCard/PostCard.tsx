import Link from 'next/link'
import CoverImage from '../CoverImage'
import PostDate from '../PostDate'
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
}
type PostCardProps = {
    post: Post
    width?: number
    height?: number
    layout?: string
}
export default function PostCard({
    post,
    width,
    height,
    layout,
}: PostCardProps) {
    return (
        <Link href={`actualites${post.uri}`}>
            <article
                className='latest-posts-item card hover:cursor-pointer'
            >
                {post.featuredImage && (
                    <CoverImage
                        width={width}
                        height={height}
                        title={post.title}
                        featuredImage={post.featuredImage}
                        layout={layout}
                        classNames={'rounded-md transition duration-250'}
                    />
                )}
                <PostDate date={post.date} />
                <h3>{post.title}</h3>
            </article>
        </Link>
    )
}
