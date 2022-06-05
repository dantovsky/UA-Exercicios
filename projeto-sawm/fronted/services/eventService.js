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

const restoreBD = (setEvents, setEventsCopy, setMessage) => {
    fetch("http://localhost:3000/events/utils/restore")
        .then(res => res.json())
        .then(res => {
            getAllEvents(setEvents, setEventsCopy, setMessage)
        })
        .catch(err => {
            console.log('ERROR restoring data')
            setMessage('Error restoring data...')
        })
}

const addEvent = (name, description, country, city, date, endDate, setEvents, setEventsCopy, setMessage, setIsModalOpen, showSnackbarOk, showSnackbarFail) => {
    console.log('Name:', name)
    console.log('Country:', country)
    console.log('City:', city)
    console.log('Date:', date)
    console.log('End date:', endDate)
    console.log('Description:', description)

    if (!name || ! country || !city || !date) {
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

export { getAllEvents, restoreBD, addEvent, deleteEvent }