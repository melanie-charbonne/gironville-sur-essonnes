import Head from 'next/head'
import LoadMoreEvents from '../../components/Events/LoadMoreEvents'
import SectionTitle from '../../components/SectionTitle'
import EventsList from '../../components/Events/EventsList'
import EventCard from '../../components/Events/EventCard'
import { client } from '../../lib/apolloClient'
import { gql } from '@apollo/client'
import { GET_ALL_EVENTS } from '../../lib/api/events'
import { PER_PAGE_FIRST } from '../../lib/constants'

export default function Events({ events, pageTitle, page, error }) {
    return (
        <div>
            <Head>
                <title>Mairie de Gironville-sur-Essonnes | Actualités</title>
            </Head>
            <div className="main list">
                <SectionTitle
                    titleMain={pageTitle.sectionAgenda.sectionAgendaTitle}
                    titleWatermark={
                        pageTitle.sectionAgenda.sectionAgendaWatermark
                    }
                ></SectionTitle>

                <section
                    className="mt-2 mb-9 lg:mb-15"
                    dangerouslySetInnerHTML={{
                        __html: page?.content,
                    }}
                />
                <LoadMoreEvents events={events} />
              
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
                            sectionAgenda {
                                sectionAgendaTitle
                                sectionAgendaWatermark
                            }
                        }
                    }
                }
            }
        `,
    })

    const { data: eventsData } = await client.query({
         query: GET_ALL_EVENTS,
        variables: {
            id: '/agenda',
            first: PER_PAGE_FIRST,
            after: null,
        },
    })

    return {
        props: {
            pageTitle: pageTitle?.page?.homePage?.dictionary,
            events: eventsData?.events,
            page: eventsData?.page,
        },
        revalidate: 10,
    }
}
