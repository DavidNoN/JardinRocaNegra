import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Tree } from "antd";
import PropTypes from "prop-types";
import Search from "antd/es/input/Search";
import { searchForAPlant } from "../services/PlantService";
import { useDispatch, useSelector } from "react-redux";
import { CARNIVOROUS, COLLECTOR, WHOLESALE } from "../constants/Constants";
import { getCarnivorousPlants, getCollectionPlants, getWholesalePlants } from "../store/plant/plantSlice";
import { buildFilterTreeObj, createDefaultExpanded, createDefaultSelected } from "../utils/filterUtils";
import { getPlantsThunk } from "../store/plant/plantThunks";
import { getUriNameByPathname } from "../utils/routerUtils";
import '../styles/FilterDrawer.scss';
import { MdFilterAltOff } from "react-icons/md";
import { titleCase } from "../utils/textUtils";

const FilterDrawer = ( { showDrawer, setShowDrawer, screenName, filterObj, setFilterObj } ) => {

    const { categories } = useSelector( state => state.category );

    const dispatch = useDispatch();

    const [ open, setOpen ] = useState( false );
    const [ searchTerm, setSearchTerm ] = useState( false );

    useEffect( () => {
        setOpen( showDrawer );
    }, [ showDrawer ] );

    const onClose = () => {
        setOpen( false );
        setShowDrawer( false );
    };

    const onSearch = async ( value ) => {
        setOpen( false );
        setShowDrawer( false );
        setSearchTerm( value );
        setFilterObj( { searchTerm: value } );
        const result = await searchForAPlant( value, null, screenName );
        dispatchValue( result );
    }

    const onSearchTree = async ( value ) => {
        setOpen( false );
        setShowDrawer( false );
        const valueSplit = value.toString().split( ' ' )
        let createFilterObj = {};
        let result;
        if ( valueSplit.length === 1 ) {
            createFilterObj = { category: valueSplit[ 0 ].toString() };
            await setFilterObj( createFilterObj );
            const copyCreateFilterObj = { ...createFilterObj };
            result = await searchForAPlant( null, copyCreateFilterObj, screenName );
        }
        if ( valueSplit.length === 2 ) {
            createFilterObj = { category: valueSplit[ 0 ].toString(), family: valueSplit[ 1 ].toString() };
            await setFilterObj( createFilterObj );
            const copyCreateFilterObj = { ...createFilterObj };
            result = await searchForAPlant( null, copyCreateFilterObj, screenName );
        }
        if ( valueSplit.length === 3 ) {
            createFilterObj = {
                category: valueSplit[ 0 ].toString(),
                family: valueSplit[ 1 ].toString(),
                genre: valueSplit[ 2 ].toString()
            };
            await setFilterObj( createFilterObj );
            const copyCreateFilterObj = { ...createFilterObj };
            result = await searchForAPlant( null, copyCreateFilterObj, screenName );
        }
        dispatchValue( result );
    }

    const dispatchValue = ( result ) => {
        let dispatchValue;
        if ( screenName === WHOLESALE ) {
            dispatchValue = getWholesalePlants( result );
        }
        if ( screenName === COLLECTOR ) {
            dispatchValue = getCollectionPlants( result );
        }
        if ( screenName === CARNIVOROUS ) {
            dispatchValue = getCarnivorousPlants( result );
        }
        return dispatch( dispatchValue );
    }

    const removeFilters = async () => {
        setOpen( false );
        setShowDrawer( false );
        setFilterObj( {} );
        if ( screenName === WHOLESALE ) {
            await getPlantsThunk( dispatch, getUriNameByPathname( `/${WHOLESALE}` ) );
        }
        if ( screenName === COLLECTOR ) {
            await getPlantsThunk( dispatch, getUriNameByPathname( `/${COLLECTOR}` ) );
        }
        if ( screenName === CARNIVOROUS ) {
            await getPlantsThunk( dispatch, getUriNameByPathname( `/${CARNIVOROUS}` ) );
        }
    }

    return (
        <Drawer
            title="Filtros"
            placement='right'
            closeIcon
            closable={true}
            onClose={onClose}
            open={open}
        >
            <Search defaultValue={filterObj.searchTerm} placeholder="Busca una Planta" onSearch={onSearch} enterButton onInput={e => e.target.value = titleCase( e.target.value )}/>
            <Divider/>
            <Tree
                className='filter-tree'
                showIcon
                defaultSelectedKeys={createDefaultSelected( filterObj.category, filterObj.family, filterObj.genre )}
                defaultExpandedKeys={createDefaultExpanded( filterObj.category, filterObj.family, filterObj.genre )}
                defaultExpandAll={screenName === CARNIVOROUS}
                onSelect={onSearchTree}
                treeData={buildFilterTreeObj( categories, screenName )}
            />
            <Divider/>
            <Button onClick={removeFilters} disabled={Object.keys(filterObj).length === 0 && !searchTerm} icon={<MdFilterAltOff size={20}/>} size='middle'>Resetear
                Filtros</Button>
        </Drawer>
    );
};

FilterDrawer.propTypes = {
    showDrawer: PropTypes.bool.isRequired,
    setShowDrawer: PropTypes.func.isRequired,
    screenName: PropTypes.string.isRequired,
    filterObj: PropTypes.object.isRequired,
    setFilterObj: PropTypes.func.isRequired
};

export default FilterDrawer;
