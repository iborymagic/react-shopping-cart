import { ERROR_MESSAGE } from '../../constants/message';
import { API_URL } from '../../constants/api';

export const GET_PRODUCTS_SUCCESS = 'product_list/get_products/success';
export const GET_PRODUCTS_PENDING = 'product_list/get_products/pending';
export const GET_PRODUCTS_ERROR = 'product_list/get_products/error';
export const RESET_PRODUCTS = 'product_list/reset_products';

export const getProducts = () => (dispatch, getState) => {
  dispatch({ type: GET_PRODUCTS_PENDING });
  fetch(API_URL.PRODUCTS)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ERROR_MESSAGE.FAILED_TO_FETCH_PRODUCTS);
      }

      return response.json();
    })
    .then((data) => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: data,
      });
    })
    .catch((e) =>
      dispatch({
        type: GET_PRODUCTS_ERROR,
        errorMessage: e.message,
      })
    );
};

export const resetProducts = () => {
  return {
    type: RESET_PRODUCTS,
  };
};
