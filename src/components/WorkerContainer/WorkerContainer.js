import React from 'react';
import Button from '../UI/Button/Button'
import { sendPasswordResetEmail } from '../../providers/RealmProvider';
import './WorkerContainer.css'

// TODO: mover a otro fichero!
const DescriptionField = ({ name, children }) => (
    <div className="DescriptionField">
        <span className="DescriptionFieldName">{name}:</span>
        <div className="DescriptionFieldValue">{children}</div>
    </div>
)

const askAndSendPasswordResetEmail = (email) => {
    if (confirm("Vas a enviar un email a " + email + " para que pueda recuperar su contraseña. Continuar?")) {
        sendPasswordResetEmail(email);
    }
};

/*
 * Component for TimeTable card
 */
const WorkerContainers = ({ name, surname, email, job, admin, onDelete, onUpdate, disabled }) => (
    <div className="WorkerContainer">
        <DescriptionField name="Nombre">{name}</DescriptionField>
        <DescriptionField name="Apellidos">{surname}</DescriptionField>
        <DescriptionField name="Email">{email}</DescriptionField>
        {job
            ? <DescriptionField name="Descripción">{job}</DescriptionField>
            : null}
        {admin
            ? <DescriptionField name="Administrador">Si</DescriptionField>
            : null}
        <div className="WorkerContainerButtons">
            {onDelete ? <Button clicked={onDelete} disabled={disabled}>Borrar</Button> : undefined}
            {onUpdate ? <Button clicked={onUpdate} disabled={disabled}>Editar</Button> : undefined}
            {onUpdate ? <Button clicked={() => askAndSendPasswordResetEmail(email)} disabled={disabled}>Cambiar contraseña</Button> : undefined}
        </div>
    </div>
);

WorkerContainers.defaultProps = {
    disabled: false,
}

export default WorkerContainers;