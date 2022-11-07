import Image from 'next/image'
import styles from './TheHero.module.scss'

export default function TheHero({ page }) {
    const image = (
        <Image
            width={1440}
            height={600}
            layout="responsive"
            sizes="100vw"
            alt={page?.homePage?.theHero?.heroImage.altText}
            src={page?.homePage?.theHero?.heroImage.sourceUrl}
            className="md:opacity-60 w-full"
        />
    )

    return (
        <>
            <section className={`${styles.hero} relative`}>
                <div className="hero_image w-full flex flex-wrap relative">
                    <div
                        className={`${styles.hero_image_item} ${styles.background_curve} w-full background_curve flex md:bg-gradient-to-r from-blue-dark to-neutral-500`}
                    >
                        {image}
                    </div>
                </div>
                <div
                    className="
                hero-text 
                p-4
                md:p-0
                md:absolute
                md:top-1/2
                md:left-4
                md:lg:left-14
                md:-translate-y-1/2
                bg-gradient-to-r from-blue-30 
                md:from-transparent
                text-grey-dark
                md:text-white"
                >
                    <h1
                        className="md:w-1/2 lg:w-1/3"
                        dangerouslySetInnerHTML={{
                            __html: page?.homePage?.theHero?.heroTitle,
                        }}
                    />
                    <p className="my-2 md:w-3/4 lg:w-1/2">
                        {page?.homePage?.theHero?.heroDescription}
                    </p>
                </div>
            </section>
        </>
    )
}
