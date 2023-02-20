// Add Apollo Client to this file
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

 let fetchOptions = {}
// if (process.env.NODE_ENV !== 'production') { To do : Remove for production
    const https = require('https')
    fetchOptions = {
        // agent: new https.Agent({ rejectUnauthorized: false }),
        //mode: 'no-cors',
    }
    process.env['NODE_TLS_REJECT_UNAUTHORIZED']  = '0'
// }
export const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}`,
    credentials: 'include',
    fetchOptions,
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,  
})
