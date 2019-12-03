import React from 'react';
import Button from '../UI/Button/Button'

/*Component for TimeTable card
*/
const TimeTableContainer = (props) => (
    <div className='TimeTableContainer'>
        <p>Turno: {props.workshift}</p>
        <p>Asignado a : {props.worker} </p>
        <p>Desde : {props.startTime} Hasta: {props.endTime} </p>
        <Button clicked={props.onClick}>Borrar</Button>
        <Button clicked={props.toupdate}>Editar</Button>
    </div>
);

export default TimeTableContainer;