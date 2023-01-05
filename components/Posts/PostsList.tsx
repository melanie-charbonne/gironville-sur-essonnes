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
                    width={600}
                    height={300}
                    layout={'fill'}
                    objectFit={'object-cover'}
                    containerClassNames={'w-full h-52 md:h-[250px]'}
                    displayExcerpt
                ></PostCard>
            )
        })   
    )
}
export default PostsList;