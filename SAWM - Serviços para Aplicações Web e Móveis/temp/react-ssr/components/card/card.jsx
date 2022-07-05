import React from 'react'

const Card = ({ id, name, description, country, city, date, end_date, activeMenuItem, deleteEvent }) => (
    <div className={`card bg-white result__single `} data-filter={name}
        data-page="1" hidden={!(activeMenuItem == name || activeMenuItem == 'All')}>
        <a href={"url"} className="" target="_blank">
            <span className="label label--small text-orange mr-2">{city}</span>
            <span className="label label--small text-capitalize font-medium">{country}</span>
            <h4 className="mt-2">{name}</h4>
            <p className="small text-bluegrey result__single-url">
                {description}
            </p>
        </a>
        <div className="actions">
            <button data-id={id} onClick={deleteEvent}>del</button>
            <button>edit</button>
        </div>
    </div>
)

export default Card