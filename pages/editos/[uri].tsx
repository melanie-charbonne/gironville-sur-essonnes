import Head from 'next/head'
import Footer from '../../components/Footer'
import { gql } from '@apollo/client'
import { client } from '../../lib/apolloClient'
import { GET_EDITO_BY_URI } from '../../lib/api/editos'
import CoverImage from '../../components/CoverImage'
import PostDate from '../../components/Posts/PostDate'
import PostAuthor from '../../components/Posts/PostAuthor'
import SectionTitle from '../../components/SectionTitle'

export default function EditoURI({ post, pageTitle }) {
    return (
        <>
            <Head>
                <title>{post?.title}</title>
            </Head>

            <div className="main single single-post">
                <SectionTitle
                    titleMain={pageTitle.sectionEdito.sectionEditoTitle}
                    titleWatermark={
                        pageTitle.sectionEdito.sectionEditoWatermark
                    }
                ></SectionTitle>

                <CoverImage
                    featuredImage={post?.featuredImage}
                    title={post?.featuredImage?.node?.altText || post?.title}
                    containerClassNames={'w-full h-60 md:h-[450px]'}
                    fill
                    classNames={'object-cover'}
                />
                <section>
                    <div className="single-head mt-12 lg:mt-24">
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

            <Footer></Footer>
        </>
    )
}

export const getStaticProps = async ({ params }) => {
    const { data: pageTitle } = await client.query({
        query: gql`
            query GET_SECTION_TITLE($id: ID = "/accueil") {
                page(id: $id, idType: URI) {
                    homePage {
                        dictionary {
                            sectionEdito {
                                sectionEditoTitle
                                sectionEditoWatermark
                            }
                        }
                    }
                }
            }
        `,
    })

    const { data: postData } = await client.query({
        query: GET_EDITO_BY_URI,
        variables: {
            id: params.uri,
        },
    })
    return {
        props: {
            post: postData?.edito,
            pageTitle: pageTitle?.page?.homePage?.dictionary,
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
