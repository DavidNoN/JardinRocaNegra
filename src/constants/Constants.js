import React from 'react';
import { FaCirclePlus, FaCloudSun } from "react-icons/fa6";
import { FaRegEdit, FaSun, FaUserEdit } from "react-icons/fa";
import { RiPlantFill } from "react-icons/ri";
import { MdDiscount } from "react-icons/md";
import CreateNewPlantScreen from "../Screens/admin/CreateNewPlantScreen";
import { IoCloudyNight } from "react-icons/io5";
import { TbPlant2 } from "react-icons/tb";
import { PiCactusFill } from "react-icons/pi";
import { GiBulb, GiCarnivorousPlant } from "react-icons/gi";
import UpdatePlantScreen from "../Screens/admin/UpdatePlantScreen";
import UpdateUserBaseScreen from "../Screens/UpdateUserBaseScreen";
import DiscountAdminPlantBaseScreen from "../Screens/DiscountAdminPlantBaseScreen";

export const SOLD_OUT = 'SOLD-OUT';
export const NEW = 'NEW';

export const AGOTADO = 'AGOTADO';
export const NUEVO = 'NUEVO';
export const NEW_PLANTS = 'new-plants';
export const COLLECTOR = 'collection-plants';
export const CARNIVOROUS = 'carnivorous-plants';
export const WHOLESALE = 'wholesale-plants';
export const COLLECTION_CHECKBOX = 'Collection';
export const WHOLESALE_CHECKBOX = 'Wholesale';

export const fallbackImage = 'data:image/png;base64,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'

export const itemsAdminTabs = [
    {
        label: <span> <FaCirclePlus size={15}/> &nbsp; <span> Crear Planta </span></span>,
        key: '1',
        children: <CreateNewPlantScreen/>,
    },
    {
        label: <span> <FaRegEdit size={15}/> &nbsp; <span> Editar Planta </span></span>,
        key: '2',
        children: <UpdatePlantScreen/>,
    },
    {
        label: <span> <RiPlantFill size={15}/> &nbsp; <span> Descuento Planta </span></span>,
        key: '3',
        children: <DiscountAdminPlantBaseScreen/>,
    },
    {
        label: <span> <MdDiscount size={15}/> &nbsp; <span> Descuento General </span></span>,
        key: '4',
        children: `Content of card tab`,
    },
    {
        label: <span> <FaUserEdit size={15}/> &nbsp; <span> Actualizar Usuario </span></span>,
        key: '5',
        children: <UpdateUserBaseScreen/>,
    }
];

export const categoriesPlant = [
    {
        label: <span><TbPlant2 size={20} color={'#90486D'}/>&nbsp;Suculenta</span>,
        value: 'Succulents'
    },
    {
        label: <span><PiCactusFill size={20} color={'#2C5920'}/>&nbsp;Cactus</span>,
        value: 'Cactus'
    },
    {
        label: <span><GiBulb size={20} color={'#2C5920'}/>&nbsp;Bulbo</span>,
        value: 'Bulbs'
    },
    {
        label: <span><GiCarnivorousPlant size={20} color={'#2C5920'}/>Carnívora</span>,
        value: 'Carnivorous'
    },
];

export const conservationOptions = [
    {
        label: <span>
                 <svg width="0" height="0">
                    <linearGradient id="blue-gradient" x1="50%" y1="30%" x2="65%" y2="50%">
                        <stop stopColor="#ffeb00" offset="73%"/>
                        <stop stopColor="#c1e7ff" offset="75%"/>
                    </linearGradient>
                </svg>
            <FaCloudSun size={20} style={{ stroke: 'url(#blue-gradient)', fill: 'url(#blue-gradient)' }}/> Semi-sombra
        </span>,
        value: 'light-shade'
    },
    {
        label: <span> <FaSun size={20} color={'#ffeb00'}/> Sol</span>,
        value: 'sun'
    },
    {
        label: <span><IoCloudyNight size={20} color={'#99d7ff'}/> Sombra</span>,
        value: 'shade'
    }
];

export const sizePots = [
    {
        label: 'p5',
        value: 'p5'
    },
    {
        label: 'p7',
        value: 'p7'
    },
    {
        label: 'p8',
        value: 'p8'
    },
    {
        label: 'p10',
        value: 'p10'
    },
    {
        label: 'p12',
        value: 'p12'
    },
    {
        label: 'p14',
        value: 'p14'
    },
    {
        label: 'p17',
        value: 'p17'
    },
    {
        label: 'p18',
        value: 'p18'
    },
    {
        label: 'p20',
        value: 'p20'
    }
]

export const optionsCollectionWholesale = [
    { label: 'Colección', value: 'Collection' },
    { label: 'Por Mayor', value: 'Wholesale' },
];
