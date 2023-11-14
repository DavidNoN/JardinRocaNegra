import { startGetPlants } from "../../services/PlantService";
import { getPlantsScheme } from "./plantSlice";

export const getPlants = ( param ) => {

    return async ( dispatch ) => {
        const result = await startGetPlants( param );

        if ( !result.ok ) {
            return;
        }

        return dispatch( getPlantsScheme() );
    }
}
