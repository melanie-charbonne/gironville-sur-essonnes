import '@wordpress/base-styles'

import '@wordpress/block-library/build-style/common.css'
import '@wordpress/block-library/build-style/style.css'
import '@wordpress/block-library/build-style/theme.css'

import '../styles/global.scss'

import Layout from '../components/Layout/layout'
import { ApolloProvider } from '@apollo/client/react'
import { client } from '../lib/apolloClient'
import { GET_MENUS } from '../lib/api/menus'
import { AuthProvider } from '../hooks/useAuth'

function App({ Component, pageProps, mainMenu }) {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <Layout mainMenu={mainMenu}>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </ApolloProvider>
    )
}

App.getStaticProps = async function () {
    const { data: mainMenu = [] } = await client.query({
        query: GET_MENUS,
    })
    console.log(mainMenu)
    return {
        mainMenu,
    }
}

export default App
