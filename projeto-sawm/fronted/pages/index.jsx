import React, { useState, useEffect } from "react";
import EmptyResult from '../components/emptyResult/emptyResult'
import Couting from '../components/counting/counting'
import Card from '../components/card/card'
// import MenuItem from "../components/menuItem/menuItem";
import Form from "../components/form/form";
import {
    Button, TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
    Tooltip
} from "@mui/material";
import { getAllEvents, restoreBD, addEvent, deleteEvent } from "../services/eventService";

const App = () => {
    const [query, setQuery] = useState('')
    const [queryApplyed, setQueryApplyed] = useState('')
    const [activeMenuItem, setActiveMenuItem] = useState('All')

    // Novos
    const [events, setEvents] = useState([]) // Main data stores here
    const [eventsCopy, setEventsCopy] = useState([]) // A copy of main data used in search function
    const [message, setMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('success')

    // Hooks used in POST
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [date, setDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        getAllEvents(setEvents, setEventsCopy, setMessage)
    }, []);

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


    // Searching events
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
                city={event.city} date={event.date} end_date={event.end_date} activeMenuItem={activeMenuItem}
                events={events} eventsCopy={eventsCopy} setEvents={setEvents} setEventsCopy={setEventsCopy} showSnackbarOk={showSnackbarOk} setMessage={setMessage} showSnackbarFail={showSnackbarFail} />
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
                        <Tooltip title="Restaurar BD" placement="right" arrow className="cursor-pointer">
                            <img src="images/database.png" onClick={() => restoreBD(setEvents, setEventsCopy, setMessage)} />
                        </Tooltip>
                    </div>
                    <div id="list__results" className="cards">
                        {events?.length > 0 ? showEventsList() : <EmptyResult message={message} />}
                    </div>
                </div>
            </div>

            {/* Modal */}
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
                    <Button onClick={() => addEvent(name, description, country, city, date, endDate, setEvents, setEventsCopy, setMessage, setIsModalOpen, showSnackbarOk, showSnackbarFail)} autoFocus>Guardar</Button>
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