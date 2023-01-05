const PostFragment = `
    fragment PostFragment on Post {
        title
        date
        featuredImage {
            node {
                ...ImageFragment
            }
        }
    }
`
export default PostFragment
