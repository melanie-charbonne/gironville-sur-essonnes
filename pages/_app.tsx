import '@wordpress/base-styles'

import '@wordpress/block-library/build-style/common.css'
import '@wordpress/block-library/build-style/style.css'
import '@wordpress/block-library/build-style/theme.css'

import '../styles/global.scss'

import Layout from '../components/Layout/layout'
import { ApolloProvider } from '@apollo/client/react'
import { client } from '../lib/apollo'
import { GET_MENUS } from '../lib/api/menus'

function App({ Component, pageProps, mainMenu }) {
    return (
        <ApolloProvider client={client}>
            <Layout mainMenu={mainMenu}>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
}

App.getInitialProps = async function () {
    const { data: mainMenu = [] } = await client.query({
        query: GET_MENUS,
    })
    return {
        mainMenu,
    }
}

export default App
