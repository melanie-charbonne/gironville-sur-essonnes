import { ReactNode } from 'react'
import { useQuery } from '@apollo/client';
import { GET_MENUS } from '../../lib/api/menus'
import { GET_FOOTER } from '../../lib/api/footer'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Seo from '../Seo/seo';

type LayoutProps = {
    children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
    const { data, error } = useQuery(GET_MENUS);
    const dataFooter = useQuery(GET_FOOTER);
    if (error) console.log(error.message);

    const mainMenu = data?.headerMenu?.edges
    const footerMenu = data?.footerMenu?.edges
    const footerInfos = dataFooter?.data?.page?.footer_infos
    
    let childrenPost = children.props.post; 
    let childrenPage = children.props.page; 
    let childrenEvent = children.props.event; 
    let childrenEdito = children.props.edito; 
    
    const isPost = () => {
        let post = childrenPost ? true : false
        return post
    }
    const isPage = () => {
        let page = childrenPage ? true : false
        return page
    }
    const isEvent = () => {
        let event = childrenEvent ? true : false
        return event
    }

    const isEdito = () => {
        let edito = childrenEdito ? true : false
        return edito
    }
    const seo = isPost()
        ? childrenPost?.seo ?? {}
        : isPage()
        ? childrenPage?.seo ?? {}
        : isEvent()
        ? childrenEvent?.seo ?? {}
        : isEdito()
        ? childrenEdito?.seo ?? {}
        : {}

    const uri = isPost()
        ? childrenPost?.uri ?? {}
        : isPage()
        ? childrenPage?.uri ?? {}
        : isEvent()
        ? childrenEvent?.uri ?? {}
        : isEdito()
        ? childrenEdito?.uri ?? {}
        : {}

    
    return (
        <>
            <Seo seo={seo} uri={uri}/>
            <Header mainMenu={mainMenu} />
            <main>{children}</main>
            <Footer footerMenu={footerMenu} footerInfos={footerInfos} />
        </>
    )
}