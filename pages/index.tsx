import Head from 'next/head'
import TheHero from '../components/TheHero/TheHero'
import PostCard from '../components/PostCard/PostCard'
import SectionTitle from '../components/SectionTitle'
import ButtonMain from '../components/ButtonMain/ButtonMain'
import Footer from '../components/Footer'
import { getTheHero, getNewsForHome, getEventsForHome } from '../lib/api'
import { client } from '../lib/apollo'
import { gql } from '@apollo/client'

export default function Home({ posts, page, events, sectionTitles }) {
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
                <section className="latest-posts mt-9 lg:mt-15">
                    <SectionTitle
                        titleMain={sectionTitles.sectionNews.sectionNewsTitle}
                        titleWatermark={
                            sectionTitles.sectionNews.sectionNewsWatermark
                        }
                    ></SectionTitle>
                    <div className="latest-posts-container grid gap-6 lg:gap-12 grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 grid-flow-row mb-9 lg:mb-15">
                        {posts.map((post, index) => {
                            if (index === 0) {
                                return (
                                    <PostCard
                                        key={post.uri}
                                        post={post}
                                        width={400}
                                        height={560}
                                        layout={'responsive'}
                                    ></PostCard>
                                )
                            }
                            return (
                                <PostCard
                                    key={post.uri}
                                    post={post}
                                    width={400}
                                    height={200}
                                    layout={'responsive'}
                                ></PostCard>
                            )
                        })}
                    </div>
                    <ButtonMain link={'actualites'} arrow secondary />
                </section>
                <section className="latest-events background_curve mt-12 lg:mt-24 py-9 lg:py-16 bg-blue-light">
                    <SectionTitle
                        titleMain={
                            sectionTitles.sectionAgenda.sectionAgendaTitle
                        }
                        titleWatermark={
                            sectionTitles.sectionAgenda.sectionAgendaWatermark
                        }
                        theme={'light'}
                    ></SectionTitle>
                    <div className="latest-events_container grid gap-3 lg:gap-6 grid-cols-2 lg:grid-cols-4">
                        {events.map((event) => {
                            return <h3>{event.title}</h3>
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

    const { data: eventsData } = await client.query({
        query: getEventsForHome,
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
            events: eventsData?.events.nodes,
            sectionTitles: sectionTitle?.page?.homePage?.dictionary,
        },
        revalidate: 10,
    }
}
