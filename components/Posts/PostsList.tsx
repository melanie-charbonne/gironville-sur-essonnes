import PostCard from './PostCard'
import { isEmpty, isArray } from 'lodash'

const PostsList = ({ posts }) => {
    if (isEmpty(posts) && !isArray(posts)) {
        return null
    }
    return posts.map((post) => {
        post = post?.node
        return (
            <PostCard
                key={post.uri}
                post={post}
                sizes={'(max-width: 1024px) 50vw, 33vw'}
                objectFit={'object-cover'}
                containerClassNames={'w-full h-56 md:h-[300px]'}
                displayExcerpt
            ></PostCard>
        )
    })
}
export default PostsList
