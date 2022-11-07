import Head from 'next/head'
import TheHero from '../components/TheHero/TheHero'
import PostCard from '../components/PostCard'
import SectionTitle from '../components/SectionTitle'
import Footer from '../components/Footer'
import { getTheHero, getNewsForHome } from '../lib/api'
import { client } from '../lib/apollo'
import { gql } from '@apollo/client'

export default function Home({ posts, page, sectionTitles }) {
    return (
        <div>
            <Head>
                <title>Mairie de Gironville-sur-Essones</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>
            <main className="w-screen py-4 lg:py-16">
                <h1 className="title">Headless WordPress Next.js Starter</h1>
                <p className="description">
                    Get started by editing <code>pages/index.js</code>
                </p>
                <TheHero page={page} />
                <section className="latest-posts">
                    <SectionTitle
                        titleMain={sectionTitles.sectionNews.sectionNewsTitle}
                        titleWatermark={
                            sectionTitles.sectionNews.sectionNewsWatermark
                        }
                    ></SectionTitle>
                    <div className="latest-posts-container grid gap-12 grid-cols-3 grid-rows-2 grid-flow-row">
                        {posts.map((post, index) => {
                            if (index === 0) {
                                return (
                                    <PostCard
                                        key={post.uri}
                                        post={post}
                                        width={400}
                                        height={560}
                                    ></PostCard>
                                )
                            }
                            return (
                                <PostCard
                                    key={post.uri}
                                    post={post}
                                    width={400}
                                    height={200}
                                ></PostCard>
                            )
                        })}
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    )
}

export const getStaticProps = async () => {
    const { data: postsData } = await client.query({
        query: getNewsForHome,
    })

    const { data: theHeroData } = await client.query({
        query: getTheHero,
    })

    const { data: sectionTitle } = await client.query({
        query: gql`
            query getSectionTitles($id: ID = "/accueil") {
                page(id: $id, idType: URI) {
                    homePage {
                        dictionary {
                            sectionAgenda {
                                sectionAgendaTitle
                                sectionAgendaWatermark
                            }
                            sectionEdito {
                                sectionEditoTitle
                                sectionEditoWatermark
                            }
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

    return {
        props: {
            posts: postsData?.posts?.nodes,
            page: theHeroData?.page,
            sectionTitles: sectionTitle?.page?.homePage?.dictionary,
        },
        revalidate: 10,
    }
}
