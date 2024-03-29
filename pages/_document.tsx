import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* <link rel="icon" href="favicon.ico"></link> */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                />
                <Script
                    src="http://gironville-sur-essonne.local/wp-includes/js/jquery/jquery.min.js"
                    strategy="lazyOnload"
                />
                <Script
                    src="http://gironville-sur-essonne.local/wp-content/plugins/elementor/assets/js/frontend.js"
                    strategy="lazyOnload"
                />
                <Script
                    src="http://gironville-sur-essonne.local/wp-content/plugins/elementskit-lite/widgets/init/assets/js/elementor.js"
                    strategy="lazyOnload"
                />
                <Script
                    src="http://gironville-sur-essonne.local/wp-content/plugins/elementskit-lite/widgets/init/assets/js/widget-scripts.js?ver=2.9.0"
                    strategy="lazyOnload"
                />
                <Script
                    src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"
                    strategy="lazyOnload"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
