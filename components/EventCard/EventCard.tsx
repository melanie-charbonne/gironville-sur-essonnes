import Link from 'next/link'
import CoverImage from '../CoverImage'
import PostDate from '../PostDate'
type Event = {
    uri: string
    featuredImage: {
        node: {
            altText: string
            sourceUrl: string
        }
    }
    title: string
    event_details: {
        eventStartDate?: String
        eventEndDate?: String
    }
}
type EventCardProps = {
    event: Event
    width?: number
    height?: number
    layout?: string
}
export default function EventCard({ event, width, height, layout }: EventCardProps) {
    return (
        <Link href={`${event.uri}`}>
            <article className="latest-event-item card hover:cursor-pointer">
                {event.featuredImage && (
                    <CoverImage
                        title={event.title}
                        featuredImage={event.featuredImage}
                        width={width}
                        height={height}
                        layout={layout}
                        classNames={'rounded-md transition duration-250'}
                    />
                )}

                {/* if StartDate + End Date  else if only StartDate*/}
                {event.event_details.eventStartDate &&
                event.event_details.eventEndDate ? (
                    <p className="flex text-sm text-grey-79 my-2">
                        Du {event.event_details.eventStartDate} au {' '}
                        {event.event_details.eventEndDate}
                    </p>
                ) : event.event_details.eventStartDate ? (
                    <p className="text-sm text-grey-79 my-2">
                        {event.event_details.eventStartDate}
                    </p>
                ) : null}

                <h3>{event.title}</h3>
            </article>
        </Link>
    )
}
