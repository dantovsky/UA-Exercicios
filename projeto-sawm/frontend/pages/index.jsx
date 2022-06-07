import React, { useState, useEffect } from "react";
import Head from 'next/head'
import EmptyResult from '../components/emptyResult/EmptyResult'
import Couting from '../components/counting/Counting'
import Card from '../components/card/Card'
// import MenuItem from "../components/menuItem/menuItem";
import Form from "../components/form/Form";
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
import { getAllEvents, restoreBD, addEvent } from "../services/eventService";
import ModalDetails from "../components/modalDetails/ModalDetails";

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
    const [snackbarSeverity, setSnackbarSeverity] = useState('success') // success | error

    // Hooks used in POST
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [date, setDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [description, setDescription] = useState('')

    // Used in modal for show detais and update
    const [idDetails, setIdDetails] = useState('')
    const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false)
    const [formMode, setFormMode] = useState('') // view | edit

    // Get all events when component init
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

    // List events in Card components
    const showEventsList = () => {
        return events.map(event =>
            <Card key={event.id} id={event.id} name={event.name} description={event.description} country={event.country}
                city={event.city} date={event.date} end_date={event.end_date} activeMenuItem={activeMenuItem}
                events={events} eventsCopy={eventsCopy} setEvents={setEvents} setEventsCopy={setEventsCopy} showSnackbarOk={showSnackbarOk} setMessage={setMessage} showSnackbarFail={showSnackbarFail}
                setIsModalDetailsOpen={setIsModalDetailsOpen} setIdDetails={setIdDetails} setFormMode={setFormMode} />
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

            <Head>
                <title>Projeto SAWM - Dante Marinho</title>
                <meta name="description" content="App do projeto de Serviços para Aplicações Web e Móveis" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isModalDetailsOpen && <ModalDetails id={idDetails} isModalDetailsOpen={isModalDetailsOpen} setIsModalDetailsOpen={setIsModalDetailsOpen} formMode={formMode}
                setEvents={setEvents} setEventsCopy={setEventsCopy} showSnackbarOk={showSnackbarOk} setMessage={setMessage} showSnackbarFail={showSnackbarFail}
            />}

            <div className="search">
                <Form query={query} setQuery={setQuery} searchEvents={searchEvents} />
            </div>
            <div className="content">
                <div className="menu-filter" data-section="Filters">
                    <div id="search__categories" className="mb-4">
                        <ul className="mb-3">
                            {/* (i) Não foi feito o menu */}
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
                            <img src="images/database.png" onClick={() => restoreBD(setEvents, setEventsCopy, setMessage, showSnackbarOk, showSnackbarFail)} />
                        </Tooltip>
                    </div>
                    <div id="list__results" className="cards">
                        {events?.length > 0 ? showEventsList() : <EmptyResult message={message} />}
                    </div>
                </div>
            </div>

            {/* Modal to add event */}

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