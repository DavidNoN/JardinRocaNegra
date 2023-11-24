import React from 'react';
import { Avatar, Col, Dropdown, Menu, message, Row } from "antd";
import { GiBurningTree, GiCactusPot, GiCarnivorousPlant } from "react-icons/gi";
import { TbHomeEco, TbPlant2 } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import '../styles/NavBarComponent.scss'
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import Link from "antd/es/typography/Link";
import { useDispatch, useSelector } from "react-redux";
import { AuthStatus, signOut } from "../store/auth/authSlice";
import { doubleMessageNotification } from "../Components/MessageApi";

const iconStyle = {
    verticalAlign: '-0.525em'
};

const NavBarComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status } = useSelector( state => state.user );

    const [ messageApi, contextHolder ] = message.useMessage();

    const signOutUser =  async () => {
        await doubleMessageNotification(messageApi, 'loading', 'loading', 'Saliendo de la aplicación...', 1, 'success', 'success', 'Salida Exitosa!', 1);
        localStorage.clear();
        await navigate('/new-plants');
        return dispatch( signOut() );
    }

    const items = [
        {
            key: '1',
            label: (
                <NavLink to='/my-profile'>
                    Mi Perfil
                </NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <Link onClick={signOutUser}>
                    Logout
                </Link>
            ),
        },
    ];

    const { screenName } = useSelector( state => state.screen );

    return (
        <Row justify='space-between'>
            {contextHolder}
            <Col xs={16}
                 sm={18}
                 md={20}
                 lg={21}
                 xl={21}
                 xxl={21}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    overflowedIndicator={<RxHamburgerMenu/>}
                    selectedKeys={[`/${screenName}`]}
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
            <Col className="shopping-cart"
                 xs={8}
                 sm={6}
                 md={4}
                 lg={3}
                 xl={3}
                 xxl={3}>
                <FaShoppingCart size={30} style={{ color: '#787878', verticalAlign: '-0.525em' }}/>
                {status === AuthStatus.AUTHENTICATED &&
                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                        <Avatar style={{ cursor: 'pointer' }} size={40} icon={<AiOutlineUser/>}/>
                    </Dropdown>
                }
            </Col>
        </Row>


    );
};

export default NavBarComponent;
