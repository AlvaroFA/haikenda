import React from 'react';
import '../Backdrop/Backdrop.css';


const backdrop = (props) => (
    props.show ? <div className='Backdrop'></div> : null

);

export default backdrop;