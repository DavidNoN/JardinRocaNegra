import { getNameByPathname, getRouterNameByPathname } from "../../utils/routerUtils";
import { setBrowserHistory, setScreenName } from "./screenBrowserHistorySlice";

export const dispatchScreenName = ( pathname ) => {
    return ( dispatch ) => dispatch( setScreenName( { screenName: getRouterNameByPathname( pathname ) } ) );

}

export const dispatchBrowserHistory = ( basePathname, uid, genre, species, fullPathname ) => {

    return ( dispatch ) => {
        if ( !uid ) {
            return dispatch( setBrowserHistory( {
                browserHistory: [ {
                    breadcrumb: getNameByPathname( basePathname ),
                    pathname: basePathname
                } ]
            } ) );
        }

        return dispatch( setBrowserHistory( {
            browserHistory:
                [ ...basePathname,
                    {
                        breadcrumb: `${genre} ${species}`, pathname: fullPathname
                    }
                ]
        } ) );
    };
}
