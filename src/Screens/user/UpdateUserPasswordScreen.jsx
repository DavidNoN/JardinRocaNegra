import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Space } from "antd";
import { putPasswordAdmin } from "../../services/UserService";
import PropTypes from "prop-types";

const UpdateUserPasswordScreen = ( { userObj } ) => {

    const [ updateUserPassword ] = Form.useForm();
    const [ isLoading, setIsLoading ] = useState( false );

    const onFinish = async ( values ) => {
        setIsLoading( true );
        const result = await putPasswordAdmin( { newPassword: values.newPassword, uid: userObj.uid } );
        if ( !result.ok ) {
            message.error( "No se pudo actualizar la contraseña" );
            return setIsLoading( false );
        }
        message.success( "Contraseña actualizada correctamente", 4 );
        setIsLoading( false )
    }

    return (
        <Form form={updateUserPassword} onFinish={onFinish} name="validateOnly" layout="vertical" autoComplete="off"
              className='create-plant-form'>

            <Divider>Actualizar Contraseña</Divider>
            <Form.Item name="newPassword" label="Nueva Contraseña" className='form-item' rules={[ { required: true } ]}>
                <Input/>
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button htmlType="submit" loading={isLoading} style={{marginTop: 16}}>Actualizar Contraseña</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

UpdateUserPasswordScreen.propTypes = {
    userObj: PropTypes.object.isRequired
};

export default UpdateUserPasswordScreen;
