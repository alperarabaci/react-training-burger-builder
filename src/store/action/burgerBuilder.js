import * as actions from './actionTypes';
import axios from '../../axios-orders';

export const removeIngredient = (ingredientType) => {

    return {
            type: actions.REMOVE_INGREDIENTS, 
            ingredientType: ingredientType
    };
}

export const addIngredient = (ingredientType) => {

    return {
            type: actions.ADD_INGREDIENTS,
            ingredientType:ingredientType
    };
}

export const setIngredients = (ingredients) => {
    return {type: actions.GET_INGREDIENTS, ingredients:ingredients};
}

export const fetchIngredientsFailed = () =>{
    return {type: actions.FETCH_INGREDIENTS_FAILED};
}

export const initIngerdients = () => {

    //bunu ekleyince asenkron oldu:
    //redux-thunk index.js'de middleware'e eklediydik.
    return (dispatch) => {
        
        axios.get('/ingredients.json')
        .then(response => {                        
            dispatch(setIngredients(response.data));            
        })
        .catch(error => {
            //ne hata oldu gecmedik??
            console.log("error",error);
            dispatch(fetchIngredientsFailed());
        });

    }
}