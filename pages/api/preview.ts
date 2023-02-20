import { getPreviewRedirectUrl, getLoginPreviewRedirectUrl } from '../../lib/preview-redirect'

const Preview = async (req, res) => {
    const { postType, postId } = req.query

    const previewUrl = getPreviewRedirectUrl(postType, postId)
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({})
    // Redirect to the path from the getPreviewRedirectUrl function
    res.redirect('307', previewUrl)

    // Fetch the headless CMS to check if the provided `slug` exists
    // getPostBySlug would implement the required fetching logic to the headless CMS
    ///const post = await getPostBySlug(req.query.slug)

    // If the slug doesn't exist prevent preview mode from being enabled
    // if (!post) {
    //     return res.status(401).json({ message: 'Invalid slug' })
    // }

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    //res.redirect(post.slug)
    //res.end()
}
export default Preview
