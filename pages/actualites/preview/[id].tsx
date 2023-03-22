import { client } from '../../../lib/apolloClient'
import { GET_NEWS_BY_ID } from '../../../lib/api/news'
import { getAuthToken } from '../../../utils/get-auth-cookie'
import {
    getLoginPreviewRedirectUrl,
    handleRedirectsAndReturnData,
} from '../../../utils/preview-redirect'
import Head from 'next/head'
import CoverImage from '../../../components/CoverImage'
import PostAuthor from '../../../components/Posts/PostAuthor'
import PostDate from '../../../components/Posts/PostDate'

const NewsPreview = (postProps) => {
    const post = postProps?.post?.post
    return (
        <>
            <Head>
                <title>{post?.title}</title>
            </Head>

            <div className="main single single-post">
                <section>
                    <CoverImage
                        featuredImage={post?.featuredImage}
                        title={
                            post?.featuredImage?.node?.altText || post?.title
                        }
                        containerClassNames={'w-full h-60 md:h-[540px]'}
                        fill
                        classNames={'object-cover'}
                    />
                    <div className="single-head mt-8">
                        <h1>{post?.title}</h1>
                        <div className="flex items-center mt-3 text-grey-79">
                            <PostAuthor author={post?.author} />
                            |
                            <PostDate date={post?.date} />
                        </div>
                    </div>
                    <article
                        className="mt-8"
                        dangerouslySetInnerHTML={{ __html: post?.content }}
                    ></article>
                </section>
            </div>
        </>
    )
}
export default NewsPreview

export const getServerSideProps = async (context) => {
    const authToken = getAuthToken(context.req)
    const { params } = context || {}
    const { data, errors } =
        (await client.query({
            query: GET_NEWS_BY_ID,
            variables: {
                id: Number(params.id) ?? '',
            },
            context: {
                headers: {
                    authorization: authToken ? `Bearer ${authToken}` : '',
                },
            },
        })) || {}
    const defaultProps = {
        props: {
            post: data || {},
        },
    }
    const loginRedirectURL = getLoginPreviewRedirectUrl(
        'post',
        params?.id ?? ''
    )
    if (errors) {
        return {
            redirect: {
                destination: loginRedirectURL || '/',
                statusCode: 307,
            },
        }
    }
    return handleRedirectsAndReturnData(
        defaultProps,
        data,
        errors,
        'post',
        true,
        loginRedirectURL
    )
}
