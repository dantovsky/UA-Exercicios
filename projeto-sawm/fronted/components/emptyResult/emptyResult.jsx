import React from 'react'
// import './emptyResult.scss'

const EmptyResult = ({ message }) => (
    <div className="emptyResult">
        <div className="left">
            <div className="text">
                <br />
                <h1 className="h1">{message || "Não encontra o que procura?" }</h1>
                <br />
                <p>Tente uma outra pesquisa!</p>
            </div>
        </div>
        <div className="right">
            <img src="images/illustration-empty-state.png" alt="Illustration empty result" />
        </div>
    </div>
)

export default EmptyResult