import React from 'react';
import { Button, Form, Input, message, Select, Typography } from "antd";
import PropTypes from "prop-types";
import flagColombia from "../assets/Flag_of_Colombia.svg";
import { useDispatch } from "react-redux";
import { startSignUp } from "../store/auth/authThunks";
import { doubleMessageNotification, messageNotification } from "../Components/MessageApi";
import { useNavigate } from "react-router-dom";

const { Title, Link } = Typography;
const { Option } = Select;

const SignUpScreen = ( { handleSignInClick } ) => {

    const [ formSignUp ] = Form.useForm()
    const dispatch = useDispatch();
    const [ messageApi, contextHolder ] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async ( { nameReg, emailReg, passwordReg, prefixPhone, phoneReg } ) => {
        messageNotification(messageApi, 'loading', 'loading', 'Cargando... Por favor espere', null);
        const result = await dispatch( startSignUp( nameReg, passwordReg, emailReg, `+${prefixPhone}${phoneReg}` ) );
        messageApi.destroy( 'loading' );
        if ( !result.payload?.ok || !result.payload ) {
            messageNotification(messageApi, 'error', 'error', result[ 'msg' ], 4);
            return;
        }
        await doubleMessageNotification(messageApi, 'success', 'success', 'Su registro ha sido exitoso', 4, 'success2', 'success','Ingreso Exitoso', 4)
        navigate('/new-plants', {replace: true});
    };

    const prefixSelector = (
        <Form.Item name="prefixPhone" noStyle>
            <Select>
                <Option value="57"><img src={flagColombia} width={16} height={10} alt='flag'/> +57</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className="form-container-sign sign-up-container">
            {contextHolder}
            <Form
                form={formSignUp}
                onFinish={onFinish}
                initialValues={{
                    prefixPhone: '57'
                }}
                scrollToFirstError>
                <Title level={2} className='h1'>Crear Cuenta</Title>
                <div className="social-container-sign">
                    <Link href="#" className="social"><i className="fab fa-facebook-f"></i></Link>
                    <Link href="#" className="social"><i className="fab fa-google-plus-g"></i></Link>
                    <Link href="#" className="social"><i className="fab fa-linkedin-in"></i></Link>
                </div>
                <span className='join-with-account'>or use your email for registration</span>

                <Form.Item
                    className='form-item'
                    name="nameReg"
                    hasFeedback
                    validateDebounce={400}
                    rules={[
                        {
                            min: 6,
                            required: true,
                            whitespace: true,
                        },
                        () => ( {
                            validator( _, value ) {
                                if ( /\s(?=\w{3})/.test( value ) ) {
                                    return Promise.resolve()
                                }
                                return Promise.reject( new Error( 'Por favor ingresa tu nombre completo!' ) );
                            }
                        } )
                    ]}
                >
                    <Input type="text" placeholder="Nombre"/>
                </Form.Item>
                <Form.Item
                    className='form-item'
                    name="emailReg"
                    validateDebounce={400}
                    hasFeedback
                    rules={[ {
                        type: 'email',
                        required: true,
                        message: 'Por favor ingresa un correo válido!',
                        whitespace: true
                    } ]}
                >
                    <Input type="email" placeholder="Correo"/>
                </Form.Item>
                <Form.Item
                    className='form-item'
                    name="passwordReg"
                    validateDebounce={400}
                    hasFeedback
                    rules={[ { required: true, message: 'Contraseña no válida!', whitespace: true, min: 6 } ]}
                >
                    <Input.Password type="password" placeholder="Contraseña"/>
                </Form.Item>
                <Form.Item
                    className='form-item'
                    name="repeatPasswordReg"
                    dependencies={[ 'passwordReg' ]}
                    validateDebounce={400}
                    hasFeedback
                    rules={[ { required: true, whitespace: true, min: 6 }, ( { getFieldValue } ) => ( {
                        validator( _, value ) {
                            if ( !value || getFieldValue( 'passwordReg' ) === value ) {
                                return Promise.resolve();
                            }
                            return Promise.reject( new Error( 'Las contraseñas no coinciden!' ) );
                        },
                    } ), ]}
                >
                    <Input.Password type="password" placeholder="Confirmar Contraseña"/>
                </Form.Item>
                <Form.Item
                    className='form-item'
                    name="phoneReg"
                    hasFeedback
                    validateDebounce={400}
                    rules={[
                        {
                            min: 10,
                            max: 10,
                            required: true,
                            message: 'Por favor ingresa un número válido!',
                        },
                    ]}
                >
                    <Input type='number' addonBefore={prefixSelector} placeholder="Número Celular"
                           className='phone-number'/>
                </Form.Item>
                <Link href="#" className='already-have-account' onClick={handleSignInClick}>
                    ¿Ya tienes cuenta?</Link>
                <Button htmlType='submit'>Registrarse</Button>
            </Form>
        </div>
    );
};

SignUpScreen.propTypes = {
    handleSignInClick: PropTypes.func.isRequired
};

export default SignUpScreen;
