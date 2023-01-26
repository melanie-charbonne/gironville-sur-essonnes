import useSWR from 'swr'
import { request } from 'graphql-request'
import Header from '../Header/Header'
const fetcher = query => request(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, query)

export default function Layout({ children, menus }) {
    // const { data, error } = useSWR(
    //     `{
    //   Movie(title: "Inception") {
    //     releaseDate
    //     actors {
    //       name
    //     }
    //   }
    // }`,
    //     fetcher
    // )
    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>

    return (
        <>
            <Header menus={menus} />
            {/* <Navbar links={data.links} /> */}
            <main>{children}</main>
            {/* <Footer /> */}
           
        </>
    )
}