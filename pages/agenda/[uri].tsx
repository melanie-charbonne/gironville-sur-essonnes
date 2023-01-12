import Head from 'next/head'
import Footer from '../../components/Footer'
import { client } from '../../lib/apollo'
import { GET_EVENT_BY_URI } from '../../lib/api/events'
import { gql } from '@apollo/client'
import { EVENT_FRAGMENT } from '../../lib/api/fragments/eventFragment'
import { AUTHOR_FRAGMENT } from '../../lib/api/fragments/authorFragment'

export default function EventURI({ event }) {
    return (
        <div>
            <Head>
                <title>Agenda - {event.title}</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>

            <main>
                <h1 className="title font-hn">{event.title}</h1>
                <p>
                    ✍️ &nbsp;&nbsp;
                    {`${event.author.node.firstName} ${event.author.node.lastName}`}{' '}
                    | {event.date}
                </p>

                <article
                    dangerouslySetInnerHTML={{ __html: event.content }}
                ></article>
            </main>

            <Footer></Footer>
        </div>
    )
}

export const getStaticProps = async ({ params }) => {
    const { data: eventData } = await client.query({
        //query: GET_EVENT_BY_URI,
        query: gql`
            ${EVENT_FRAGMENT}
            ${AUTHOR_FRAGMENT}
            query GET_EVENT_BY_URI($id: ID!) {
                event(id: $id, idType: URI) {
                    ...eventFragment
                    
                }
            }
        `,
        variables: {
            id: params.uri,
        },
    })
    return {
        props: {
            event: eventData?.event,
        },
    }
}

export const getStaticPaths = async () => {
    const paths = []
    return {
        paths,
        fallback: 'blocking',
    }
}
