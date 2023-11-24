import React, { useState } from 'react';
import { Avatar, Col, Descriptions, Divider, message, Row, Segmented } from "antd";
import { FaSearch, FaUnlockAlt, FaUserEdit } from "react-icons/fa";
import Search from "antd/es/input/Search";
import { FaHouseFlag } from "react-icons/fa6";
import { descriptionUser } from "../utils/userUtils";
import UpdateUserTypeScreen from "./user/UpdateUserTypeScreen";
import UpdateUserPasswordScreen from "./user/UpdateUserPasswordScreen";
import UpdateUserAddressesScreen from "./user/UpdateUserAddressesScreen";
import { getUser } from "../services/UserService";
import '../styles/UpdateUserScreen.scss';
import { titleCase } from "../utils/textUtils";

const UpdateUserBaseScreen = () => {

    const [ userSegmented, setUserSegmented ] = useState( null );
    const [ userObj, setUserObj ] = useState( {} );


    const onSearch = async ( email ) => {
        const result = await getUser( email );
        if (!result.ok) {
            message.error('No se encontró un usuario por ese correo');
            return;
        }
        setUserObj( result );

        setUserSegmented( 'userEdit' );
    }

    const onChangeSegmented = ( value ) => {
        setUserSegmented( value );
    }

    const renderUserFormComponent = () => {

        if ( userSegmented === 'userEdit' ) {
            return <UpdateUserTypeScreen userObj={userObj}/>
        }
        if ( userSegmented === 'userPassword' ) {
            return <UpdateUserPasswordScreen userObj={userObj}/>
        }

        if ( userSegmented === 'userAddresses' ) {
            return <UpdateUserAddressesScreen userObj={userObj}/>
        }

    }

    return (
        <Row className='update-user-screen'>
            <Col span={24}>
                <Search
                    placeholder="Buscar Usuario por correo"
                    enterButton={<FaSearch/>}
                    size="large"
                    className='form-item'
                    onInput={e => e.target.value = titleCase( e.target.value )}
                    onSearch={onSearch}
                    style={{ width: '60%' }}
                />
            </Col>
            <Col span={24}>

            </Col>
            <Col span={24}>
                <Descriptions
                    title="Información Usuario"
                    className='descriptions'
                    bordered
                    column={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
                    items={descriptionUser( userObj || {} ) || []}
                />
            </Col>

            <Divider/>
            <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <Segmented
                    onChange={onChangeSegmented}
                    disabled={!userSegmented}
                    value={userSegmented}
                    options={[
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar style={{ backgroundColor: '#57acf8' }} icon={<FaUserEdit/>}/>
                                    <div>Convertir Usuario</div>
                                </div>
                            ),
                            value: 'userEdit',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar style={{ backgroundColor: '#f56a00' }} icon={<FaUnlockAlt/>}></Avatar>
                                    <div>Editar Contraseña</div>
                                </div>
                            ),
                            value: 'userPassword',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<FaHouseFlag/>}/>
                                    <div>Editar Direcciones</div>
                                </div>
                            ),
                            value: 'userAddresses',
                        },
                    ]}
                />
            </Col>

            <Divider/>
            <Col span={24}>
                {
                    renderUserFormComponent()
                }
            </Col>
        </Row>
    );
};

export default UpdateUserBaseScreen;
