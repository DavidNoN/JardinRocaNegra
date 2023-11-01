import React from 'react';
import { Menu } from "antd";
import { FaTruckFast } from "react-icons/fa6";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { MdConnectWithoutContact } from "react-icons/md";
import { PiSignIn } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import logoWhite from "../assets/logo192white.png";
import '../Styles/SideBarComponent.scss'
import PropTypes from "prop-types";

const SideBarComponent = ({collapsed}) => {

    return (
        <div>
            <div className="sidebar-logo">
                {!collapsed && <img src={logoWhite} width={150} height={150} alt="Logo"/> }
            </div>

            <hr/>

            <Menu
                theme="dark"
                mode="inline"
                style={{ background: 'none' }}
                className="side-menu"
                items={[
                    {
                        key: '1',
                        icon: <FaTruckFast size={30}/>,
                        label: 'Envíos',
                    },
                    {
                        key: '2',
                        icon: <BsFillPatchQuestionFill size={30}/>,
                        label: 'Preguntas Frecuentes',
                    },
                    {
                        key: '3',
                        icon: <MdConnectWithoutContact size={30}/>,
                        label: 'Contacto',
                    },
                    {
                        key: '4',
                        icon: <PiSignIn size={30}/>,
                        label: 'Ingresar',
                    },
                    {
                        key: '5',
                        icon: <RiAdminFill size={30}/>,
                        label: 'Admin',
                    }
                ]}
            />
        </div>
    );
};

SideBarComponent.propTypes = {
    collapsed: PropTypes.bool.isRequired
};

export default SideBarComponent;
