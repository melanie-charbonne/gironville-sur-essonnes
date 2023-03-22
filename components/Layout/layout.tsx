import { ReactNode } from 'react'
import { useQuery } from '@apollo/client';
import { GET_MENUS } from '../../lib/api/menus'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

type LayoutProps = {
    children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
    const { data, error } = useQuery(GET_MENUS);
    if (error) console.log(error.message);
    
    const mainMenu = data?.headerMenu?.edges
    const footerMenu = data?.footerMenu?.edges
    
    return (
        <>
            <Header mainMenu={mainMenu} />
            <main>{children}</main>
            <Footer footerMenu={footerMenu} />
        </>
    )
}