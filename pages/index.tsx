import Head from 'next/head'
import { GetStaticProps } from 'next'
import Footer from '../components/Footer'
import PostCard from '../components/PostCard'
import TheHero from '../components/TheHero/TheHero'
import { getTheHero, getNewsForHome } from '../lib/api'
import { client } from '../lib/apollo'
import { gql } from '@apollo/client'

export default function Home({ posts, page }) {
    return (
        <div>
            <Head>
                <title>Mairie de Gironville-sur-Essones</title>
                <link rel="icon" href="favicon.ico"></link>
            </Head>
            <main className="w-screen py-4 lg:py-16">
                <h1 className="title">Headless WordPress Next.js Starter</h1>
                <p className="description">
                    Get started by editing <code>pages/index.js</code>
                </p>
                <TheHero page={page} />
                <div className="grid">
                  {posts.map((post, i) => {
                    return <PostCard key={post.uri} post={post}></PostCard>
                  })}
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}

export const getStaticProps = async () => {
    const { data: postsData } = await client.query({
        query: getNewsForHome,
    })

    const { data: theHeroData } = await client.query({
        query: getTheHero,
    })

    return {
        props: {
            posts: postsData?.posts?.nodes,
            page: theHeroData?.page,
        },
        revalidate: 10,
    }
}
