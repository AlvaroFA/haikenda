import React from 'react';
import Button from '../UI/Button/Button'

const DescriptionField = ({ name, children }) => (
    <div className="DescriptionField">
        <span className="DescriptionFieldName">{name}:</span>
        <div className="DescriptionFieldValue">{children}</div>
    </div>
)

const WorshiftContainer = ({ workshift, startTime, endTime, worker, onUpdate, onDelete }) => (
    <div className='TimeTableContainer'>
        <DescriptionField name="Turno">Turno: {workshift}</DescriptionField>
        <DescriptionField name="Asignado a" >Asignado a : {worker} </DescriptionField>
        <DescriptionField name="Desde"> : {startTime} Hasta: {endTime} </DescriptionField>
        <Button clicked={onDelete}>Borrar</Button>
        <Button clicked={onUpdate}>Editar</Button>
    </div>
);

export default WorshiftContainer;