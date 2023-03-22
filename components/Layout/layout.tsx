import { ReactNode } from 'react'
import Header from '../Header/Header'

type LayoutProps = {
    children: ReactNode
    mainMenu: any
}
export default function Layout({ children, mainMenu }: LayoutProps) {
    console.log(mainMenu)
    return (
        <>
            <Header mainMenu={mainMenu?.headerMenu?.edges} />
            {/* <Navbar links={data.links} /> */}
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    )
}
gi