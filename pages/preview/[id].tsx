import { client } from '../../lib/apolloClient'
import { GET_PAGE_BY_ID } from '../../lib/api/pages'
import { getAuthToken } from '../../utils/get-auth-cookie'
import { getLoginPreviewRedirectUrl, handleRedirectsAndReturnData } from '../../utils/preview-redirect'
import Head from 'next/head'
import CoverImage from '../../components/CoverImage'

const PagePreview = (pageProps) => {
    const page = pageProps?.page?.page
    return (
        <>
            <Head>
                <title>{page?.title}</title>
            </Head>

            <div className="main single single-page mt-8">
                <section>
                    <CoverImage
                        featuredImage={page?.featuredImage}
                        title={
                            page?.featuredImage?.node?.altText || page?.title
                        }
                        sizes={'80vw'}
                        containerClassNames={'w-full h-64 md:h-[560px]'}
                        fill
                        classNames={'object-cover'}
                    />
                    <div className="single-head mt-6 lg:mt-12">
                        <h1>{page?.title}</h1>
                    </div>
                    <article
                        className="mt-8"
                        dangerouslySetInnerHTML={{ __html: page?.content }}
                    ></article>
                </section>
            </div>
        </>
    )
}
export default PagePreview

export const getServerSideProps = async (context) => {
    const authToken = getAuthToken(context.req)
    const { params } = context || {}
    const { data, errors } = await client.query({
        query: GET_PAGE_BY_ID,
        variables: {
            id: Number(params.id) ?? '',
        },
        context: {
            headers: {
                authorization: authToken ? `Bearer ${authToken}` : '',
            },
        },
    }) || {}
    const defaultProps = {
        props: {
            page: data || {},
        },
    }
    const loginRedirectURL = getLoginPreviewRedirectUrl(
        'page',
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
        'page',
        true,
        loginRedirectURL
    )
}
