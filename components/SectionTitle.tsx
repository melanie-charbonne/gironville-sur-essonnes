type Titles = {
    titleMain: string
    titleWatermark: string
}
export default function sectionTitle(titles :Titles) {
    return (
        <>
            <div className="section-title text-center">
                <h2 className="section-title-main">{titles.titleMain}</h2>
                {titles.titleWatermark && (
                    <span className="section-title-watermark">
                        {titles.titleWatermark}
                    </span>
                )}
            </div>
        </>
    )
}