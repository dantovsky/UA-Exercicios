import React from 'react'

// onKeyDown={searchEvents}
const Form = ({query, setQuery, searchEvents}) => (
    <form className="form" onSubmit={searchEvents}>
        <input className="input" type="text" name="query" placeholder="Type to Search"
            value={query} onChange={e => setQuery(e.target.value)} />
        <button className="button" type="submit">Search</button>
    </form>
)

export default Form