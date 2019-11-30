import React from 'react';
import { tsPropertySignature } from '@babel/types';


const TimeTableContainer = (props)=> (
    <div className='TimeTableContainer'>
    <p>Titulo: {props.title}</p>
    <p>De: {props.startTime} a {props.endTime} </p>
    </div>
);
    
    export default TimeTableContainer;