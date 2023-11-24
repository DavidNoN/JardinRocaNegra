import React, { useState } from 'react';
import { AutoComplete, Button, DatePicker, Form, Input, message, Select, Upload } from "antd";
import {
    categoriesPlant,
    COLLECTION_CHECKBOX,
    conservationOptions,
    WHOLESALE_CHECKBOX
} from "../../constants/Constants";
import '../../styles/CreateNewPlant.scss';
import { useDispatch, useSelector } from "react-redux";
import { getAllFamilies, getAllGenres } from "../../utils/categoriesUtils";
import Dragger from "antd/es/upload/Dragger";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { buildFinalPlantObj, convertToArrays, isOnlyCollector, isOnlyWholesale } from "../../utils/plantObjUtils";
import { titleCase } from "../../utils/textUtils";
import { addUpdateCategory, postPlant } from "../../services/PlantService";
import { getCategories } from "../../store/category/categoryThunks";
import DiscountPlantComponentScreen from "./DiscountPlantComponentScreen";


const CreateNewPlantScreen = () => {

    const [ formCreateNewPlant ] = Form.useForm();

    const { categories } = useSelector( state => state.category );

    const dispatch = useDispatch();

    const families = getAllFamilies( categories ).map( ( family ) => {
        return {
            value: family.name
        }
    } );

    const genres = getAllGenres( categories ).map( ( genre ) => {
        return {
            value: genre.name
        }
    } );

    const [ familyOptions, setFamilyOptions ] = useState( families );
    const [ genreOptions, setGenreOptions ] = useState( genres );
    const [ collectorWholesaleOptions, setCollectorWholesaleOptions ] = useState( [] );
    const [ collectorSizePots, setCollectorSizePots ] = useState( [] );
    const [ wholesaleSizePots, setWholesaleSizePots ] = useState( [] );
    const [ fileList, setFileList ] = useState( [] );
    const [ isLoading, setIsLoading ] = useState( false );


    const searchFamilies = ( searchTerm ) =>
        !searchTerm ? [] : families.filter( ( { value } ) => value.toLowerCase().includes( searchTerm.toLowerCase() ) );

    const searchCategories = ( searchTerm ) =>
        !searchTerm ? [] : genres.filter( ( { value } ) => value.toLowerCase().includes( searchTerm.toLowerCase() ) );


    const onFinish = async ( values ) => {

        setIsLoading( true );
        const objWhole = collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) &&
        !collectorWholesaleOptions.includes( COLLECTION_CHECKBOX ) ?
            isOnlyWholesale( values ) : null;
        const objColl = !collectorWholesaleOptions.includes( WHOLESALE_CHECKBOX ) &&
        collectorWholesaleOptions.includes( COLLECTION_CHECKBOX ) ?
            isOnlyCollector( values ) : null;
        const priceCollector = convertToArrays( values, 'priceCollector' );
        const discountCollector = convertToArrays( values, 'discountCollector' );
        const priceWholesale = convertToArrays( values, 'priceWholesale' );
        const discountWholesale = convertToArrays( values, 'discountWholesale' );
        const minOrder = convertToArrays( values, 'minOrder' );
        const maxOrder = convertToArrays( values, 'maxOrder' );

        const finalObj = buildFinalPlantObj( objWhole || objColl || values, priceCollector, discountCollector, priceWholesale, discountWholesale, minOrder, maxOrder );

        const { ok } = await postPlant( finalObj );
        const result = await addUpdateCategory( {
            category: finalObj.category,
            family: finalObj.family,
            genre: finalObj.genre
        } );
        if ( !ok ) {
            message.error( "Ocurrio un error creando la planta" );
            setIsLoading( false )
            return;
        }
        if ( !result.ok ) {
            message.error( "Ocurrio un error actualizando la categoría" );
            setIsLoading( false )
            return;
        }
        message.success( "Planta Guardada Correctamente", 4 );
        message.success( result.msg, 4 );
        setCollectorSizePots( [] );
        setWholesaleSizePots( [] );
        setFileList( [] );
        setCollectorWholesaleOptions( null );
        // formCreateNewPlant.setFieldValue('collWhole', []);
        formCreateNewPlant.resetFields();
        setIsLoading( false );
        return await getCategories( dispatch );
    };

    const uploadPhotosProps = {
        name: 'file',
        accept: 'image/png',
        multiple: true,
        listType: "picture",
        maxCount: 4,
        beforeUpload: ( file ) => {
            const isPNG = file.type === 'image/png';
            if ( !isPNG ) {
                message.error( `${file.name} no es un archivo PNG` ).then();
            }
            return isPNG || Upload.LIST_IGNORE;
        },
        customRequest: ( { onSuccess } ) => onSuccess( 'Ok' ),
        onChange( info ) {
            const { status } = info.file;
            if ( status !== 'uploading' ) {
                setFileList( info.fileList );
            }
            if ( status === 'done' ) {
                message.success( `${info.file.name} file uploaded successfully.` ).then();
            } else if ( status === 'error' ) {
                message.error( `${info.file.name} file upload failed.` ).then();
            }
        },
        onDrop() {
            message.success( 'Archivo removido' );
        },
    };

    return (
        <Form
            layout='vertical'
            style={{ width: '100%' }}
            form={formCreateNewPlant}
            className='create-plant-form'
            onFinish={onFinish}
            scrollToFirstError>
            <h1>Crear Planta</h1>
            <Form.Item
                className='form-item'
                label="Categoría"
                name="category"
                rules={[
                    {
                        message: "Por favor ingresa una categoría",
                        required: true
                    }
                ]}
            >
                <Select
                    placeholder='Categoría'
                    options={categoriesPlant}
                />
            </Form.Item>
            <Form.Item
                className='form-item'
                label="Familia"
                name="family"
                normalize={( value ) => titleCase( value )}
                rules={[
                    {
                        message: "Por favor ingresa una familia",
                        required: true,
                        whitespace: false
                    }
                ]}
            >
                <AutoComplete
                    options={familyOptions}
                    allowClear={true}
                    onSearch={( text ) => setFamilyOptions( searchFamilies( text ) )}
                    placeholder="Familia"
                    onInput={e => e.target.value = titleCase( e.target.value )}
                />
            </Form.Item>
            <Form.Item
                className='form-item'
                label="Género"
                name="genre"
                normalize={( value ) => titleCase( value )}
                rules={[
                    {
                        message: "Por favor ingresa una género",
                        required: true,
                    }
                ]}
            >
                <AutoComplete
                    options={genreOptions}
                    allowClear={true}
                    onSearch={( text ) => setGenreOptions( searchCategories( text ) )}
                    placeholder="Género"
                    onInput={e => e.target.value = titleCase( e.target.value )}
                />
            </Form.Item>
            <Form.Item
                className='form-item'
                label="Especie"
                name="species"
                normalize={( value ) => titleCase( value )}
                rules={[
                    {
                        message: "Por favor ingresa una especie",
                        required: true,
                    }
                ]}
            >
                <Input type='text' placeholder='Especie' onInput={e => e.target.value = titleCase( e.target.value )}/>
            </Form.Item>
            <Form.Item
                className='form-item'
                label="Característica Especial"
                name="specialFeature"
                normalize={( value ) => titleCase( value )}
                rules={[
                    {
                        message: "Por favor ingresa una característica especial",
                        required: true,
                    }
                ]}
            >
                <Input type='text' placeholder='Característica Especial'
                       onInput={e => e.target.value = titleCase( e.target.value )}/>
            </Form.Item>
            <Form.Item
                className='form-item'
                label="Descripción"
                name="description"
            >
                <Input type='text' placeholder='Descripción'/>
            </Form.Item>
            <Form.Item
                className='form-item'
                label="Cantidad"
                name="quantity"
                rules={[
                    {
                        message: "Por favor ingresa una cantidad",
                        required: true,
                    }
                ]}
            >
                <Input type='number' placeholder='Cantidad'/>
            </Form.Item>
            <Form.Item
                className='form-item'
                label="Conservación"
                name="conservation"
                rules={[
                    {
                        message: "Por favor ingresa una conservación",
                        required: true
                    }
                ]}
            >
                <Select
                    mode="multiple"
                    allowClear={true}
                    placeholder='Conservación'
                    options={conservationOptions}
                />
            </Form.Item>
            <Form.Item
                className='form-item'
                label="Fecha de Publicación"
                name="publishedDate"
                rules={[
                    {
                        message: "Por favor ingresa una fecha de publicación",
                        required: true
                    }
                ]}
            >
                <DatePicker placeholder='Fecha de Publicación' format='DD-MMM-YYYY'/>
            </Form.Item>
            <DiscountPlantComponentScreen collectorWholesaleOptions={collectorWholesaleOptions}
                                          collectorSizePots={collectorSizePots}
                                          setCollectorWholesaleOptions={setCollectorWholesaleOptions}
                                          setWholesaleSizePots={setWholesaleSizePots}
                                          setCollectorSizePots={setCollectorSizePots}
                                          wholesaleSizePots={wholesaleSizePots}/>
            <Form.Item
                className='form-item-dragger'
                name="photos"
                valuePropName="fileList"
                rules={[
                    {
                        message: "Por favor sube al menos 3 fotos",
                        required: true
                    },
                    () => ( {
                        validator() {
                            if ( fileList.length >= 3 ) {
                                return Promise.resolve();
                            }
                            return Promise.reject( new Error( 'Debes subir al menos 3 fotos !' ) );
                        },
                    } )
                ]}
            >
                <Dragger {...uploadPhotosProps}>
                    <p className="ant-upload-drag-icon">
                        <HiOutlineInboxArrowDown size={40} color='blue'/>
                    </p>
                    <p className="ant-upload-text">Click o arrastra los archivos a esta área para subirlos</p>
                    <p className="ant-upload-hint">
                        Soporte para uno o muchos archivos. Estrictamente prohibido para subir data de la compañia u
                        otros archivos prohibidos.
                    </p>
                </Dragger>
            </Form.Item>
            <Button htmlType='submit' loading={isLoading}>Crear Planta</Button>
        </Form>
    );
};

export default CreateNewPlantScreen;
