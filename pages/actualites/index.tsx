import Head from 'next/head'
import LoadMorePosts from '../../components/Posts/LoadMorePosts'
import SectionTitle from '../../components/SectionTitle'
import { client } from '../../lib/apolloClient'
import { gql } from '@apollo/client'
import { GET_ALL_NEWS } from '../../lib/api/news'
import { PER_PAGE_FIRST } from '../../utils/constants'

export default function News({ posts, pageTitle, page }) {
    return (
        <div>
            <Head>
                <title>Mairie de Gironville-sur-Essonnes | Actualités</title>
            </Head>
            <div className="main list">
                <SectionTitle
                    titleMain={pageTitle.sectionNews.sectionNewsTitle}
                    titleWatermark={pageTitle.sectionNews.sectionNewsWatermark}
                ></SectionTitle>

                <section
                    className="mt-2 mb-9 lg:mb-15"
                    dangerouslySetInnerHTML={{
                        __html: page.content,
                    }}
                />

                <LoadMorePosts posts={posts} />
            </div>
        </div>
    )
}
export const getStaticProps = async () => {
    const { data: pageTitle } = await client.query({
        query: gql`
            query GET_SECTION_TITLE($id: ID = "/accueil") {
                page(id: $id, idType: URI) {
                    homePage {
                        dictionary {
                            sectionNews {
                                sectionNewsTitle
                                sectionNewsWatermark
                            }
                        }
                    }
                }
            }
        `,
    })

    const { data: postsData } = await client.query({
        query: GET_ALL_NEWS,
        variables: {
            id: '/actualites/',
            first: PER_PAGE_FIRST,
            after: null,
        },
    })

    return {
        props: {
            pageTitle: pageTitle?.page?.homePage?.dictionary,
            posts: postsData?.posts,
            page: postsData?.page,
        },
        revalidate: 10,
    }
}
