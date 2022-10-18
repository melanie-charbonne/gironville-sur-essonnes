import useSWR from 'swr'
import { request } from 'graphql-request'

const fetcher = query => request(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/graphql`, query)

export default function Layout({ children }) {
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
          
            {/* <Navbar links={data.links} /> */}
            <main>{children}</main>
            {/* <Footer /> */}
           
        </>
    )
}