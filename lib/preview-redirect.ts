import { isEmpty } from 'lodash'

export const getPreviewRedirectUrl = (
    postType: string = '',
    postId: string = ''
) => {
    if (isEmpty(postType) || isEmpty(postId)) {
        return ''
    }

    switch (postType) {
        case 'post':
            return `/actualites/preview/${postId}/`
        case 'page':
            return `/preview/${postId}/`
        case 'event':
            return `/agenda/preview/${postId}/`
        case 'edito':
            return `/editos/preview/${postId}/`
        default:
            return '/'
    }
}
export const getLoginPreviewRedirectUrl = (
    postType: string = '',
    postId: string = ''
) => {
    return `/login/?postType=${postType || ''}&postId=${postId || ''}`
}
