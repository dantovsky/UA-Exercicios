import React, { useEffect, useState } from 'react'
import {
    Button, TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert
} from "@mui/material";
import { getEventById, updateEvent } from "../../services/eventService";

const ModalDetails = ({ id, isModalDetailsOpen, setIsModalDetailsOpen, formMode, setEvents, setEventsCopy, showSnackbarOk, setMessage, showSnackbarFail }) => {

    // Modal
    const [inputDisabled, setInputDisabled] = useState(true)

    // Event details
    const [event, setEvent] = useState({
        id: 0,
        name: "",
        description: "",
        country: "",
        city: "",
        date: "",
        end_date: ""
    })

    useEffect(() => {
        formMode === 'view' ? setInputDisabled(true) : setInputDisabled(false)
        setIsModalDetailsOpen(true)
        getEventById(id, setEvent, showSnackbarFail)

    }, [])

    return (
        <>
            <Dialog
                open={isModalDetailsOpen}
                onClose={() => setIsModalDetailsOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <strong className="uppercase">{inputDisabled ? 'Detalhes do evento' : 'Update do Evento'}</strong>
                    <img src={inputDisabled ? 'images/edit.png' : 'images/details.png'} alt='Editar' style={{ float: 'right' }} className="cursor-pointer" onClick={() => setInputDisabled(!inputDisabled)} />
                </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description"> */}
                    {/* Formulário para registar um novo evento. */}
                    <TextField disabled={inputDisabled} id="name" label="Nome" variant="standard" className="text-field" InputLabelProps={{ shrink: true }} value={event?.name} onChange={e => setEvent({ ...event, name: e.target.value })} />
                    <div className="flex">
                        <TextField disabled={inputDisabled} id="country" label="País" variant="standard" className="text-field" InputLabelProps={{ shrink: true }} value={event?.country} onInput={e => setEvent({ ...event, country: e.target.value })} />
                        <TextField disabled={inputDisabled} id="city" label="Cidade" variant="standard" className="text-field" InputLabelProps={{ shrink: true }} value={event?.city} onInput={e => setEvent({ ...event, city: e.target.value })} />
                    </div>
                    <div className="flex">
                        <TextField disabled={inputDisabled} id="date" label="Data início" variant="standard" className="text-field" type="date" InputLabelProps={{ shrink: true }} value={event?.date?.split('T')[0]} onInput={e => setEvent({ ...event, date: e.target.value })} />
                        <TextField disabled={inputDisabled} id="endDate" label="Data fim" variant="standard" className="text-field" type="date" InputLabelProps={{ shrink: true }} value={event?.end_date?.split('T')[0]} onInput={e => setEvent({ ...event, end_date: e.target.value })} />
                    </div>
                    <TextField disabled={inputDisabled} id="description" label="Descrição" variant="standard" className="text-field" multiline rows={3} InputLabelProps={{ shrink: true }} value={event?.description} onChange={e => setEvent({ ...event, description: e.target.value })} />
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModalDetailsOpen(false)}>FECHAR</Button>
                    {!inputDisabled && <Button onClick={() => updateEvent(id, event, setEvents, setEventsCopy, showSnackbarOk, setMessage, showSnackbarFail, setIsModalDetailsOpen)} autoFocus>Guardar</Button>}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalDetails