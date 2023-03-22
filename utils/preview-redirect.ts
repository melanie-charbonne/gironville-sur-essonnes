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
    return `/login/?postType=${postType || ''}&previewPostId=${postId || ''}`
}

export const handleRedirectsAndReturnData = (
    defaultProps,
    data,
    errors,
    field,
    isPreview = false,
    loginRedirectURL = ''
) => {
    if ((isPreview && null === data?.[field]) || isEmpty(data)) {
        console.log('isPreview')
        return {
            redirect: {
                destination: loginRedirectURL || '/',
                statusCode: 307,
            },
        }
    }

    if (field && isEmpty(data?.[field])) {
        return {
            // returns the default 404 page with a status code of 404
            notFound: true,
        }
    }

    return defaultProps
}