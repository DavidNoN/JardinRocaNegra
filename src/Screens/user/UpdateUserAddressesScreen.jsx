import React, { useState } from 'react';
import { Card, Input, message, Popconfirm, Row, Spin } from "antd";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";
import '../../styles/UpdateUserScreen.scss';
import { titleCase } from "../../utils/textUtils";
import { putUser } from "../../services/UserService";

const UpdateUserAddressesScreen = ( { userObj } ) => {

    const [ addresses, setAddresses ] = useState( userObj.addresses );

    const [ state, setState ] = useState( '' );
    const [ city, setCity ] = useState( '' );
    const [ town, setTown ] = useState( '' );
    const [ address, setAddress ] = useState( '' );
    const [ additionalInfo, setAdditionalInfo ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );

    const filterAddress = async ( addressId ) => {
        const filteredAddresses = addresses.filter( address => address._id !== addressId );
        const finalObj = { ...userObj, addresses: filteredAddresses };
        const result = await putUser( userObj.uid, finalObj );
        if ( !result.ok ) {
            message.error( "Ocurrió un error eliminando la dirección" );
            return setIsLoading( false );
        }
        message.success( "Dirección eliminada correctamente", 4 );
        setIsLoading( false );
        setAddresses( filteredAddresses );
    }

    const clearForm = () => {
        setState('');
        setCity('');
        setTown('');
        setAddress('');
        setAdditionalInfo('');
    }

    const addAddress = async () => {
        setIsLoading( true );
        const finalObj = { ...userObj, addresses: [ ...addresses, { state, city, town, address, additionalInfo } ] };
        const result = await putUser( userObj.uid, finalObj );
        if ( !result.ok ) {
            message.error( "Ocurrió un error agregando la dirección" );
            return clearForm();
        }
        message.success( "Dirección agregada correctamente", 4 );
        setIsLoading( false );
        setAddresses( [ ...addresses, { state, city, town, address, setAdditionalInfo } ] );
        return clearForm();
    }
    const cancel = () => null;

    return (
        <Row className='update-user-screen' justify='space-evenly'>
            {
                addresses.map( ( address, index ) => (
                    <Card key={address.address} title={`Dirección N° ${index + 1}`}
                          extra={
                              isLoading ? <Spin/> :
                                  <Popconfirm
                                      title="Borrar Dirección"
                                      description="Estas seguro que quieres borrar esta dirección?"
                                      onConfirm={() => filterAddress( address._id )}
                                      onCancel={cancel}
                                      okText="Sí"
                                      cancelText="No"
                                  >
                                      <FaTrash size={16} color='#D6249F' style={{ cursor: "pointer" }}/>
                                  </Popconfirm>
                          }
                          style={{ width: 300 }}>
                        <p><b>Depto:</b> {address.state}</p>
                        <p><b>Ciudad:</b> {address.city}</p>
                        <p><b>Barrio:</b> {address.town}</p>
                        <p><b>Dirección:</b> {address.address}</p>
                        <p><b>Extra:</b> {address.additionalInfo}</p>
                    </Card>
                ) )
            }
            <Card title='Dirección Nueva'
                  extra={
                      isLoading ? <Spin/> :
                          <Popconfirm
                              title="Agregar Dirección"
                              description="Estas seguro que la dirección escrita es correcta?"
                              onConfirm={addAddress}
                              onCancel={cancel}
                              okText="Sí"
                              cancelText="No"
                          >
                              <IoAddCircleSharp size={24} color='#D6249F' style={{ cursor: "pointer" }}/>
                          </Popconfirm>
                  }
                  style={{ width: 300 }}>
                <p className='address-form'><b> Depto:</b> <Input
                    onInput={e => e.target.value = titleCase( e.target.value )}
                    onChange={( { target } ) => setState( target.value )}/></p>
                <p className='address-form'><b>Ciudad:</b> <Input
                    onInput={e => e.target.value = titleCase( e.target.value )}
                    onChange={( { target } ) => setCity( target.value )}/></p>
                <p className='address-form'><b>Barrio:</b> <Input
                    onInput={e => e.target.value = titleCase( e.target.value )}
                    onChange={( { target } ) => setTown( target.value )}/></p>
                <p className='address-form'><b>Dirección:</b> <Input
                    onInput={e => e.target.value = titleCase( e.target.value )}
                    onChange={( { target } ) => setAddress( target.value )}/></p>
                <p className='address-form'><b>Extra:</b> <Input
                    onInput={e => e.target.value = titleCase( e.target.value )}
                    onChange={( { target } ) => setAdditionalInfo( target.value )}/></p>
            </Card>
        </Row>
    );
};

UpdateUserAddressesScreen.propTypes = {
    userObj: PropTypes.object.isRequired
};

export default UpdateUserAddressesScreen;
