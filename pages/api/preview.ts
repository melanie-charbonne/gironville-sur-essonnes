import { getPreviewRedirectUrl, getLoginPreviewRedirectUrl } from '../../utils/preview-redirect'
import isEmpty from 'lodash'
import { getAuthToken } from '../../utils/get-auth-cookie'

const Preview = async (req, res) => {
    const { postType, postId } = req.query

    const authToken = getAuthToken(req)
    
    if (isEmpty(authToken)) {
        const loginUrl = getLoginPreviewRedirectUrl(postType, postId)
        res.writeHead(307, { Location: loginUrl })
    } else {
        const previewUrl = getPreviewRedirectUrl(postType, postId)
        res.writeHead(307, { Location: previewUrl })
    }
    res.end()
}
export default Preview
