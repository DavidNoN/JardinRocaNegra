import React, {LegacyRef} from 'react';
import {Link, NavLink} from "react-router-dom";
import '../index.css';
import '../Styles/NavBar.scss';
import {MenuItems} from "../Components/MenuApp";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


const NavBar = () => {
    return (
        <header className="header px-3 py-3 bg-orange" id="header">
            <nav className="navbar container">
                <Link to="/new-plants"
                      className="col-auto col-sm-auto col-md-auto col-lg-auto col-xl-auto col-xxl-auto me-sm-2 me-md-3 me-lg-auto text-white text-decoration-none justify-se mb-3">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1200px-Bootstrap_logo.svg.png"
                        alt="logo" width="40" height="40"/>
                </Link>

                <form className="col-auto col-sm-auto col-md-auto col-lg-auto col-xl-auto col-xxl-auto mb-3">
                    <div className="input-group">
                        <input type="text" className="form-control search-plant" placeholder="Busca una planta!"
                               aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button className="btn btn-outline" type="button"
                                id="button-addon2">
                            <FontAwesomeIcon icon={faSearch} style={{color: "white"}}/>
                        </button>
                    </div>
                </form>

                <div className="menu" id="menu">
                    <ul className="menu-list">
                        {
                            MenuItems.map((menuItem, index) => {

                                const Icon = menuItem.component;

                                return <li key={index} className="menu-item">

                                    <NavLink to={menuItem.url} aria-current="page" className={({isActive}) =>
                                        isActive ? 'is-active nav-link menu-link menu-item-active' : 'nav-link text-black-50'
                                    }>
                                        <Icon {...menuItem.props}  />
                                        {menuItem.name}
                                    </NavLink>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
