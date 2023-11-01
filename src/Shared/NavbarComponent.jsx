import React from 'react';
import { Col, Menu, Row } from "antd";
import { GiBurningTree, GiCactusPot, GiCarnivorousPlant } from "react-icons/gi";
import { TbHomeEco, TbPlant2 } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import '../Styles/NavBarComponent.scss'
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";

const iconStyle = {
    verticalAlign: '-0.525em'
};

const NavBarComponent = () => {
    const selectedRouteLocation = useLocation().pathname;

    return (
        <Row>
            <Col span={20}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    overflowedIndicator={<RxHamburgerMenu />}
                    defaultSelectedKeys={selectedRouteLocation}
                    style={{ background: 'none', color: '#787878' }}
                    className="nav-menu"
                    items={[
                        {
                            key: '/collection-plants',
                            icon: <TbPlant2 size={22} style={iconStyle}/>,
                            label: <NavLink to='/collection-plants'>Coleccionistas</NavLink>
                        },

                        {
                            key: '/carnivorous-plants',
                            icon: <GiCarnivorousPlant size={22} style={iconStyle}/>,
                            label: <NavLink to='/carnivorous-plants'>Plantas Carnívoras</NavLink>
                        },
                        {
                            key: '/wholesale-plants',
                            icon: <GiCactusPot size={22} style={iconStyle}/>,
                            label: <NavLink to='/wholesale-plants'>Catálogo Por Mayor</NavLink>
                        },
                        {
                            key: '/new-plants',
                            icon: <GiBurningTree size={22} style={iconStyle}/>,
                            label: <NavLink to='/new-plants'>Lo Nuevo</NavLink>
                        },
                        {
                            key: '/other-products',
                            icon: <TbHomeEco size={22} style={iconStyle}/>,
                            label: <NavLink to='/other-products'>Otros Productos</NavLink>
                        },
                    ]}
                />
            </Col>
            <Col className="shopping-cart" span={4}>
                <FaShoppingCart size={30} style={{color: '#787878', verticalAlign: '-0.525em'}}/>
            </Col>
        </Row>


    );
};

export default NavBarComponent;
