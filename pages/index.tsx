import TheHero from '../components/TheHero/TheHero'
import PostsList from '../components/Posts/PostsList'
import SectionTitle from '../components/SectionTitle'
import EventsList from '../components/Events/EventsList'
import ButtonMain from '../components/ButtonMain/ButtonMain'
import Image from 'next/image'
import { GET_THE_HERO } from '../lib/api/index'
import { GET_EDITO_FOR_HOME } from '../lib/api/editos'
import { GET_NEWS_FOR_HOME } from '../lib/api/news'
import { GET_EVENTS_FOR_HOME } from '../lib/api/events'
import { client } from '../lib/apolloClient'
import { gql } from '@apollo/client'

export default function Home({
    posts,
    page,
    events,
    sectionTitles,
    edito,
    editoImage,
}) {

    return (
        <>
            <TheHero page={page} />
            <section className="latest-posts mt-9 lg:mt-15">
                <SectionTitle
                    titleMain={sectionTitles.sectionNews.sectionNewsTitle}
                    titleWatermark={
                        sectionTitles.sectionNews.sectionNewsWatermark
                    }
                ></SectionTitle>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-9 lg:mb-15">
                    <PostsList key={posts.uri} posts={posts} />
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
                    titleMain={sectionTitles.sectionAgenda.sectionAgendaTitle}
                    titleWatermark={
                        sectionTitles.sectionAgenda.sectionAgendaWatermark
                    }
                    theme={'light'}
                ></SectionTitle>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-9 lg:mb-15">
                    <EventsList key={events.uri} events={events} />
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
                        alt="Editos du maire - Gironville-sur-Essonnes"
                        width={475}
                        height={620}
                    ></Image>
                </div>

                <div className="md:col-span-2 self-center">
                    <SectionTitle
                        left
                        titleMain={sectionTitles.sectionEdito.sectionEditoTitle}
                        titleWatermark={
                            sectionTitles.sectionEdito.sectionEditoWatermark
                        }
                    ></SectionTitle>

                    <>
                        <article key={edito.uri} className="mb-6">
                            <h3 className="mb-3 font-hn">{edito.title}</h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: edito.excerpt,
                                }}
                            />
                        </article>
                        <ButtonMain
                            link={edito.uri}
                            text={"Lire l'edito"}
                            justify={'justify-start'}
                            arrow
                            secondary
                        />
                    </>
                    {/* {editos.map((edito) => {
                        return (
                        )
                    })} */}
                </div>
            </section>
        </>
    )
}

export const getStaticProps = async () => {
    const { data: postsData } = await client.query({
        query: GET_NEWS_FOR_HOME,
    })

    const { data: theHeroData } = await client.query({
        query: GET_THE_HERO,
    })

    const { data: eventsData } = await client.query({
        query: GET_EVENTS_FOR_HOME,
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
        query: GET_EDITO_FOR_HOME,
    })

    return {
        props: {
            posts: postsData?.posts?.edges,
            page: theHeroData?.page,
            events: eventsData?.events?.edges,
            sectionTitles: sectionTitle?.page?.homePage?.dictionary,
            editoImage: editoData?.page?.homePage?.dictionary?.editoImage,
            edito: editoData?.editos?.nodes?.[0],
        },
        revalidate: 10,
    }
}
