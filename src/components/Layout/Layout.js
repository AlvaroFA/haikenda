import React from 'react';
import Aux from '../../hoc/Aux';
import MenuBar from  '../Navigation/MenuBar/MenuBar';

const layout = (props)=>(
    <Aux>
    <MenuBar/>   
    <main>
        {props.children}    
    </main>
    </Aux>
);

export default layout;