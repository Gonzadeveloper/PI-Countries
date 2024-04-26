import axios from 'axios';
import { ORDER, FILTER } from './actionsTypes';


// * actions creators
export const postActivities = () => async (dispatch) => {
  const response = await fetch(`http://localhost:3001/countries/postActivities`);
  const data = await response.json();
  dispatch({
    type: "POST_ACTIVITIES",
    payload: data,
  });
};

export function filterCards(continents) {
  return {
    type: FILTER,
    payload: continents,
  };
}

export function orderCards(payload) {
return {
  type: ORDER,
  payload,
};
}