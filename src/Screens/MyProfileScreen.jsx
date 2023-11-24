import React, { useState } from 'react';
import { Button, Col, Descriptions, Divider, Form, Input, message, Row } from "antd";
import { descriptionUser } from "../utils/userUtils";
import { useSelector } from "react-redux";
import UpdateUserAddressesScreen from "./user/UpdateUserAddressesScreen";
import { putPasswordUser } from "../services/UserService";

const MyProfileScreen = () => {

    const user = useSelector( state => state.user );

    const [ updatePasswordForm ] = Form.useForm();

    const [ isLoading, setIsLoading ] = useState( false );

    const onFinish = async ( values ) => {
        setIsLoading(true)
        const result = await putPasswordUser(values.oldPassword, values.newPassword, user.id);
        if ( !result.ok ) {
            message.error( "Contraseña antigua no coincide" );
            return setIsLoading( false );
        }
        message.success( "Contraseña actualizada correctamente", 4 );
        setIsLoading( false );
        updatePasswordForm.resetFields();
    }

    return (
        <Row>
            <Col span={24}>
                <Descriptions
                    title={`Información de ${user.name}`}
                    className='descriptions'
                    bordered
                    column={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
                    items={descriptionUser( user || {} ) || []}
                />
            </Col>
            <Divider>Editar Direcciones</Divider>
            <Col span={24}>
                <UpdateUserAddressesScreen userObj={user}/>
            </Col>
            <Divider>Actualizar Contraseña</Divider>
            <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                <Form
                    form={updatePasswordForm}
                    onFinish={onFinish}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Contraseña Antigua"
                        name="oldPassword"
                        validateDebounce={400}
                        hasFeedback
                        rules={[ { required: true, message: 'Contraseña no válida!', whitespace: true, min: 6 } ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="Nueva Contraseña"
                        name="newPassword"
                        validateDebounce={400}
                        hasFeedback
                        rules={[ { required: true, message: 'Contraseña no válida!', whitespace: true, min: 6 } ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label="Repetir Contraseña"
                        name="repeatNewPassword"
                        validateDebounce={400}
                        hasFeedback
                        rules={[ { required: true, whitespace: true, min: 6 }, ( { getFieldValue } ) => ( {
                            validator( _, value ) {
                                if ( !value || getFieldValue( 'newPassword' ) === value ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject( new Error( 'Las contraseñas no coinciden!' ) );
                            },
                        } ), ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Actualizar
                        </Button>
                    </Form.Item>
                </Form>
            </Col>

        </Row>
    )
        ;
};

export default MyProfileScreen;
