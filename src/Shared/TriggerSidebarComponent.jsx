import React from 'react';
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import '../styles/TriggerSideBarComponent.scss'
import PropTypes from "prop-types";
import { Tree } from "antd";
import { TbPlant2 } from "react-icons/tb";
import { GiBulb, GiCarnivorousPlant } from "react-icons/gi";
import { PiCactusFill } from "react-icons/pi";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { NEW_PLANTS, WHOLESALE } from "../constants/Constants";



const categories = [
    {
        title: 'Succulents',
        key: '07580817-5b7e-4873-9a94-cba71f370fb8',
        icon: <TbPlant2 size={15} color={'#90486D'}/>,
        children: [
            {
                title: 'Aizoaceae',
                key: '4f3ef4d3-4451-456f-95a9-9fd37901f730',
                children: [
                    {
                        title: 'Lithops',
                        key: '258788fe-01ba-4ba6-b54c-14fc544aab9e',
                    }
                ]
            },
        ],
    },
    {
        title: 'Cactus',
        key: '07580817-5b7e-4873-9a94-cba71f370fb6',
        icon: <PiCactusFill size={15} color={'#2C5920'}/>,
        children: [
            {
                title: 'Cactaceae',
                key: '4f3ef4d3-4451-456f-95a9-9fd37901f731',
                children: [
                    {
                        title: 'Astrophytum',
                        key: '258788fe-01ba-4ba6-b54c-14fc544aab9g',
                    }
                ]
            },
        ],
    },
    {
        title: 'Bulbs',
        key: '07580817-5b7e-4873-9a94-cba71f370fb4',
        icon: <GiBulb size={15} color={'#2C5920'}/>,
        children: [
            {
                title: 'Hyacinthaceae',
                key: '4f3ef4d3-4451-456f-95a9-9fd37901f732',
                children: [
                    {
                        title: 'Albuca',
                        key: '258788fe-01ba-4ba6-b54c-14fc544aab9f',
                    }
                ]
            },
        ],
    },
    {
        title: 'Carnivorous',
        key: '2dd9536e-f54e-45c7-91ee-0f8dbfd8b378',
        icon: <GiCarnivorousPlant size={15} color={'#2C5920'}/>,
        children: [
            {
                title: 'Nephenteceae',
                key: '3455e652-9892-4b06-b9a1-737e1a648568',
                children: [
                    {
                        title: 'Dionaea',
                        key: 'd7f2167a-4df2-44b2-b704-4e9d69059f89',
                    }
                ]
            },
        ],
    },
];

const switcherIconFunc = ( { expanded }) => expanded ? <BiSolidDownArrow/> : <BiSolidRightArrow/>

const screen = WHOLESALE;

const TriggerSidebarComponent = ( { collapsed, setCollapsed } ) => {
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
                screen !== NEW_PLANTS &&
                <Tree
                    className='filter-container'
                    showIcon
                    defaultExpandAll
                    defaultSelectedKeys={[ '07580817-5b7e-4873-9a94-cba71f370fb4' ]}
                    switcherIcon={switcherIconFunc}
                    treeData={categories}
                />
            }

        </div>
    );
};

TriggerSidebarComponent.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired
};

export default TriggerSidebarComponent;
