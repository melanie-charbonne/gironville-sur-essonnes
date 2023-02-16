import Head from 'next/head'
import Footer from '../../components/Footer'
import { client } from '../../lib/apolloClient'
import { GET_EVENT_BY_URI } from '../../lib/api/events'
import CoverImage from '../../components/CoverImage'
import EventDate from '../../components/Events/EventDate'

export default function EventURI({ event }) {
    return (
        <div>
            <Head>
                <title>Agenda - {event?.title}</title>
            </Head>

            <div className="main single single-post">
                <section>
                    <CoverImage
                        featuredImage={event?.featuredImage}
                        title={event?.featuredImage?.node?.altText || event?.title}
                        containerClassNames={'w-full h-60 md:h-[540px]'}
                        layout={'fill'}
                        classNames={'object-cover'}
                    />
                    <div className="single-head mt-8">
                        <h1>{event?.title}</h1>
                        <div className="md:inline-flex md:justifiy-between md:gap-20 mt-8 p-6 bg-blue-light rounded">
                            <div className="flex">
                                <span className="material-symbols-outlined mr-2">
                                    date_range
                                </span>
                                <EventDate
                                    startDate={
                                        event?.event_details?.eventStartDate
                                    }
                                    endDate={event?.event_details?.eventEndDate}
                                    dateClassNames="font-hn text-lg"
                                />
                            </div>
                            <div className="flex">
                                <span className="material-symbols-outlined mr-2">
                                    location_on
                                </span>
                                <p className="font-hn text-lg max-sm:text-red-700">
                                    {event?.event_details?.eventLocation}
                                </p>
                            </div>
                        </div>
                    </div>
                    <article
                        className="mt-8"
                        dangerouslySetInnerHTML={{ __html: event?.content }}
                    ></article>
                </section>
            </div>

            <Footer></Footer>
        </div>
    )
}

export const getStaticProps = async ({ params }) => {
    const { data: eventData } = await client.query({
        query: GET_EVENT_BY_URI,
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
