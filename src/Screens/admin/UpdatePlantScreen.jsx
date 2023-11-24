import React, { useState } from 'react';
import { AutoComplete, Button, DatePicker, Form, Input, message, Select } from "antd";
import { categoriesPlant, conservationOptions } from "../../constants/Constants";
import { titleCase } from "../../utils/textUtils";
import { getAllFamilies, getAllGenres } from "../../utils/categoriesUtils";
import { useDispatch, useSelector } from "react-redux";
import Search from "antd/es/input/Search";
import { addUpdateCategory, findPlantById, putPlant } from "../../services/PlantService";
import dayjs from 'dayjs';
import { buildFinalPlantObjForUpdate } from "../../utils/plantObjUtils";
import { getCategories } from "../../store/category/categoryThunks";


const UpdatePlantScreen = () => {

    const [ updatePlant ] = Form.useForm();
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
    const [ plant, setPlant ] = useState( {} );
    const [ familyOptions, setFamilyOptions ] = useState( families );
    const [ genreOptions, setGenreOptions ] = useState( genres );
    const [ isLoading, setIsLoading ] = useState( false );

    const dateFormat = 'YYYY-MM-DD';
    const dateFormatDatePicker = 'DD-MMM-YYYY';
    const searchFamilies = ( searchTerm ) =>
        !searchTerm ? [] : families.filter( ( { value } ) => value.toLowerCase().includes( searchTerm.toLowerCase() ) );

    const searchCategories = ( searchTerm ) =>
        !searchTerm ? [] : genres.filter( ( { value } ) => value.toLowerCase().includes( searchTerm.toLowerCase() ) );

    const onFinish = async ( values ) => {
        setIsLoading( true );
        const finalObj = buildFinalPlantObjForUpdate( plant, values );
        const { ok } = await putPlant( finalObj, plant[ '_id' ] );
        const resultCat = await addUpdateCategory( {
            category: finalObj.category,
            family: finalObj.family,
            genre: finalObj.genre
        } );
        if ( !ok ) {
            message.error( "Ocurrio un error creando la planta" );
            setIsLoading( false )
            return;
        }
        if ( !resultCat.ok ) {
            message.error( "Ocurrio un error actualizando la categoría" );
            setIsLoading( false )
            return;
        }
        message.success( "Planta Guardada Correctamente", 4 );
        message.success( resultCat.msg, 4 );
        updatePlant.resetFields();
        setIsLoading( false );
        return await getCategories( dispatch );
    }

    const getPlantToUpdate = async ( plantId ) => {
        const result = await findPlantById( plantId );
        updatePlant.setFieldsValue( {
            ...result.plant,
            publishedDate: dayjs( result.plant.publishedDate, dateFormat )
        } );
        setPlant( result.plant );
    }
    return (

        <Form
            layout='vertical'
            style={{ width: '100%' }}
            form={updatePlant}
            className='create-plant-form'
            onFinish={onFinish}
            scrollToFirstError>
            <h1>Actualizar Planta</h1>
            <Search placeholder="Identificación Planta" onSearch={getPlantToUpdate}
                    className='form-item'
                    enterButton="Buscar Planta" size="large"/>
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
                <Input type='text' placeholder='Especie'
                       onInput={e => e.target.value = titleCase( e.target.value )}/>
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
                <DatePicker placeholder='Fecha de Publicación' format={dateFormatDatePicker}/>
            </Form.Item>
            <Button htmlType='submit' loading={isLoading}>Actualizar Planta</Button>
        </Form>
    );
};

export default UpdatePlantScreen;
