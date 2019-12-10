import React from 'react';
import Button from '../../components/UI/Button/Button';
import './TimeTableContainer.css';

/*Component for TimeTable card
*/
/*const TimeTableContainer = (props) => (
    <div className='TimeTableContainer'>
        <p>Titulo: {props.title}</p>
        <p>De: {props.startTime} a {props.endTime} </p>
        <Button clicked={props.onClick} disabled={props.disabled} >Borrar</Button>
        <Button clicked={props.toupdate} disabled={props.disabled}>Editar</Button>
    </div>
);
*/

const DescriptionField = ({ name, children }) => (
    <div className="DescriptionField">
        <span className="DescriptionFieldName">{name}:</span>
        <div className="DescriptionFieldValue">{children}</div>
    </div>
)
const TimeTableContainer = ({ title, startTime, endTime, onDelete, onUpdate, disabled }) => (
    <div className="TimeTableContainer">
        <DescriptionField name="Titulo">{title}</DescriptionField>
        <DescriptionField name="Horario"> {startTime} a {endTime}</DescriptionField>
        <div className="TimeTableContainerButtons">
            {onDelete ? <Button clicked={onDelete} disabled={disabled}>Borrar</Button> : undefined}
            {onUpdate ? <Button clicked={onUpdate} disabled={disabled}>Editar</Button> : undefined}
        </div>
    </div>
);




export default TimeTableContainer;