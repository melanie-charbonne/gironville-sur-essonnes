// Add Apollo Client to this file
import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { getAuthToken } from '../utils/get-auth-cookie'

const errorLink = onError(({ graphQLErrors, networkError, operation, forward  }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Extensions: ${extensions}`
            )
        )
        for (const err of graphQLErrors) {
            switch (err.message) {
                // Apollo Server sets code to UNAUTHENTICATED
                // when an AuthenticationError is thrown in a resolver
                case 'Internal server error':
                    // Modify the operation context with a new token
                    const oldHeaders = operation.getContext().headers
                    const authToken = getAuthToken(oldHeaders)
                    
                    operation.setContext({
                        headers: {
                            ...oldHeaders,
                            authorization: authToken ? `Bearer ${authToken}` : '',
                        },
                    })
                    // Retry the request, returning the new observable
                    return forward(operation)
            }
        }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

// Remove for production
    process.env['NODE_TLS_REJECT_UNAUTHORIZED']  = '0'
// 
const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}`,
    credentials: 'include',
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
})
