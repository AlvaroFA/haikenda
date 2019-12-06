import React from 'react';
import Button from '../UI/Button/Button'
import {sendPasswordResetEmail} from '../../providers/RealmProvider';

/*
 * Component for TimeTable card
 */
const WorkerContainers = ({name, surname, email, job, admin, onDelete, onUpdate, disabled}) => (
    <div className="TimeTableContainer">
        <p>Nombre: {name}</p>
        <p>Apellidos: {surname} </p>
        <p>Email: {email}</p>
        { job? <p>Descripción: {job}</p> : '' }
        { admin ? <p className="tag">Administrador</p> : ""}
        { onDelete ? <Button clicked={onDelete} disabled={disabled}>Borrar</Button> : undefined }
        { onUpdate ? <Button clicked={onUpdate} disabled={disabled}>Editar</Button> : undefined }
        { onUpdate ? <Button clicked={()=>sendPasswordResetEmail(email)} disabled={disabled}>Enviar email de cambio de contraseña</Button> : undefined}
    </div>
);

WorkerContainers.defaultProps= {
    disabled: false,
}

export default WorkerContainers;