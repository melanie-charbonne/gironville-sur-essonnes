import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { isEmpty } from 'lodash'

import EventsList from './EventsList'
import ButtonMain from '../ButtonMain/ButtonMain'

import { PER_PAGE_REST } from '../../lib/constants'
import { LOAD_MORE_EVENTS } from '../../lib/api/events'

type LoadMoreEventsProps = {
    events: any
    graphQLQuery?: any
    searchQuery?: string
}

const LoadMoreEvents = ({
    events,
    graphQLQuery = LOAD_MORE_EVENTS,
    searchQuery = '',
}: LoadMoreEventsProps) => {
    /**
     * First set the posts data and pageInfo received from server side,
     * as initial eventsData and pageInfo, so that
     * it sever side posts can be fetched, and the new endcursor( contained in pageInfo )
     * can be sent to get the next set of posts.
     */
    const [eventsData, setEventsData] = useState(events?.edges ?? [])
    const [pageInfo, setPageInfo] = useState(events?.pageInfo)

    const [error, setError] = useState(null)

    /**
     * If value of 'posts' passed to this component changes, set new post data and page info.
     */
    useEffect(() => {
        setEventsData(events?.edges)
        setPageInfo(events?.pageInfo)
    }, [events?.edges])

    /**
     * Set posts.
     *
     * @param {Object} events Events.
     *
     * @return {void}
     */
    const setEvents = (events) => {
        if (!events || !events?.edges || !events?.pageInfo) {
            return
        }

        /**
         * Concat the newly received post from client request to the existing posts, using setEventsData()
         * and also set the new pageInfo that contains the new endcursor, so that
         * when user clicks on loadmore again, next set of posts can be fetched again.
         * Same process if repeated to it gets concatenated everytime to the existing posts array.
         */
        const newEvents = eventsData.concat(events?.edges)
        setEventsData(newEvents)
        setPageInfo({ ...events?.pageInfo })
    }

    const [fetchPosts, { loading }] = useLazyQuery(graphQLQuery, {
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            /**
             * Call setEvents to concat the new set of posts to existing one and update pageInfo
             * that contains the cursor and the information about whether we have the next page.
             */
            setEvents(data?.events ?? [])
        },
        onError: (error) => {
            setError(error?.graphQLErrors ?? '')
        },
    })

    /**
     * Calls fetchPosts
     *
     * fetchPosts() makes a client side request with the new endcursor info,
     * to get next set of posts.
     *
     * @param {String} endCursor Endcursor used to fetch the next set of posts.
     */
    const loadMoreItems = (endCursor = null) => {
        let queryVariables = {
            first: PER_PAGE_REST,
            after: endCursor,
            query: '',
        }

        // If its a search query then add the query in the query variables.
        if (!isEmpty(searchQuery)) {
            queryVariables.query = searchQuery
        }

        fetchPosts({
            variables: queryVariables,
        })
    }

    /**
     * Pull the endcursor and hasNextPage values from pageInfo
     *
     * Please note that pageInfo gets updated with new endCursor and hasNextPage
     * values everytime a new client side request is made using setPageInfo()
     */
    const { endCursor, hasNextPage } = pageInfo || {}

    return (
        <>
            <section className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-9 lg:mb-15">
                <EventsList key={eventsData.uri} events={eventsData} />
            </section>
            {hasNextPage &&
                (loading ? (
                    <ButtonMain
                        text={"Voir plus d'évènements"}
                        secondary
                        loading
                    />
                ) : (
                    <ButtonMain
                        text={"Voir plus d'évènements"}
                        secondary
                        onClick={() => loadMoreItems(endCursor)}
                    />
                ))}

            {error && (
                <>
                    <div className="w-full flex justify-center my-10">
                        Retrouvez biêntot tous nos évènements
                    </div>
                </>
            )}
        </>
    )
}

export default LoadMoreEvents
