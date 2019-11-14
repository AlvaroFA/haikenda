import React from 'react';
import Border from '../hoc/Border';
import MenuBar from  '../Navigation/MenuBar/MenuBar';
import SideMenu from '../Navigation/SideMenu/SideMenu';
import SignUp from '../../containers/SignUp/SignUp';

const layout = (props)=>(
    <Border>
    <MenuBar/> 
    <SideMenu/>
    <main>
        {props.children}
            
    </main>
    </Border>
);
export default layout;