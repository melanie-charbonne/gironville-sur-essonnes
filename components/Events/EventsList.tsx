import EventCard from './EventCard'
import { isEmpty, isArray } from 'lodash'

const EventsList = ({ events }) => {
    if (isEmpty(events) && !isArray(events)) {
        return null
    }
    return (
        events.map((event) => {
            event = event?.node
            return (
                <EventCard
                    key={event.uri}
                    event={event}
                    layout={'fill'}
                    objectFit={'object-cover'}
                    containerClassNames={'w-full h-56 md:h-[300px]'}
                    displayExcerpt
                ></EventCard>
            )
        })   
    )
}
export default EventsList;