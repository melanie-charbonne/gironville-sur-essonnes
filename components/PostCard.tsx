import Link from "next/link"
import CoverImage from '../components/CoverImage'
import PostDate from "./PostDate"

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
}
export default function PostCard({ post, width, height }: PostCardProps) {
    return (
        <Link href={`actualites${post.uri}`}>
            <a className="latest-posts-item card">
                {post.featuredImage && (
                    <CoverImage
                        width={width}
                        height={height}
                        title={post.title}
                        featuredImage={post.featuredImage}
                        classNames={'rounded-md'}
                    />
                )}
                <PostDate date={post.date} />
                <h3>{post.title}</h3>
            </a>
        </Link>
    )
}