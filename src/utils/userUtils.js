import { Alert, Card, Row } from "antd";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiBuildingStorefront } from "react-icons/hi2";
import { MdEmail, MdOutlinePhoneAndroid  } from "react-icons/md";
import { TbUserPentagon } from "react-icons/tb";
import { FaMapLocationDot } from "react-icons/fa6";
export const descriptionUser = ( userObj ) => {
    return Object.keys(userObj).length > 0 ?
        [
            {
                label:  <span style={{fontSize: 14}}><FaUserAlt size={20} color='#D6249F'/>&nbsp;&nbsp;&nbsp;Nombre Completo</span>,
                children: <b style={{fontSize: 14}}>{userObj.name}</b>,

            },
            {
                label: <span style={{fontSize: 14}}><HiBuildingStorefront size={20} color='#D6249F'/>&nbsp;&nbsp;&nbsp;Compañía</span>,
                children: <b style={{fontSize: 14}}>{userObj.company}</b>
            },
            {
                label: <span style={{fontSize: 14}}><MdEmail size={20} color='#D6249F'/>&nbsp;&nbsp;&nbsp;Correo</span>,
                children: <b style={{fontSize: 14}}>{userObj.email}</b>
            },
            {
                label: <span style={{fontSize: 14}}><MdOutlinePhoneAndroid size={20} color='#D6249F'/>&nbsp;&nbsp;&nbsp;Teléfono</span>,
                children: <b style={{fontSize: 14}}>{userObj.phone}</b>,
            },
            {
                label: <span style={{fontSize: 14}}><TbUserPentagon size={20} color='#D6249F'/>&nbsp;&nbsp;&nbsp;Es Usuario Por Mayor</span>,
                children: userObj.isWholesaleUser ?
                    <Alert message="Usuario Mayorista" type="success" showIcon/> :
                    <Alert message="El usuario NO es mayorista" type="warning" showIcon/>,
                span: 2
            },
            {
                label: <span style={{fontSize: 14}}><FaMapLocationDot size={20} color='#D6249F'/>&nbsp;&nbsp;&nbsp;Direcciones</span>,
                children: (
                    <Row>
                        {userObj.addresses?.length === 0  ?
                            <Alert message="El usuario NO tiene direcciones registradas" type="info" showIcon/> :
                            userObj.addresses?.map( address => (
                                <Card key={address.address} style={{ width: 250, marginRight: 16 }}>
                                    <p><b>Depto:</b> {address.state}</p>
                                    <p><b>Ciudad:</b> {address.city}</p>
                                    <p><b>Barrio:</b> {address.town}</p>
                                    <p><b>Dirección:</b> {address.address}</p>
                                    <p><b>Extra:</b> {address.additionalInfo}</p>
                                </Card>
                            ) )}
                    </Row>
                ),
            },
        ] :
        [
            {
                label: 'Nombre Completo',
                children: '',

            },
            {
                label: 'Compañía',
                children: '',
            },
            {
                label: 'Correo',
                children: '',
            },
            {
                label: 'Teléfono',
                children: '',
            },
            {
                label: 'Es Usuario Por Mayor',
                children: '',
                span: 2
            },
            {
                label: 'Direcciones',
                children: (
                    <Row>
                        <Alert message="El usuario NO tiene direcciones registradas" type="info" showIcon/>
                    </Row>
                ),
            },
        ];
}

export const buildFinalUserObj = ( userObj, values, addresses ) => {
    return {
        name: userObj.name,
        email: userObj.email,
        phone: userObj.phone,
        isWholesaleUser: values.isWholesaleUser,
        company: values.company,
        addresses,
    }
}
