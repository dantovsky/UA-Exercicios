export function EventItem(props) {
    return (
        <li>
            <strong>{props.event.name}</strong>
            <p>{props.event.description}</p>
        </li>
    )
}