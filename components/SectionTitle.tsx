type Titles = {
    titleMain: string
    titleWatermark: string
}
export default function sectionTitle(titles: Titles) {
    return (
        <>
            <div className="section-title text-center mb-9 lg:mb-15">
                {titles.titleWatermark && (
                    <span className="section-title-watermark font-hn text-2xl md:text-5xl lg:text-7xl text-blue-30">
                        {titles.titleWatermark}
                    </span>
                )}
                <h2 className="section-title-main text-xl md:text-2xl lg:text-4xl text-blue-dark z-1 -mt-8">
                    {titles.titleMain}
                </h2>
            </div>
        </>
    )
}
