import cx from "classnames"

type EventDates = {
    startDate?: string,
    endDate?: string,
    dateClassNames?: string,
}
export default function EventDate({ startDate, endDate, dateClassNames }: EventDates) {
    return (
        <>
            {/* if StartDate + End Date  else if only StartDate*/}
            {startDate && endDate ? (
                <p className={cx('flex', dateClassNames)}>
                    <>
                        Du {startDate} au {endDate}
                    </>
                </p>
            ) : startDate ? (
                <p className={dateClassNames}>
                    <>{startDate}</>
                </p>
            ) : null}
        </>
    )
}
