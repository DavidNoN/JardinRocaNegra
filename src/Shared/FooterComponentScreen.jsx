import React from 'react';
import '../styles/FooterComponent.scss';
import { Col, Divider, Row } from "antd";
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { GrMail } from "react-icons/gr";
import logoDescription from '../assets/logo-description.png';
import { FaFacebookSquare, FaWhatsappSquare } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const FooterComponentScreen = () => {
    return (
        <Row gutter={[ 16, 24 ]} justify={"center"}>
            <Col className="gutter-row"
                 xs={24}
                 sm={24}
                 md={12}
                 lg={12}
                 xl={8}
                 xxl={8}
                 span={8}>
                <Row>
                    <div className="container">
                        <div className="Icon-find-us"><FaLocationDot size={40} color={'#D6249F'}/></div>
                        <div className="Title-find-us">Encuéntranos</div>
                        <div className="Description-find-us">Medellín, Colombia</div>
                    </div>
                </Row>
            </Col>
            <Col className="gutter-row"
                 xs={24}
                 sm={24}
                 md={12}
                 lg={12}
                 xl={8}
                 xxl={8}
                 span={8}>
                <Row>
                    <div className="container">
                        <div className="Icon-call-us"><FaPhoneFlip size={40} color={'#D6249F'}/></div>
                        <div className="Title-call-us">LLámanos</div>
                        <div className="Description-call-us">+57 311 422 1168</div>
                    </div>
                </Row>
            </Col>
            <Col className="gutter-row"
                 xs={{ span: 24, offset: 0 }}
                 sm={{ span: 24, offset: 0 }}
                 md={12}
                 lg={12}
                 xl={8}
                 xxl={8}
                 span={8}>
                <Row justify={"start"}>
                    <div className="container-write-us">
                        <div className="Icon-write-us"><GrMail size={40} color={'#D6249F'}/></div>
                        <div className="Title-write-us">Escríbenos</div>
                        <div className="Description-write-us">jardinRocaNegra@gmail.com</div>
                    </div>
                </Row>
            </Col>
            <Divider/>
            <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={8}
                xxl={8}
                span={8}>
                <Row justify={'start'}>
                    <Col className="img-logo"
                         span={16}
                         xs={{ span: 24, offset: 0 }}
                         sm={{ span: 24, offset: 0 }}
                         offset={4}>
                        <img src={logoDescription} loading='lazy' alt='logo' width={200} height={100}/>
                    </Col>
                    <Col className="about-us"
                         span={16}
                         xs={{ span: 24, offset: 0 }}
                         sm={{ span: 24, offset: 0 }}
                         offset={4}>
                        Somos una empresa dedicada a cultivar plantas ornamentales como plantas suculentas, cactus y
                        plantas carnívoras desde 2018
                    </Col>
                </Row>
            </Col>
            <Col className="gutter-row"
                 xs={24}
                 sm={24}
                 md={12}
                 lg={12}
                 xl={8}
                 xxl={8}
                 span={8}>
                <Row justify={"start"} className='follow-us-row'>
                    <div className="container-follow-us">
                        <div className="Follow-us Title-general" style={{ justifySelf: 'center' }}>Síguenos</div>
                        <a href='https://www.facebook.com/jardinrocanegra' target='_blank' rel="noopener noreferrer"
                           className="facebook" style={{ justifySelf: "center" }}>
                            <FaFacebookSquare size={30} color={'#3b5998'}/>
                        </a>
                        <a href='https://www.instagram.com/jardinrocanegra/' target='_blank' rel="noopener noreferrer"
                           className="instagram" style={{ justifySelf: "center" }}>
                            <div className="icon-container">
                                <BsInstagram className='icon' size={20}/>
                            </div>
                        </a>
                    </div>
                </Row>
            </Col>
            <Col className="gutter-row"
                 xs={24}
                 sm={24}
                 md={12}
                 lg={12}
                 xl={8}
                 xxl={8}
                 span={8}>
                <Row justify={"start"} className='follow-us-row'>
                    <div className="container-wpp">
                        <div className="Follow-us Title-general" style={{ justifySelf: 'self-start' }}>Click Aquí</div>
                        <a href='https://wa.link/m219d3' target='_blank' rel="noopener noreferrer"
                           className="facebook" style={{ justifySelf: "center" }}>
                            <FaWhatsappSquare size={60} color={'#25D366'}/>
                        </a>
                    </div>
                </Row>
            </Col>
            <Col className="copyright" span={24}>
                <div>Copyright © 2018, All Right Reserved @DavidNoN</div>
            </Col>
        </Row>
    );
};

export default FooterComponentScreen;
