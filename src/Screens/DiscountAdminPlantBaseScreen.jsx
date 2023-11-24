import React, { useState } from 'react';
import { Avatar, Button, Col, Divider, Form, message, Row, Segmented } from "antd";
import DiscountPlantComponentScreen from "./admin/DiscountPlantComponentScreen";
import { FaUnlockAlt } from "react-icons/fa";
import { FaHouseFlag } from "react-icons/fa6";
import { findPlantById, putPlant } from "../services/PlantService";
import Search from "antd/es/input/Search";
import { COLLECTION_CHECKBOX, WHOLESALE_CHECKBOX } from "../constants/Constants";
import { buildFinalPlantObj, convertToArrays, isOnlyCollector, isOnlyWholesale } from "../utils/plantObjUtils";
import { RiPlantFill } from "react-icons/ri";

const DiscountAdminPlantBaseScreen = () => {

    const [ discountPlantForm ] = Form.useForm();

    const [ isLoading, setIsLoading ] = useState( false );
    const [ collectorSizePots, setCollectorSizePots ] = useState( [] );
    const [ wholesaleSizePots, setWholesaleSizePots ] = useState( [] );
    const [ collectorWholesaleOptions, setCollectorWholesaleOptions ] = useState( [] );
    const [ userSegmented, setUserSegmented ] = useState( null );
    const [ plant, setPlant ] = useState( {} );

    const onFinish = async ( values ) => {
        setIsLoading( true );
        const completeObject = {
            ...plant,
            ...values
        };
        const objWhole = collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) &&
        !collectorWholesaleOptions.includes( COLLECTION_CHECKBOX ) ?
            isOnlyWholesale( completeObject ) : null;
        const objColl = !collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) &&
        collectorWholesaleOptions.includes( COLLECTION_CHECKBOX ) ?
            isOnlyCollector( completeObject ) : null;
        const priceCollector = convertToArrays( values, 'priceCollector' );
        const discountCollector = convertToArrays( values, 'discountCollector' );
        const priceWholesale = convertToArrays( values, 'priceWholesale' );
        const discountWholesale = convertToArrays( values, 'discountWholesale' );
        const minOrder = convertToArrays( values, 'minOrder' );
        const maxOrder = convertToArrays( values, 'maxOrder' );
        const finalObj = {
                ...plant, ...buildFinalPlantObj( objWhole || objColl || completeObject, priceCollector,
                    discountCollector, priceWholesale, discountWholesale, minOrder, maxOrder
                )
            }
        ;
        console.log( finalObj );
        const { ok } = await putPlant( finalObj, plant[ '_id' ] );
        if ( !ok ) {
            message.error( "Ocurrio un error actualizando la planta" );
            setIsLoading( false )
            return;
        }
        message.success( "Planta Actualizada Correctamente", 4 );
        discountPlantForm.resetFields();
        setCollectorSizePots( [] );
        setWholesaleSizePots( [] );
        setCollectorWholesaleOptions( [] );
        return setIsLoading( false );
    }

    const onChangeSegmented = ( value ) => {
        setUserSegmented( value );
    }

    const getPlantToUpdate = async ( plantId ) => {
        const result = await findPlantById( plantId );
        discountPlantForm.setFieldsValue( {
            ...result.plant
        } );
        setPlant( result.plant );
        setUserSegmented( plant );
        onChangeSegmented( 'discountEditPlant' );
        setCollectorWholesaleOptions( checkIfPlantIsCollectorWholesale( result.plant.priceCollector[ 0 ], result.plant.priceWholesale[ 0 ] ) );
        setCollectorSizePots( result.plant.sizeCollector );
        setWholesaleSizePots( result.plant.sizeWholesale );
        loopPlantPricesAndDiscounts(
            result.plant.priceCollector,
            result.plant.priceWholesale,
            result.plant.discountCollector,
            result.plant.discountWholesale,
            result.plant.minOrder,
            result.plant.maxOrder );
    }

    const checkIfPlantIsCollectorWholesale = ( priceCollector, priceWholesale ) => {
        let arr;
        if ( priceCollector > 0 ) {
            setCollectorWholesaleOptions( [ COLLECTION_CHECKBOX ] );
            arr = [ COLLECTION_CHECKBOX ];
        }

        if ( priceWholesale > 0 ) {
            setCollectorWholesaleOptions( prevState => [ ...prevState, WHOLESALE_CHECKBOX ] );
            arr = [ ...arr, WHOLESALE_CHECKBOX ];
        }
        return arr;
    }

    const loopPlantPricesAndDiscounts = ( priceCollector, priceWholesale, discountCollector, discountWholesale, minOrder, maxOrder ) => {
        priceCollector.forEach( ( price, index ) => {
            if ( price ) {
                discountPlantForm.setFieldValue( `priceCollector${index}`, price ?? 0 );
            }
        } );
        priceWholesale.forEach( ( price, index ) => {
            if ( price ) {
                discountPlantForm.setFieldValue( `priceWholesale${index}`, price ?? 0 );
            }
        } );
        discountCollector.forEach( ( discount, index ) => {
            if ( discount ) {
                discountPlantForm.setFieldValue( `discountCollector${index}`, discount * 100 || 0.0 );
            }
        } );
        discountWholesale.forEach( ( discount, index ) => {
            if ( discount ) {
                discountPlantForm.setFieldValue( `discountWholesale${index}`, discount * 100 || 0.0 );
            }
        } );
        minOrder.forEach( ( minOrder, index ) => {
            if ( minOrder ) {
                discountPlantForm.setFieldValue( `minOrder${index}`, minOrder );
            }
        } );
        maxOrder.forEach( ( maxOrder, index ) => {
            if ( maxOrder ) {
                discountPlantForm.setFieldValue( `maxOrder${index}`, maxOrder );
            }
        } );
    }

    const renderUserFormComponent = () => {

        if ( userSegmented === 'discountEditPlant' ) {
            return <Form
                layout='vertical'
                style={{ width: '100%' }}
                form={discountPlantForm}
                className='create-plant-form'
                onFinish={onFinish}
                scrollToFirstError>
                <h1>Aplicar Descuento a las Plantas</h1>
                <DiscountPlantComponentScreen collectorWholesaleOptions={collectorWholesaleOptions}
                                              collectorSizePots={collectorSizePots}
                                              setCollectorWholesaleOptions={setCollectorWholesaleOptions}
                                              setWholesaleSizePots={setWholesaleSizePots}
                                              setCollectorSizePots={setCollectorSizePots}
                                              wholesaleSizePots={wholesaleSizePots}
                />
                <Button htmlType='submit' loading={isLoading}>Aplicar Descuento</Button>
            </Form>
        }
        if ( userSegmented === 'discountToAllCollectorPlants' ) {
            return <h1>Hola Mundo</h1>
        }

        if ( userSegmented === 'discountToAllWholesalePlants' ) {
            return <div>Hola Mundo 2</div>
        }
        if ( userSegmented === 'discountToAllCarnivorousPlants' ) {
            return <div>Hola Mundo 2</div>
        }
        if ( userSegmented === 'removeAllDiscounts' ) {
            return <div>Hola Mundo 3</div>
        }

    }

    return (
        <Row>
            <Divider>Buscar Planta</Divider>
            <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                <Search placeholder="Identificación Planta" onSearch={getPlantToUpdate}
                        className='form-item'
                        style={{ width: '40%' }}
                        enterButton="Buscar Planta" size="large"/>
            </Col>
            <Divider/>
            <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                <Segmented
                    onChange={onChangeSegmented}
                    disabled={!userSegmented}
                    value={userSegmented}
                    options={[
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar style={{ backgroundColor: '#57acf8' }} icon={<RiPlantFill/>}/>
                                    <div>Descuento Planta</div>
                                </div>
                            ),
                            value: 'discountEditPlant',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar style={{ backgroundColor: '#f56a00' }} icon={<FaUnlockAlt/>}></Avatar>
                                    <div>Descuento Coleccionistas</div>
                                </div>
                            ),
                            value: 'discountToAllCollectorPlants',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<FaHouseFlag/>}/>
                                    <div>Descuento Mayorista</div>
                                </div>
                            ),
                            value: 'discountToAllWholesalePlants',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar style={{ backgroundColor: '#d93f3c' }} icon={<FaHouseFlag/>}/>
                                    <div>Descuento Carnivoras</div>
                                </div>
                            ),
                            value: 'discountToAllCarnivorousPlants',
                        },
                        {
                            label: (
                                <div style={{ padding: 4 }}>
                                    <Avatar style={{ backgroundColor: '#7943a8' }} icon={<FaHouseFlag/>}/>
                                    <div>Remover Descuentos</div>
                                </div>
                            ),
                            value: 'removeAllDiscounts',
                        },
                    ]}
                />
            </Col>
            <Col span={24}>
                {renderUserFormComponent()}
            </Col>
        </Row>
    );
};

export default DiscountAdminPlantBaseScreen;
