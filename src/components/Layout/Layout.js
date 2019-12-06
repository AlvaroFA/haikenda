import React from 'react';
import Border from '../hoc/Border';
import MenuBar from  '../Navigation/MenuBar/MenuBar';

const layout = ({children, isLoggedIn, isAdmin, user})=>(
    <Border>
        <MenuBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} user={user}/>
        <main>
            {children}
        </main>
    </Border>
);
export default layout;