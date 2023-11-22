import React, { useState } from 'react';
import '../styles/SignInUpScreen.scss'
import { Button, Row, Typography } from "antd";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const { Title } = Typography;


const SignBaseScreen = () => {


    const [ isRightPanelActive, setIsRightPanelActive ] = useState( false );


    const handleSignUpClick = () => {
        setIsRightPanelActive( true );
    };

    const handleSignInClick = () => {
        setIsRightPanelActive( false );
    };

    return (
        <Row className="sign-row sign-up-form" justify='center'>
            <div className={`container-sign ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                <SignUpScreen handleSignInClick={handleSignInClick}/>
                <SignInScreen handleSignUpClick={handleSignUpClick}/>
                <div className="overlay-container-sign">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <Title level={2} className='h2'>¡Bienvenido de vuelta!</Title>
                            <p>Para mantenerte conectado por favor ingresa con tu información personal</p>
                            <Button className="ghost" id="signIn" onClick={handleSignInClick}>Ingresar</Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>¡Hola, Amigo!</h1>
                            <p>Ingresa tus datos personales y empieza un viaje con nosotros</p>
                            <Button className="ghost" id="signUp" onClick={handleSignUpClick}>Registrarse</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Row>
    );
};

export default SignBaseScreen;
