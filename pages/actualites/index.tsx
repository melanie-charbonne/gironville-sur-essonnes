import Head from 'next/head'
import PostCard from '../../components/Posts/PostCard'
import LoadMorePost from '../../components/Posts/LoadMorePosts'
import PostsList from '../../components/Posts/PostsList'
import SectionTitle from '../../components/SectionTitle'
import { client } from '../../lib/apollo'
import { gql } from '@apollo/client'
import { getAllNews } from '../../lib/api/news'
import { PER_PAGE_FIRST } from '../../lib/constants'

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

                <LoadMorePost posts={posts} />
            </div>
        </div>
    )
}
export const getStaticProps = async () => {
    const { data: pageTitle } = await client.query({
        query: gql`
            query getSectionTitles($id: ID = "/accueil") {
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
        query: getAllNews,
        variables: {
            uri: '/actualites/',
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
