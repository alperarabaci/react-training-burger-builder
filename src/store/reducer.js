import * as actions from './actions';

export const INITIAL_PRICE = 4;

export const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  }

const initialState = {
    ingredients: null,
    totalPrice: INITIAL_PRICE,
    purchasable: false  
};

const reducer = (state = initialState, action) => {

    let priceAddition, oldPrice, newPrice, newIngredients = null;    
    let purchasable = true;

    switch(action.type){
        case actions.ADD_INGREDIENTS:            
            newIngredients = {...state.ingredients};
            newIngredients[action.ingredientType] = newIngredients[action.ingredientType] + 1;                
        
            priceAddition = INGREDIENT_PRICES[action.ingredientType];
            oldPrice = state.totalPrice;
            newPrice = oldPrice + priceAddition;

            
                    
            return{
                ...state,
                ingredients: newIngredients,
                totalPrice: newPrice,
                purchasable: true
            }
        

        case actions.REMOVE_INGREDIENTS:
            console.log('remove:' + action.ingredientType);

            newIngredients = {...state.ingredients};
            newIngredients[action.ingredientType] = newIngredients[action.ingredientType] - 1;

            priceAddition = INGREDIENT_PRICES[action.ingredientType];
            oldPrice = state.totalPrice;
            newPrice = oldPrice - priceAddition;

            
            if(newPrice === INITIAL_PRICE){
                purchasable = false;
            }

            return{
                ...state,
                ingredients: newIngredients,
                totalPrice: newPrice,
                purchasable: purchasable
            }            

        case actions.GET_INGREDIENTS:
            newIngredients = {...action.ingredients};

            const sum = Object.keys(newIngredients).reduce( (sum, el) => {
                console.log("SUM: " + el)        
                return sum + (newIngredients[el] * INGREDIENT_PRICES[el]);
              }, INITIAL_PRICE);
            
            if(newPrice === INITIAL_PRICE){
                purchasable = false;
            }
            return {
                ...state,
                ingredients: newIngredients,
                totalPrice: sum,
                purchasable: purchasable
            }
                
        default:
            break;

    }

    return state;
   };
    
export default reducer;