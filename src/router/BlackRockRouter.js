import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import OtherProductsScreen from "../Screens/OtherProductsScreen";
import DetailProductScreen from "../Screens/DetailProductScreen";
import SignBaseScreen from "../Screens/SignBaseScreen";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthStore } from "../hooks/useAuthStore";
import BasePlantGridScreen from "../Screens/BasePlantGridScreen";
import { dispatchBrowserHistory, dispatchScreenName } from "../store/screen/screenBrowserHistoryThunks";
import { checkIfPathnameHasUid } from "../utils/routerUtils";


export const BlackRockRouter = () => {

    const { checkAuthToken } = useAuthStore();
    const pathname = useLocation().pathname;
    const dispatch = useDispatch();
    let plantUid = checkIfPathnameHasUid( pathname );
    const { isWholesaleUser, status } = useSelector( state => state.user );



    useEffect( () => {
        checkAuthToken().then();
    }, [] );

    useEffect( () => {
        plantUid = checkIfPathnameHasUid( pathname )
        if ( !plantUid ) {
            dispatch( dispatchScreenName( pathname ) );
            dispatch( dispatchBrowserHistory( pathname, null, null, null ) );
        }
    }, [ pathname ] );

    if ( status === 'validating' ) {
        return <h3>Cargando...</h3>
    }

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/new-plants"/>}/>
            <Route
                path="*"
                element={
                    <Navigate to="/new-plants"/>
                }
            />
            {[ 'collection-plants', 'carnivorous-plants', 'wholesale-plants', 'new-plants' ].map( ( path ) => (
                <Route path={path} element={<BasePlantGridScreen isWholesaleUser={isWholesaleUser}/>} key={path}>
                    <Route path={`detail-product/:uid`}
                           element={<DetailProductScreen isWholesaleUser={isWholesaleUser}/>}/>
                </Route>
            ) )}
            <Route path='other-products' element={<OtherProductsScreen/>}></Route>
            <Route path="sign-in" element={<SignBaseScreen/>}></Route>
        </Routes>
    )

}
