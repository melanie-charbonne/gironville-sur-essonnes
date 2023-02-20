import AuthContent from "../../components/Auth/AuthContent"
import Head from 'next/head'
import { client } from '../../lib/apolloClient'
import { GET_PAGE_BY_ID } from '../../lib/api/pages'
import CoverImage from "../../components/CoverImage"

const PagePreview = (page) => {
    page = page.page
    return (
        <>
            <AuthContent>
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
                            // width={1200}
                            // height={600}
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
            </AuthContent>
        </>
    )
}
export default PagePreview

export const getServerSideProps = async ({ params}) => {
    
    const { data: pageData } = await client.query({
        query: GET_PAGE_BY_ID,
        variables: {
            id: params.id,
        },
    })
    console.log(params)
    return {
        props: {
            page: pageData?.page
        },
    }
}
