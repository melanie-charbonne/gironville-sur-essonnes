import { ReactNode } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MENUS } from '../../lib/api/menus'
import { GET_FOOTER } from '../../lib/api/footer'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Seo from '../Seo/Seo'
import Head from 'next/head'
import Breadcrumbs from '../Seo/Breadcrumbs'

type LayoutProps = {
    children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
    const { data, error } = useQuery(GET_MENUS)
    const dataFooter = useQuery(GET_FOOTER)
    if (error) console.log(error.message)

    const mainMenu = data?.headerMenu?.edges
    const footerMenu = data?.footerMenu?.edges
    const footerInfos = dataFooter?.data?.page?.footer_infos

    //@ts-ignore
    let childrenPost = children.props.post
    //@ts-ignore
    let childrenPage = children.props.page
    //@ts-ignore
    let childrenEvent = children.props.event
    //@ts-ignore
    let childrenEdito = children.props.edito

    const isPost = () => {
        let post = !!childrenPost 
        return post
    }
    const isPage = () => {
        let page = !!!!childrenPage 
        return page
    }
    const isEvent = () => {
        let event = !!childrenEvent 
        return event
    }

    const isEdito = () => {
        let edito = !!childrenEdito 
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

    const breadcrumbs = isPost()
        ? childrenPost?.seo?.breadcrumbs ?? {}
        : isPage() 
        ? childrenPage?.seo?.breadcrumbs ?? {}
        : isEvent()
        ? childrenEvent?.seo?.breadcrumbs ?? {}
        : isEdito()
        ? childrenEdito?.seo?.breadcrumbs ?? {}
        : {}

    return (
        <>
            <Seo seo={seo} uri={uri} />
            <Head>
                {seo?.schema?.raw ? (
                    <script
                        type="application/ld+json"
                        className="yoast-schema-graph"
                        key="yoastSchema"
                        dangerouslySetInnerHTML={{
                            __html: seo.schema?.raw,
                        }}
                    />
                ) : null}
            </Head>
            <Header mainMenu={mainMenu} />
            <main>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                {children}
            </main>
            <Footer footerMenu={footerMenu} footerInfos={footerInfos} />
        </>
    )
}
