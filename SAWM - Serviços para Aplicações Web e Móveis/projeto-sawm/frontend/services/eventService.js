const getAllEvents = (setEvents, setEventsCopy, setMessage) => {
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

const getEventById = (id, setEvent, showSnackbarFail) => {
    fetch("http://localhost:3000/events/" + id)
        .then(res => res.json())
        .then(res => {
            console.log('Evento obtido ::')
            console.log(...res)
            setEvent(...res)
        })
        .catch(err => {
            console.log('ERROR fetching data')
            showSnackbarFail('Error fetching data...')
        })
}

const restoreBD = (setEvents, setEventsCopy, setMessage, showSnackbarOk, showSnackbarFail) => {
    fetch("http://localhost:3000/events/utils/restore")
        .then(res => res.json())
        .then(res => {
            getAllEvents(setEvents, setEventsCopy, setMessage) // list the restored events
            showSnackbarOk('Events restored from BD.')
        })
        .catch(err => {
            console.log('ERROR restoring data')
            setMessage('Error restoring data...')
            showSnackbarFail('Fail restoring data.... Has something wrong with connection.')
        })
}

const addEvent = (name, description, country, city, date, endDate, setEvents, setEventsCopy, setMessage, setIsModalOpen, showSnackbarOk, showSnackbarFail) => {
    console.log('Name:', name)
    console.log('Country:', country)
    console.log('City:', city)
    console.log('Date:', date)
    console.log('End date:', endDate)
    console.log('Description:', description)

    if (!name || !country || !city || !date) {
        showSnackbarFail('Preencha os dados no formulário.')
        return false
    }

    if (!endDate) {
        endDate = null
    }

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
                    getAllEvents(setEvents, setEventsCopy, setMessage)
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
            showSnackbarFail('Fail to save the new event.')
        })
}

const updateEvent = (id, event, setEvents, setEventsCopy, showSnackbarOk, setMessage, showSnackbarFail, setIsModalDetailsOpen) => {

    if (!event.name || !event.country || !event.city || !event.date) {
        showSnackbarFail('Preencha os dados no formulário.')
        return false
    }

    if (!event.end_date) {
        event.end_date = null
    }

    fetch("http://localhost:3000/events/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            name: event.name,
            description: event.description,
            country: event.country,
            city: event.city,
            date: event.date != null ? event.date.substr(0, 10) : event.date,
            endDate: event.end_date != null ? event.end_date.substr(0, 10) : event.end_date
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            switch (data.status) {
                case 'OK':
                    getAllEvents(setEvents, setEventsCopy, setMessage)
                    setIsModalDetailsOpen(false)
                    showSnackbarOk(data.message)
                    break;
                case 'FAIL':
                    setIsModalDetailsOpen(false)
                    showSnackbarFail(data.message)
                    break;
                default:
                    break;
            }
        })
        .catch(err => {
            console.log('ERROR updating the new event')
            setMessage('ERROR updating the new event...')
            showSnackbarFail(err.message)
        })
}

const deleteEvent = (id, events, eventsCopy, setEvents, setEventsCopy, showSnackbarOk, setMessage, showSnackbarFail) => {

    // const id = event.target.dataset.id
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
            showSnackbarFail(err.message)
        })
}

export { getAllEvents, restoreBD, addEvent, deleteEvent, getEventById, updateEvent }