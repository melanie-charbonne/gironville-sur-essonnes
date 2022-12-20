
import classNames from 'classnames'

type Titles = {
    titleMain: string
    titleWatermark: string
    left?: boolean
    theme?: string 
}
export default function sectionTitle({titleMain, titleWatermark, left, theme='default'}: Titles) {
    return (
        <>
            <div className={`section-title ${left ? 'text-left' : 'text-center'} mb-9 lg:mb-15`}>
                {titleWatermark && (
                    <span className={classNames(
                        'section-title-watermark',
                        'font-hn',
                        'text-2xl',
                        'md:text-5xl', 
                        'lg:text-7xl' ,
                        {
                            'text-white': theme == 'light',
                            'text-blue-30' :  theme == 'default'  
                        }
                    )}>
                        {titleWatermark}
                    </span>
                )}
                <h2 className="section-title-main text-xl md:text-2xl lg:text-4xl text-blue-dark z-1 -mt-8">
                    {titleMain}
                </h2>
            </div>
        </>
    )
}
