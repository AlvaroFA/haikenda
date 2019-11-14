import React from 'react';
import '../Modal/Modal.css';


const modal = (props)=> (
<div className='Modal'>
    {props.children}
</div>

);

export default modal;