import { request } from 'graphql-request'
import Header from '../Header/Header'
const fetcher = (query) =>
    request(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, query)

export default function Layout({ children, mainMenu }) {
    return (
        <>
            <Header mainMenu={mainMenu?.headerMenu?.edges} />
            {/* <Navbar links={data.links} /> */}
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    )
}
