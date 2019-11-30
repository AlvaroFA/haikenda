import React from 'react';
import Button from '../../components/UI/Button/Button'


const TimeTableContainer = (props) => (
    <div className='TimeTableContainer'>
        <p>Titulo: {props.title}</p>
        <p>De: {props.startTime} a {props.endTime} </p>
        <Button clicked={props.onClick}>Borrar</Button>
    </div>
);

export default TimeTableContainer;