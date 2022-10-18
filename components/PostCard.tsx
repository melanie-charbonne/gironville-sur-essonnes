import Link from "next/link"
import CoverImage from '../components/CoverImage'

export default function PostCard({ post, width = 400, height = 200 }) {
    return (
        <Link href={`actualites${post.uri}`}>
            <a className="card">
                {post.featuredImage && (
                    <CoverImage
                        width={width}
                        height={height}
                        title={post.title}
                        featuredImage={post.featuredImage}
                        classNames={'rounded-md'}
                    />
                )}
                <div className="card_post-date">{post.date}</div>
                <h3>{post.title}</h3>
            </a>
        </Link>
    )
}