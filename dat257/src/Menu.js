import { slide as Menu } from 'react-burger-menu'
import './Menu.css';
import React from 'react';

/*function for the sidebar and its items*/
function props(userID){
    return (
        <Menu right
            isOpen={ false }>
            <a className="menu-item" href="/">
                All Users
            </a>
            <a className="menu-item" href="/Home">
                Home
            </a>
            <a className="menu-item" href="/statistics">
                Statistics
            </a>
            <a className="menu-item" href="/information">
                Information
            </a>
            <a className="menu-item" href="/about-us">
                About Us
            </a>
        </Menu>
    );
}

export default props;
