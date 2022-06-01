import { useEffect, useState } from "react"
import { EventItem } from "./EventItem"


export function EventList() {

    const [events, setEvents] = useState([])

    // Dispara uma função quando "algo" acontecer na app (ex: mudança de uma variável)
    useEffect(() => {
        fetch('http://localhost:3000/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, [])

    return (
        <section>
            <h1>Lista de Eventos</h1>

            <ul>
                {events.map(event => {
                    return <EventItem key={event.id} event={event} />
                })}
            </ul>
        </section>
    )
}