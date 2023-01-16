import Head from 'next/head'
import Footer from '../../components/Footer'
import { client } from '../../lib/apollo'
import { GET_POST_BY_URI } from '../../lib/api/news'
import CoverImage from '../../components/CoverImage'
import PostDate from '../../components/Posts/PostDate'
import PostAuthor from '../../components/Posts/PostAuthor'

export default function PostURI({ post }) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>

            <div className="main single single-post">
                <CoverImage
                    featuredImage={post?.featuredImage}
                    title={post.featuredImage?.node?.altText || post.title}
                    containerClassNames={'w-full h-60 md:h-[450px]'}
                    layout={'fill'}
                    classNames={'object-cover'}
                />
                <section>
                    <div className="single-head mt-8">
                        <h1>{post.title}</h1>
                        <div className="flex items-center mt-3 text-grey-79">
                            <PostAuthor author={post.author} />
                            |
                            <PostDate date={post.date} />
                        </div>
                    </div>
                    <article
                        className='mt-8'
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></article>
                </section>
            </div>

            <Footer></Footer>
        </>
    )
}

export const getStaticProps = async ({ params }) => {
    const { data: postData } = await client.query({
        query: GET_POST_BY_URI,
        variables: {
            id: params.uri,
        },
    })
    return {
        props: {
            post: postData?.post,
        },
    }
}

export async function getStaticPaths() {
    const paths = []
    return {
        paths,
        fallback: 'blocking',
    }
}
