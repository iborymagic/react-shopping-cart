import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeQuantity,
  removeCheckedProducts,
  removeProduct,
  toggleAllCheckboxesInCart,
  toggleCartCheckbox,
} from '../redux/Cart/actions';
import useErrorModal from './useErrorModal';
import useUpdateEffect from './useUpdateEffect';

const useCart = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const { cartList, isLoading } = useSelector((state) => state.cart);
  const { errorMessage: cartError, openModal, closeModal: closeCartErrorModal } = useErrorModal();
  const dispatch = useDispatch();

  const changeCheckbox = (cartId) => () => {
    dispatch(toggleCartCheckbox(cartId));
  };

  const changeAllCheckbox = () => {
    dispatch(toggleAllCheckboxesInCart(!isAllChecked));
    setIsAllChecked(!isAllChecked);
  };

  const removeCheckedCartProducts = () => {
    const checkedCartIds = cartList.filter((product) => product.isChecked).map((product) => product.cartId);
    dispatch(removeCheckedProducts(checkedCartIds)).catch((error) => {
      openModal(error.message);
    });
  };

  const removeCartProduct = (cartId) => {
    dispatch(removeProduct(cartId)).catch((error) => {
      openModal(error.message);
    });
  };

  const changeCartProductQuantity = (cartId, quantity) => {
    dispatch(changeQuantity(cartId, quantity));
  };

  const calculateTotalPrice = () =>
    cartList?.reduce((sum, product) => (sum += product.isChecked ? product.price * product.quantity : 0), 0);

  useEffect(() => {
    const isProductExists = !!cartList.length;
    dispatch(toggleAllCheckboxesInCart(isProductExists));
    setIsAllChecked(isProductExists);
  }, []);

  useUpdateEffect(() => {
    if (!cartList?.length) {
      setIsAllChecked(false);
      return;
    }

    if (isAllChecked && cartList.some((product) => !product.isChecked)) {
      setIsAllChecked(false);
      return;
    }

    if (!isAllChecked && cartList.every((product) => product.isChecked)) {
      setIsAllChecked(true);
      return;
    }
  }, [cartList]);

  return {
    cartList,
    isLoading,
    isAllChecked,
    setIsAllChecked,
    changeCheckbox,
    changeAllCheckbox,
    removeCheckedCartProducts,
    removeCartProduct,
    changeCartProductQuantity,
    calculateTotalPrice,
    cartError,
    closeCartErrorModal,
  };
};

export default useCart;
