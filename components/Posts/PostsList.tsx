import PostCard from './PostCard'
import { isEmpty, isArray } from 'lodash'

const PostsList = ({ posts }) => {
    if (isEmpty(posts) && !isArray(posts)) {
        return null
    }
    return (
        posts.map((post) => {
            post = post?.node
            return (
                <PostCard
                    key={post.uri}
                    post={post}
                    layout={'fill'}
                    objectFit={'object-cover'}
                    containerClassNames={'w-full h-56 md:h-[300px]'}
                    displayExcerpt
                ></PostCard>
            )
        })   
    )
}
export default PostsList;