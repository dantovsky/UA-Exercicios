import React from 'react'
import './emptyResult.scss'

const EmptyResult = () => (
    <div className="emptyResult">
        <div className="left">
            <div className="text">
                <h1 className="h1">Haven't found what you are looking for?</h1>
                <p>Please give it another try!</p>
            </div>
        </div>
        <div className="right">
            <img src="images/illustration-empty-state.png" alt="Illustration empty result"/>
        </div>
    </div>
)

export default EmptyResult