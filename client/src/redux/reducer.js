// import { ORDER} from "./actions/actionsTypes";

// const initialState = {
//     myFavorites:[], 
//     allCharacters:[]
// }

// function reducer(state = initialState, { type, payload }){
//     switch(type){
//         case ORDER:
//             {
//                const  orderChar = state.myFavorites.sort((a,b)=>{ 
//                 if(payload === 'ascendente') 
//                 return a.id - b.id 
//                 return b.id - a.id
//                 })
//                 return{
//                     ...state,
//                     myFavorites:[...orderChar]
//                 }
//             }
//         default:
//             return {...state}
//     }
// }

// export default reducer;

import { ORDER, FILTER } from "./actions/actionsTypes";

const initialState = {
    filterCountries:[], 
    allCountries:[]
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case FILTER:
            {
                const filtered = state.allCountries.filter(char => char.continents === payload )
                return{
                    ...state,
                    myFavorites: payload === 'All' ? state.allCountries : filtered
                }
            }
      case ORDER: {
        const orderChar = state.filterCountries.sort((a, b) => {
          if (payload === 'ascendente') {
            return a.id.localeCompare(b.id); // Comparación alfabética ascendente
          }
          return b.id.localeCompare(a.id); // Comparación alfabética descendente
        });
        return {
          ...state,
          filterCountries: [...orderChar]
        };
      }
      default:
        return { ...state };
    }
  }

export default reducer;