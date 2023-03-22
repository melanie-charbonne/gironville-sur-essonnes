import { client } from '../../../lib/apolloClient'
import { GET_EDITO_BY_ID } from '../../../lib/api/editos'
import { getAuthToken } from '../../../utils/get-auth-cookie'
import {
    getLoginPreviewRedirectUrl,
    handleRedirectsAndReturnData,
} from '../../../utils/preview-redirect'
import Head from 'next/head'
import PostAuthor from '../../../components/Posts/PostAuthor'
import PostDate from '../../../components/Posts/PostDate'

const EditoPreview = (editoProps) => {
    const edito = editoProps?.edito?.edito
    return (
        <>
            <Head>
                <title>{edito?.title}</title>
            </Head>

            <div className="main single single-post">
                <section>
                    <div className="single-head">
                        <h1>{edito?.title}</h1>
                        <div className="flex items-center mt-3 text-grey-79">
                            <PostAuthor author={edito?.author} />
                            |
                            <PostDate date={edito?.date} />
                        </div>
                    </div>
                    <article
                        className="mt-8"
                        dangerouslySetInnerHTML={{ __html: edito?.content }}
                    ></article>
                </section>
            </div>
        </>
    )
}
export default EditoPreview

export const getServerSideProps = async (context) => {
    const authToken = getAuthToken(context.req)
    const { params } = context || {}

    const { data, errors } =
        (await client.query({
            query: GET_EDITO_BY_ID,
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
            edito: data || {},
        },
    }
    const loginRedirectURL = getLoginPreviewRedirectUrl(
        'edito',
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
        'edito',
        true,
        loginRedirectURL
    )
}
