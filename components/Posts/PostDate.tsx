export default function PostDate({ date: date }) {
    let postDate = new Date(date)
    let formatedDate = postDate.toLocaleDateString(('fr-FR'), {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    return <div className="post-date text-sm text-grey-79 my-2">{formatedDate}</div>
}
