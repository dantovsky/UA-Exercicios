import React, { useState, useEffect } from "react";
import "../styles.scss";
import EmptyResult from '../components/emptyResult/emptyResult'
import Couting from '../components/counting/counting'
import Card from '../components/card/card'
import MenuItem from "../components/menuItem/menuItem";
import Form from "../components/form/form";

const App = () => {
    const [query, setQuery] = useState('')
    const [queryApplyed, setQueryApplyed] = useState('')
    const [resultPosts, setResultPosts] = useState([])
    const [activeMenuItem, setActiveMenuItem] = useState('All')

    // Novos
    const [events, setEvents] = useState([])
    const [eventsCopy, setEventsCopy] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch("http://localhost:3000/events")
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setEvents(res)
                setEventsCopy(res)
                setMessage('')
            })
            .catch(err => {
                console.log('ERROR fetching data')
                setMessage('Error fetching data...')
            })
    }, []);

    const deleteEvent = (event) => {

        const id = event.target.dataset.id
        console.log('ID para delete:', id)

        fetch("http://localhost:3000/events/" + id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status == 'OK') {
                    setEvents(events.filter(event => event.id != id))
                    setEventsCopy(eventsCopy.filter(event => event.id != id))
                }
            })
            .catch(err => {
                console.log('ERROR deleting event')
                setMessage('Error deleting event...')
            })
    }

    // Set the active menu
    const handleActive = (menuItem) => {
        setActiveMenuItem(menuItem)
    }

    // // Get the menu filter dinamically
    // const getListMenu = () => {

    //     // Get distinct menu names present in result search
    //     const menuFinded = [...new Set(setResultPosts(({ category }) => category))].sort()
    //     const index = menuFinded.indexOf('All')
    //     if (index > -1) {
    //         menuFinded.splice(index, 1)
    //     }

    //     const menuItems = menuFinded.map(item => <MenuItem item={item} activeMenuItem={activeMenuItem} handleActive={handleActive} />)
    //     const allMenuItem = <MenuItem item={'All'} activeMenuItem={activeMenuItem} handleActive={handleActive} />

    //     if (menuFinded.length > 1) {
    //         menuItems.unshift(allMenuItem)
    //     }

    //     return menuItems
    // }


    // Ser data on searching
    const searchEvents = e => {
        e.preventDefault()

        if (query.length == 0 || query == '') {
            setEvents(eventsCopy)
        } else {
            setEvents(eventsCopy.filter(event =>
                event.name.toLowerCase().indexOf(query.toLowerCase().trim()) != -1 ||
                event.description.toLowerCase().indexOf(query.toLowerCase().trim()) != -1))
        }
        setQueryApplyed(query)
        return events.length
    }

    // List posts in Card components
    const showEventsList = () => {
        return events.map(event =>
            <Card key={event.id} id={event.id} name={event.name} description={event.description} country={event.country}
                city={event.city} date={event.date} end_date={event.end_date} activeMenuItem={activeMenuItem} deleteEvent={deleteEvent} />

            // <Card id={post.id} category={post.category} url={post.url} target={post.target}
            //     date={post.date} title={post.title} slug={post.slug} activeMenuItem={activeMenuItem} />

        )
    }

    return (
        <div className="app container">
            <div className="search">
                <Form query={query} setQuery={setQuery} searchEvents={searchEvents} />
            </div>
            <div className="content">
                <div className="menu-filter" data-section="Filters">
                    <div id="search__categories" className="mb-4">
                        <ul className="mb-3">
                            <li>Bailes</li>
                            <li>Workshops</li>
                            {/* {getListMenu()} */}
                        </ul>
                    </div>
                </div>
                <div className="list">
                    <Couting numEvents={events?.length} queryApplyed={queryApplyed} />
                    <div id="list__results" className="posts">
                        {events?.length > 0 ? showEventsList() : <EmptyResult message={message} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;