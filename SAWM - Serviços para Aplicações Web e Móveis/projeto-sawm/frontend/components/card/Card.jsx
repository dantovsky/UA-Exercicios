import React from 'react'
import { deleteEvent } from "../../services/eventService";

const Card = ({ id, name, description, country, city, date, end_date, activeMenuItem,
    events, eventsCopy, setEvents, setEventsCopy, showSnackbarOk, setMessage, showSnackbarFail,
    setIsModalDetailsOpen, setIdDetails, setFormMode }) => {

    return (
        <div className={`card bg-white result__single `} data-filter={name}
            data-page="1" hidden={!(activeMenuItem == name || activeMenuItem == 'All')}>
            <a href={"https://www.imediacto.com"} className="" target="_blank">
                <span className="label label--small text-orange mr-2">{city}</span>
                <span className="label label--small text-capitalize font-medium">{country}</span>
                <h4 className="mt-2">{name}</h4>
                <p className="small text-bluegrey result__single-url">
                    {description}
                </p>
            </a>
            <div className="actions">
                <img src='images/details.png' alt='Details' onClick={() => { setFormMode('view'); setIsModalDetailsOpen(true); setIdDetails(id); }} />
                <img src='images/edit.png' alt='Editar' data-id={id} onClick={() => { setFormMode('edit'); setIsModalDetailsOpen(true); setIdDetails(id); }} />
                <img src='images/delete.png' alt='Remover' onClick={() => deleteEvent(id, events, eventsCopy, setEvents, setEventsCopy, showSnackbarOk, setMessage, showSnackbarFail)} />
            </div>
        </div>
    )
}

export default Card