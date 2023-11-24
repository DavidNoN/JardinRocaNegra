import React from 'react';
import { Checkbox, Col, Divider, Flex, Form, Input, Select } from "antd";
import {
    COLLECTION_CHECKBOX,
    optionsCollectionWholesale,
    sizePots,
    WHOLESALE_CHECKBOX
} from "../../constants/Constants";
import PropTypes from "prop-types";

const DiscountPlantComponentScreen = ( {
                                           collectorWholesaleOptions,
                                           setCollectorWholesaleOptions,
                                           collectorSizePots,
                                           setCollectorSizePots,
                                           wholesaleSizePots,
                                           setWholesaleSizePots
                                       } ) => {
    return (
        <>
            <Form.Item
                className='form-item-check'
                label="Coleccionista & Por Mayor"
                name="collWhole"
                rules={[
                    {
                        message: "Por favor elije uno de los dos",
                        required: true,
                    }
                ]}
            >
                <Checkbox.Group options={optionsCollectionWholesale}
                                onChange={( value ) => setCollectorWholesaleOptions( value )}/>
            </Form.Item>
            {collectorWholesaleOptions.includes( COLLECTION_CHECKBOX ) &&
                <Form.Item
                    className='form-item'
                    label="Tamaños Coleccionista"
                    name="sizeCollector"
                    rules={[
                        {
                            message: "Por favor elije al menos un tamaño",
                            required: true,
                        }
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Tamaños"
                        onChange={setCollectorSizePots}
                        options={sizePots}
                    />
                </Form.Item>
            }
            {collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) &&
                <Form.Item
                    className='form-item'
                    label="Tamaños Por Mayor"
                    name="sizeWholesale"
                    rules={[
                        {
                            message: "Por favor elije al menos un tamaño",
                            required: true,
                        }
                    ]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Tamaños"
                        onChange={setWholesaleSizePots}
                        options={sizePots}
                    />
                </Form.Item>}
            {collectorWholesaleOptions.includes( COLLECTION_CHECKBOX ) && collectorSizePots.length > 0 &&
                <Divider plain>Coleccionista</Divider>
            }
            {collectorWholesaleOptions.includes( COLLECTION_CHECKBOX ) && collectorSizePots.map( ( size, index ) => (
                <Flex key={size} justify='space-around' style={{ width: '55%' }}>
                    <Col span={10}>
                        <Form.Item
                            style={{ width: '100%' }}
                            label={`Precio Collecionista [${size}]`}
                            name={`priceCollector${index}`}
                            rules={[
                                {
                                    message: "Por favor Ingrese precio coleccionista",
                                    required: true,
                                }
                            ]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Precio Coleccionista" type="number"
                                   prefix={`[${size}] - COP$`}/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            style={{ width: '100%' }}
                            label={`Descuento Collecionista [${size}]`}
                            key={size}
                            name={`discountCollector${index}`}
                            rules={[
                                {
                                    message: "Por favor ingrese descuento coleccionista",
                                    required: true,
                                }
                            ]}
                        >
                            <Input placeholder="Descuento Coleccionista" type="number" prefix={`[${size}] - %`}/>
                        </Form.Item>
                    </Col>
                </Flex>
            ) )}
            {collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) && wholesaleSizePots.length > 0 &&
                <Divider plain>Por Mayor</Divider>
            }
            {collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) && wholesaleSizePots.map( ( size, index ) => (
                <Flex key={size} justify='space-around' style={{ width: '55%' }}>
                    <Col span={10}>
                        <Form.Item
                            style={{ width: '100%' }}
                            label={`Precio Por Mayor [${size}]`}
                            name={`priceWholesale${index}`}
                            rules={[
                                {
                                    message: "Por favor ingrese precio al por mayor",
                                    required: true,
                                }
                            ]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Precio Por Mayor" type="number"
                                   prefix={`[${size}] - COP$`}/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            style={{ width: '100%' }}
                            label={`Descuento Por Mayor [${size}]`}
                            key={size}
                            name={`discountWholesale${index}`}
                            rules={[
                                {

                                    message: "Por favor ingresa descuento al por mayor",
                                    required: true,
                                }
                            ]}
                        >
                            <Input placeholder="Descuento Por Mayor" type="number" prefix={`[${size}] - %`}/>
                        </Form.Item>
                    </Col>
                </Flex>
            ) )}
            {collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) && wholesaleSizePots.length > 0 &&
                <Divider plain>Orden Máxima y Mínima</Divider>
            }
            {collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) && wholesaleSizePots.map( ( size, index ) => (
                <Flex key={size} justify='space-around' style={{ width: '55%' }}>
                    <Col span={10}>
                        <Form.Item
                            style={{ width: '100%' }}
                            label={`MOQ [${size}]`}
                            name={`minOrder${index}`}
                            rules={[
                                {
                                    message: "Por favor ingresa orden mínima",
                                    required: true,
                                }
                            ]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Orden Mínima" type="number"/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            style={{ width: '100%' }}
                            label={`MOXQ [${size}]`}
                            key={size}
                            name={`maxOrder${index}`}
                            rules={[
                                {
                                    required: true,
                                    message: "Por favor ingresa orden máxima",
                                },
                                ( { getFieldValue } ) => ( {
                                    validator( _, value ) {
                                        if ( value >= getFieldValue( `minOrder${index}` ) ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject( new Error( 'El MOXQ debe ser mayor al MOQ !' ) );
                                    },
                                } )
                            ]}
                        >
                            <Input placeholder="Orden Máxima" type="number"/>
                        </Form.Item>
                    </Col>
                </Flex>
            ) )}
        </>
    );
};

DiscountPlantComponentScreen.propTypes = {
    collectorWholesaleOptions: PropTypes.array.isRequired,
    setCollectorWholesaleOptions: PropTypes.func.isRequired,
    collectorSizePots: PropTypes.array.isRequired,
    setCollectorSizePots: PropTypes.func.isRequired,
    wholesaleSizePots: PropTypes.array.isRequired,
    setWholesaleSizePots: PropTypes.func.isRequired
};

export default DiscountPlantComponentScreen;
