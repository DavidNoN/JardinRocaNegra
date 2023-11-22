import { startGetCategories } from "../../services/CategoryService";
import { categories } from "./categorySlice";

export const getCategories = async (dispatch) => {

    const result = await startGetCategories();
    await dispatch( categories( result ) );
    return result;

}
