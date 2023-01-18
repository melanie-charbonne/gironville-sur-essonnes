import Link from 'next/link'
import CoverImage from '../CoverImage'
import cx from 'classnames'
import EventDate from './EventDate'

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
    excerpt: string
}
type EventCardProps = {
    event: Event
    width?: number
    height?: number
    layout?: string
    objectFit?: string
    containerClassNames?: string
    displayExcerpt?: boolean
}
export default function EventCard({
    event,
    width,
    height,
    layout,
    objectFit,
    containerClassNames,
    displayExcerpt,
}: EventCardProps) {
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
                        classNames={cx(
                            'rounded-md transition duration-250',
                            objectFit
                        )}
                        containerClassNames={containerClassNames}
                    />
                )}

                <EventDate
                    startDate={event.event_details.eventStartDate}
                    endDate={event.event_details.eventEndDate}
                    dateClassNames="text-sm text-grey-79 my-2"
                />

                <h3>{event.title}</h3>
                {displayExcerpt && (
                    <div
                        className="mt-2"
                        dangerouslySetInnerHTML={{
                            __html: event.excerpt,
                        }}
                    />
                )}
            </article>
        </Link>
    )
}
