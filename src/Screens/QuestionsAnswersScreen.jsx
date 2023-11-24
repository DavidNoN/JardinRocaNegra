import React from 'react';
import '../styles/QuestionsAnswers.scss';
import { Col, Collapse, Divider, Row } from "antd";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const expandIcon = ( { isActive } ) => {
    return isActive ? <FaMinusCircle size={25}/> : <FaPlusCircle size={25}/>;

}

const QuestionsAnswersScreen = () => {
    return (
        <Row style={{ padding: 30 }} gutter={[ 16, 16 ]}>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
                <Collapse size='large'
                          expandIconPosition="end"
                          expandIcon={expandIcon}
                          items={[ { key: '1', label: 'This is default size panel header', children: <p>{text}</p> } ]}
                />
            </Col>

            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
                <Collapse size='large'
                          expandIconPosition="end"
                          expandIcon={expandIcon}
                          items={[ { key: '1', label: 'This is default size panel header', children: <p>{text}</p> } ]}
                />
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
                <Collapse size='large'
                          expandIconPosition="end"
                          expandIcon={expandIcon}
                          items={[ { key: '1', label: 'This is default size panel header', children: <p>{text}</p> } ]}
                />
            </Col>
            <Col className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={8} xxl={8}>
                <Collapse size='large'
                          expandIconPosition="end"
                          expandIcon={expandIcon}
                          items={[ { key: '1', label: 'This is default size panel header', children: <p>{text}</p> } ]}
                />
            </Col>
            <Divider orientation="left"></Divider>

        </Row>
    );
};

export default QuestionsAnswersScreen;
