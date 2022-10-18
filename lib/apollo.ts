// Add Apollo Client to this file
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
        uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`,
        //credentials: 'same-origin',
        // headers: {
        //     'Content-Type': 'application/json' ,
        // },
    }),
    cache: new InMemoryCache(),
})


