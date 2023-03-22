import { client } from '../../../lib/apolloClient'
import { GET_EVENT_BY_ID } from '../../../lib/api/events'
import { getAuthToken } from '../../../utils/get-auth-cookie'
import {
    getLoginPreviewRedirectUrl,
    handleRedirectsAndReturnData,
} from '../../../utils/preview-redirect'
import Head from 'next/head'
import CoverImage from '../../../components/CoverImage'
import EventDate from '../../..//components/Events/EventDate'

const EventPreview = (eventProps) => {
    const event = eventProps?.event?.event
    return (
        <>
            <Head>
                <title>{event?.title}</title>
            </Head>

            <div className="main single single-post">
                <section>
                    <CoverImage
                        featuredImage={event?.featuredImage}
                        title={
                            event?.featuredImage?.node?.altText || event?.title
                        }
                        containerClassNames={'w-full h-60 md:h-[540px]'}
                        fill
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
        </>
    )
}
export default EventPreview

export const getServerSideProps = async (context) => {
    const authToken = getAuthToken(context.req)
    const { params } = context || {}
    const { data, errors } =
        (await client.query({
            query: GET_EVENT_BY_ID,
            variables: {
                id: Number(params.id) ?? '',
            },
            context: {
                headers: {
                    authorization: authToken ? `Bearer ${authToken}` : '',
                },
            },
        })) || {}
    const defaultProps = {
        props: {
            event: data || {},
        },
    }
    const loginRedirectURL = getLoginPreviewRedirectUrl(
        'event',
        params?.id ?? ''
    )
    if (errors) {
        return {
            redirect: {
                destination: loginRedirectURL || '/',
                statusCode: 307,
            },
        }
    }
    return handleRedirectsAndReturnData(
        defaultProps,
        data,
        errors,
        'event',
        true,
        loginRedirectURL
    )
}
