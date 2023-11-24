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
import QuestionsAnswersScreen from "../Screens/QuestionsAnswersScreen";
import UnauthorizedScreen from "../Screens/UnauthorizedScreen";
import { AdminRoute } from "./AdminRoute";
import AdminBaseScreen from "../Screens/AdminBaseScreen";
import { getCategories } from "../store/category/categoryThunks";
import MyProfileScreen from "../Screens/MyProfileScreen";

export const BlackRockRouter = () => {

    const { checkAuthToken } = useAuthStore();
    const pathname = useLocation().pathname;
    const dispatch = useDispatch();
    let plantUid = checkIfPathnameHasUid( pathname );
    const { isWholesaleUser, status, typeUser } = useSelector( state => state.user );
    const { screenName } = useSelector( state => state.screen );


    useEffect( () => {
        checkAuthToken().then();
        getCategories( dispatch ).then();
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
                <Route path={path}
                       element={<BasePlantGridScreen isWholesaleUser={isWholesaleUser} screenName={screenName}/>}
                       key={path}>
                    <Route path={`detail-product/:uid`}
                           element={<DetailProductScreen isWholesaleUser={isWholesaleUser} screenName={screenName}/>}/>
                </Route>
            ) )}
            <Route path='other-products' element={<OtherProductsScreen/>}></Route>
            <Route path='frequently-questions' element={<QuestionsAnswersScreen/>}></Route>
            <Route path='unauthorized' element={<UnauthorizedScreen/>}></Route>
            <Route path='admin' element={<AdminRoute typeUser={typeUser}><AdminBaseScreen/></AdminRoute>}></Route>
            <Route path="sign-in" element={<SignBaseScreen/>}></Route>
            <Route path="my-profile" element={<MyProfileScreen/>}></Route>
        </Routes>
    )

}
