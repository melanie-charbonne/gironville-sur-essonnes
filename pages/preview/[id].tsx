import { useRef, useEffect } from 'react'
import { client } from '../../lib/apolloClient'
import { GET_PAGE_BY_ID } from '../../lib/api/pages'
import { getAuthToken } from '../../utils/get-auth-cookie'
import {
    getLoginPreviewRedirectUrl,
    handleRedirectsAndReturnData,
} from '../../utils/preview-redirect'
import Head from 'next/head'
import CoverImage from '../../components/CoverImage'
import PageCard from '../../components/Pages/PageCard'
import { Swiper } from 'swiper'

const PagePreview = (pageProps) => {
    const page = pageProps?.page?.page
    const children = page?.children?.nodes
    const PostContentContainerRef = useRef(null)

    useEffect(() => {
        if (!postContent(page) || !PostContentContainerRef.current) return

        const container = PostContentContainerRef.current
        const swiperInstances = container.getElementsByClassName('swiper')[0]

        if (swiperInstances) {
            new Swiper(swiperInstances, {
                speed: 400,
                spaceBetween: 20,
                autoplay: {
                    delay: 2000,
                },
                loop: true,
                navigation: {
                    prevEl: '.elementor-swiper-button-prev',
                    nextEl: '.elementor-swiper-button-next',
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
            })
        }
    }, [page, PostContentContainerRef])
    return (
        <>
            <Head>
                <title>{page?.title}</title>
            </Head>

            <div className="main single single-page">
                <section>
                    {page?.featuredImage && (
                        <CoverImage
                            featuredImage={page?.featuredImage}
                            title={
                                page?.featuredImage?.node?.altText ||
                                page?.title
                            }
                            sizes={'80vw'}
                            containerClassNames={'w-full h-64 md:h-[560px]'}
                            fill
                            classNames={'object-cover'}
                        />
                    )}
                    <div className="single-head mt-6 lg:mt-12">
                        <h1>{page?.title}</h1>
                    </div>
                    <article
                        className="mt-8"
                        ref={PostContentContainerRef}
                        dangerouslySetInnerHTML={{
                            __html: postContent(page),
                        }}
                    ></article>
                </section>

                {haveChildren(children) && (
                    <section className="mt-6 lg:mt-12">
                        <div className="pt-12 grid grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 border-grey-e6">
                            {children.map((child) => {
                                return (
                                    <PageCard
                                        key={child.id}
                                        pageChildren={child}
                                        sizes={'(max-width: 1024px) 50vw, 33vw'}
                                        objectFit={'object-cover'}
                                        containerClassNames={
                                            'w-full h-56 md:h-[300px] mb-2'
                                        }
                                    />
                                )
                            })}
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}
export default PagePreview

const postContent = (page) => {
    let postContentData
    if (page?.elementorContent) {
        postContentData = page?.elementorContent
    } else if (page?.content) {
        postContentData = page?.content
    }
    return postContentData
}

const haveChildren = (pageChildren) => {
    return pageChildren?.length > 0
}

export const getServerSideProps = async (context) => {
    const authToken = getAuthToken(context.req)
    const { params } = context || {}
    const { data, errors } =
        (await client.query({
            query: GET_PAGE_BY_ID,
            variables: {
                id: Number(params.id) ?? '',
            },
            context: {
                headers: {
                    authorization: authToken ? `Bearer ${authToken}` : '',
                },
            },
        })) || {}
    const defaultProps = {
        props: {
            page: data || {},
        },
    }
    const loginRedirectURL = getLoginPreviewRedirectUrl(
        'page',
        params?.id ?? ''
    )
    if (errors) {
        return {
            redirect: {
                destination: loginRedirectURL || '/',
                statusCode: 307,
            },
        }
    }
    return handleRedirectsAndReturnData(
        defaultProps,
        data,
        errors,
        'page',
        true,
        loginRedirectURL
    )
}
