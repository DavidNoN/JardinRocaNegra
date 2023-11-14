import React from 'react';
import { Button, Form, Input, message, Typography } from "antd";
import PropTypes from "prop-types";
import { startSignIn } from "../store/auth/authThunks";
import { useDispatch } from "react-redux";
import { messageNotification } from "../Components/MessageApi";
import { useNavigate } from "react-router-dom";

const { Title, Link } = Typography;

const SignInScreen = ( { handleSignUpClick } ) => {
    const [ formSignIn ] = Form.useForm()
    const dispatch = useDispatch();
    const [ messageApi, contextHolder ] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async ( { emailLog, passwordLog } ) => {
        messageNotification(messageApi, 'loading', 'loading', 'Cargando... Por favor espere', null);
        const result = await dispatch( startSignIn( emailLog, passwordLog ) );
        messageApi.destroy('loading');
        if (!result.payload.ok) {
            messageNotification(messageApi, 'error', 'error', result.payload['msg'], 4);
            return;
        }
        messageNotification(messageApi, 'success', 'success', 'Ingreso Exitoso', 4);
        navigate('/new-plants', {replace: true});
    };

    return (
        <div className="form-container-sign sign-in-container">
            {contextHolder}
            <Form form={formSignIn}
                  onFinish={onFinish}
                  scrollToFirstError
            >
                <Title level={2} className='h1'>Ingresar</Title>
                <div className="social-container-sign">
                    <Link href="#" className="social"><i className="fab fa-facebook-f"></i></Link>
                    <Link href="#" className="social"><i className="fab fa-google-plus-g"></i></Link>
                    <Link href="#" className="social"><i className="fab fa-linkedin-in"></i></Link>
                </div>
                <span className='join-with-account'>Ingresa con tu cuenta</span>
                <Form.Item
                    className='form-item'
                    name="emailLog"
                    validateDebounce={400}
                    hasFeedback
                    rules={[ {
                        type: 'email',
                        required: true,
                        message: 'Por favor escribe un correo valido!',
                        whitespace: true
                    } ]}
                >
                    <Input type="email" placeholder="Correo"/>
                </Form.Item>
                <Form.Item
                    className='form-item'
                    name="passwordLog"
                    validateDebounce={400}
                    hasFeedback
                    rules={[ { required: true, message: 'Contraseña no válida!', whitespace: true, min: 6 } ]}
                >
                    <Input.Password type="password" placeholder="Contraseña"/>
                </Form.Item>
                <Link href="#">¿Olvidaste la contraseña?</Link>
                <Link href="#" className='not-account-already' onClick={handleSignUpClick}>¿No tienes
                    cuenta?</Link>
                <Button htmlType='submit'>Ingresar</Button>
            </Form>
        </div>
    );
};

SignInScreen.propTypes = {
    handleSignUpClick: PropTypes.func.isRequired
};

export default SignInScreen;
