import React, { useEffect, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import '../styles/TriggerSideBarComponent.scss'
import PropTypes from "prop-types";
import { CARNIVOROUS, COLLECTOR, WHOLESALE } from "../constants/Constants";
import { FaFilter } from "react-icons/fa6";
import { FloatButton } from "antd";
import FilterDrawer from "./FilterDrawer";
import { useLocation } from "react-router-dom";


const TriggerSidebarComponent = ( { collapsed, setCollapsed, screenName } ) => {

    const [showDrawer, setShowDrawer] = useState(false);
    const [ filterObj, setFilterObj ] = useState( {} );

    const pathname = useLocation().pathname;

    useEffect( () => {
        setFilterObj({})
    }, [ pathname ] );

    return (
        <div className='trigger-container'>
            <div className='trigger-icon-container'>
                {
                    collapsed ? <BsArrowRight className='trigger-icon' color={'#FFFFFF'} size={35}
                                              onClick={() => setCollapsed( !collapsed )}/> :
                        <BsArrowLeft className='trigger-icon' color={'#FFFFFF'} size={35}
                                     onClick={() => setCollapsed( !collapsed )}/>
                }
            </div>
            {
                ( screenName === WHOLESALE || screenName === COLLECTOR || screenName === CARNIVOROUS ) &&
                    <FloatButton
                        shape="square"
                        type='primary'
                        className='animate__animated animate__rotateIn filter-trigger'
                        onClick={() => setShowDrawer(true)}
                        icon={<FaFilter size={40} className='filter-trigger-icon' />}
                    />
            }
            {showDrawer && <FilterDrawer showDrawer={showDrawer}
                                         setShowDrawer={setShowDrawer}
                                         screenName={screenName}
                                         filterObj={filterObj}
                                         setFilterObj={setFilterObj}
            />}

        </div>
    );
};

TriggerSidebarComponent.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
    screenName: PropTypes.string.isRequired
};

export default TriggerSidebarComponent;
