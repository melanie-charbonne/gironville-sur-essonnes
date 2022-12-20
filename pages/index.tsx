import Head from 'next/head'
import TheHero from '../components/TheHero/TheHero'
import PostCard from '../components/PostCard/PostCard'
import SectionTitle from '../components/SectionTitle'
import EventCard from '../components/EventCard/EventCard'
import ButtonMain from '../components/ButtonMain/ButtonMain'
import Image from 'next/image'
import Footer from '../components/Footer'
import {
    getTheHero,
    getNewsForHome,
    getEventsForHome,
    getEditoForHome,
} from '../lib/api'
import { client } from '../lib/apollo'
import { gql } from '@apollo/client'
export default function Home({ posts, page, events, sectionTitles, edito, editoImage }) {
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
                    <ButtonMain
                        link={'actualites'}
                        text={"Toute l'actualité"}
                        arrow
                        secondary
                    />
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
                    <div className="latest-events_container grid gap-3 lg:gap-6 grid-cols-2 lg:grid-cols-4 mb-9 lg:mb-15">
                        {events.map((event) => {
                            return (
                                <EventCard
                                    key={event.uri}
                                    event={event}
                                    width={310}
                                    height={375}
                                    layout={'responsive'}
                                ></EventCard>
                            )
                        })}
                    </div>
                    <ButtonMain
                        link={'agenda'}
                        text={'Tous les évènements'}
                        color={'light'}
                        arrow
                    />
                </section>
                <section className="edito grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 md:gap-9 mt-12 lg:mt-24">
                    <div className="hidden sm:inline-block">
                        <Image
                            src={editoImage.sourceUrl}
                            width={475}
                            height={620}
                            layout={'responsive'}
                        ></Image>
                    </div>

                    <div className="md:col-span-2">
                        <SectionTitle left
                            titleMain={
                                sectionTitles.sectionEdito.sectionEditoTitle
                            }
                            titleWatermark={
                                sectionTitles.sectionEdito.sectionEditoWatermark
                            }
                        ></SectionTitle>

                        {edito.map((edito) => {
                            return (
                                <>
                                    <h3>{edito.title}</h3>
                                    <p
                                      // To do: The excerpt
                                        dangerouslySetInnerHTML={{
                                            __html: edito.content,
                                        }}
                                    ></p>
                                </>
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

     const { data: editoData } = await client.query({
        query: getEditoForHome,
     })
    return {
        props: {
            posts: postsData?.posts?.nodes,
            page: theHeroData?.page,
            events: eventsData?.events.nodes,
            sectionTitles: sectionTitle?.page?.homePage?.dictionary,
            editoImage: editoData?.page?.homePage?.dictionary?.editoImage,
            edito: editoData?.editos?.nodes,
        },
        revalidate: 10,
    }
}
