import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Space, Switch } from "antd";
import PropTypes from "prop-types";
import { buildFinalUserObj } from "../../utils/userUtils";
import { putUser } from "../../services/UserService";

const UpdateUserTypeScreen = ( { userObj } ) => {

    const [ updateUserTypeForm ] = Form.useForm();

    const [ wholeSaleUser, setWholeSaleUser ] = useState( userObj.isWholesaleUser )
    const [ isLoading, setIsLoading ] = useState( false );

    const onFinish = async ( values ) => {
        setIsLoading(true);
        const finalObj = buildFinalUserObj( userObj, values, userObj.addresses );
        const result = await putUser( userObj.uid, finalObj );
        if (!result.ok) {
            message.error("Ocurrió un error actualizando las plantas");
            return setIsLoading( false );
        }
        message.success("Usuario actualizado correctamente", 4);
        setIsLoading(false);
    }


    return (
        <Form form={updateUserTypeForm} name="validateOnly" layout="vertical" autoComplete="off"
              onFinish={onFinish}
              className='create-plant-form'>
            <Divider>Actualizar Tipo de Usuario</Divider>
            <Form.Item name="isWholesaleUser" label="Es usuario Por Mayor" className='form-item'>
                <Switch defaultChecked checked={wholeSaleUser}
                        onChange={( value ) => setWholeSaleUser( value )}/>
            </Form.Item>
            {wholeSaleUser &&
                <Form.Item name="company" label="Compañia" className='form-item'>
                    <Input/>
                </Form.Item>
            }
            <Form.Item>
                <Space>
                    <Button htmlType="submit" loading={isLoading} style={{marginTop: 16}}>Actualizar Usuario</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

UpdateUserTypeScreen.propTypes = {
    userObj: PropTypes.object.isRequired
};

export default UpdateUserTypeScreen;
