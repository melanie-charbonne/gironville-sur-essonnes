import Head from 'next/head'
import Footer from '../components/Footer'
import { client } from '../lib/apolloClient'
import { GET_PAGE_BY_URI } from '../lib/api/pages'
import CoverImage from '../components/CoverImage'
import PageCard from '../components/Pages/PageCard'


export default function PageURI({ page }) {
    const children = page?.children?.nodes
    return (
        <>
            <Head>
                <title>{page?.title}</title>
            </Head>

            <div className="main single single-page">
                <section>
                    <CoverImage
                        featuredImage={page?.featuredImage}
                        title={
                            page?.featuredImage?.node?.altText || page?.title
                        }
                        sizes={'80vw'}
                        containerClassNames={'w-full h-64 md:h-[560px]'}
                        layout={'fill'}
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

                {haveChildren(children) && (
                    <section className="mt-6 lg:mt-12">
                        <div className="pt-12 grid grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 border-grey-e6">
                            {children.map((child) => {
                                return (
                                    <PageCard
                                        key={child.id}
                                        pageChildren={child}
                                        sizes={'(max-width: 1024px) 50vw, 33vw'}
                                        layout={'fill'}
                                        objectFit={'object-cover'}
                                        containerClassNames={
                                            'w-full h-56 md:h-[300px] mb-2'
                                        }
                                    />
                                )
                            })}
                        </div>
                    </section>
                )}
            </div>

            <Footer></Footer>
        </>
    )
}

const haveChildren = (pageChildren) => {
    return pageChildren?.length > 1
}

export const getStaticProps = async ({ params }) => {
    const { data: pageData } = await client.query({
        query: GET_PAGE_BY_URI,
        variables: {
            id: params.uri.join('/')
        },
    })
    return {
        props: {
            page: pageData?.page,
        },
    }
}

export async function getStaticPaths() {
    const paths = []
    return {
        paths,
        fallback: 'blocking',
    }
}
