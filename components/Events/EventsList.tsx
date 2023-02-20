import EventCard from './EventCard'
import { isEmpty, isArray } from 'lodash'

const EventsList = ({ events }) => {
    if (isEmpty(events) && !isArray(events)) {
        return null
    }
    return events.map((event) => {
        event = event?.node
        return (
            <EventCard
                key={event.uri}
                event={event}
                sizes={'(max-width: 1024px) 50vw, 33vw'}
                objectFit={'object-cover'}
                containerClassNames={'w-full h-56 md:h-[300px]'}
                displayExcerpt
            ></EventCard>
        )
    })
}
export default EventsList
