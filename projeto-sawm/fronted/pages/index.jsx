import React, { useState, useEffect } from "react";
import "../styles.scss";
import EmptyResult from '../components/emptyResult/emptyResult'
import Couting from '../components/counting/counting'
import Card from '../components/card/card'
import MenuItem from "../components/menuItem/menuItem";
import Form from "../components/form/form";
import {
    Button, TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert
} from "@mui/material";

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
        getAllEvents()
    }, []);

    const getAllEvents = () => {
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
    }

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
                    showSnackbarOk(data.message)
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

    const showSnackbarOk = (message) => {
        setIsSnackbarOpen(true)
        setSnackbarMessage(message)
        setSnackbarSeverity('success')
    }

    const showSnackbarFail = (message) => {
        setIsSnackbarOpen(true)
        setSnackbarMessage(message)
        setSnackbarSeverity('error')
    }

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [date, setDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')

    const addEvent = () => {
        console.log('Name:', name)
        console.log('Country:', country)
        console.log('City:', city)
        console.log('Date:', date)
        console.log('End date:', endDate)
        console.log('Description:', description)

        fetch("http://localhost:3000/events/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, description, country, city, date, endDate
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                switch (data.status) {
                    case 'OK':
                        getAllEvents()
                        setIsModalOpen(false)
                        showSnackbarOk(data.message)
                        break;
                    case 'FAIL':
                        setIsModalOpen(false)
                        showSnackbarFail(data.message)
                        break;
                    default:
                        break;
                }
            })
            .catch(err => {
                console.log('ERROR adding the new event')
                setMessage('ERROR adding the new event...')
                showSnackbarFail(err.message)
            })
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
                    <br />
                    <div className="flex">
                        <Couting numEvents={events?.length} queryApplyed={queryApplyed} />
                        <Button variant="contained" className="btn-add-event" onClick={() => setIsModalOpen(true)}>ADICIONA EVENTO</Button>
                    </div>
                    <div id="list__results" className="cards">
                        {events?.length > 0 ? showEventsList() : <EmptyResult message={message} />}
                    </div>
                </div>
            </div>

            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><strong className="uppercase">Criação de novo evento</strong></DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description"> */}
                    Formulário para registar um novo evento.
                    <TextField id="name" label="Nome" variant="standard" className="text-field" value={name} onChange={e => setName(e.target.value)} />
                    <div className="flex">
                        <TextField id="country" label="País" variant="standard" className="text-field" value={country} onInput={e => setCountry(e.target.value)} />
                        <TextField id="city" label="Cidade" variant="standard" className="text-field" value={city} onInput={e => setCity(e.target.value)} />
                    </div>
                    <div className="flex">
                        <TextField id="date" label="Data início" variant="standard" className="text-field" type="date" InputLabelProps={{ shrink: true }} value={date} onInput={e => setDate(e.target.value)} />
                        <TextField id="endDate" label="Data fim" variant="standard" className="text-field" type="date" InputLabelProps={{ shrink: true }} value={endDate} onInput={e => setEndDate(e.target.value)} />
                    </div>
                    <TextField id="description" label="Descrição" variant="standard" className="text-field" multiline rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalOpen(false)}>FECHAR</Button>
                    <Button onClick={() => addEvent()} autoFocus>Guardar</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={() => setIsSnackbarOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setIsSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default App;