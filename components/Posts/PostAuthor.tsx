export default function PostAuthor({ author }) {
    const isAuthorHaveFullName = author?.node?.firstName && author?.node?.lastName
    const name = isAuthorHaveFullName
        ? `${author.node.firstName} ${author.node.lastName}`
        : author.node.name || null

    return (
        <div className="text-sm text-grey-79 my-2">
            {name}
        </div>
    )
}