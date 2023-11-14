import React, { useState } from 'react';
import { Breadcrumb, FloatButton, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import SideBarComponent from "../Shared/SideBarComponent";
import '../styles/BaseScreen.scss'
import NavBarComponent from "../Shared/NavbarComponent";
import TriggerSidebarComponent from "../Shared/TriggerSidebarComponent";
import { useMobileCheck } from "../hooks/useMobileCheck";
import { NavLink } from "react-router-dom";
import FooterComponentScreen from "../Shared/FooterComponentScreen";
import { RiWhatsappFill } from "react-icons/ri";
import { BlackRockRouter } from "../router/BlackRockRouter";
import { useSelector } from "react-redux";

const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    padding: '10px 0 10px 0',
    marginBottom: '40px',
    backgroundColor: '#EEEEEE',
};

const contentStyle = {
    overflow: 'initial',
    marginBottom: '40px'
};


const sideStyle = {
    height: '50vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    textAlign: 'start',
};

const sideStyleCollapsed = {
    height: '40vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
};

const breadcrumbStyle = {
    marginBottom: 40
}

const BaseScreen = () => {

    const [ collapsed, setCollapsed ] = useState( true );


    const { browserHistory } = useSelector( state => state.screen );


    return (
        <Layout>
            <FloatButton style={{ width: 60, height: 60 }} icon={<RiWhatsappFill size={40} color={'#25D366'}/>}
                         href='https://wa.link/m219d3' target='_blank'/>
            <Sider style={collapsed ? sideStyleCollapsed : sideStyle} width={collapsed ? 80 : 250} collapsible
                   collapsed={collapsed}
                   trigger={useMobileCheck() ? null :
                       <TriggerSidebarComponent collapsed={collapsed} setCollapsed={setCollapsed}/>}
                   breakpoint="lg"
                   onBreakpoint={( broken ) => {
                       setCollapsed( broken )
                   }}
                   className="background-sidebar">
                <SideBarComponent collapsed={collapsed}/>
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 100 : 270, marginRight: 20 }}>
                <Header style={headerStyle}>
                    <NavBarComponent/>
                </Header>
                <Breadcrumb
                    style={breadcrumbStyle}
                    separator='>'
                    items={browserHistory.map( ( history ) => ( {
                        separator: '>',
                        title: <NavLink to={history.pathname}>{history.breadcrumb}</NavLink>
                    } ) )}
                />
                <Content style={contentStyle}>
                    <BlackRockRouter/>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    <FooterComponentScreen/>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default BaseScreen;
