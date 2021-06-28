import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FlexContainer from '../../components/common/FlexContainer';
import Spinner from '../../components/common/Icon/Spinner';
import Loader from '../../components/common/Loader';
import ErrorModal from '../../components/common/Modal/ErrorModal';
import Main from '../../components/Main';
import PageTitle from '../../components/shared/PageTitle';
import PriceInfoBox from '../../components/shared/PriceInfoBox';
import ProductList from '../../components/shared/ProductList';
import ProductListItem from '../../components/shared/ProductList/ProductListItem';

import { PAGES } from '../../constants/appInfo';
import { APP_MESSAGE } from '../../constants/message';
import PALETTE from '../../constants/palette';

import useCart from '../../hooks/useCart';
import useErrorModal from '../../hooks/useErrorModal';
import { setOrder } from '../../redux/Orders/actions';

import * as Styled from './style';

const CheckoutPage = () => {
  const { cartList, isLoading } = useCart();
  const dispatch = useDispatch();
  const { errorMessage, openModal, closeModal } = useErrorModal();
  const history = useHistory();

  const checkedProducts = cartList.filter((product) => product.isChecked);
  const totalPrice = checkedProducts.reduce((prev, product) => prev + Number(product.price) * product.quantity, 0);

  const onOrder = () => {
    if (!confirm(APP_MESSAGE.PAYMENT_CONFIRMATION)) return;

    dispatch(setOrder(checkedProducts)).catch((error) => {
      openModal(error.message);
    });

    history.push(`${PAGES.ORDERS.ADDRESS}`);
  };

  return (
    <Main>
      <Loader animationType={'spin'} isLoading={isLoading}>
        <Spinner width={'8rem'} color={PALETTE.BAEMINT} />
      </Loader>
      <PageTitle>{PAGES.CHECKOUT.NAME}</PageTitle>
      <FlexContainer align="flex-start">
        <FlexContainer width="58%" margin="3rem auto 0 1.5rem" direction="column">
          <Styled.ProductListTitle>{`주문 상품(${checkedProducts.length}건)`}</Styled.ProductListTitle>
          <ProductList>
            {checkedProducts?.map((product) => (
              <ProductListItem
                key={product.productId}
                listStyle="lineStyle"
                isCheckbox={false}
                imageSize="7.5rem"
                product={product}
                productDetail={{ text: `수량: ${product.quantity}` }}
              />
            ))}
          </ProductList>
        </FlexContainer>
        <PriceInfoBox
          width="30%"
          margin="6rem 1.5rem 0 auto"
          title="결제금액"
          priceInfo={{ name: '총 결제금액', price: totalPrice }}
          buttonText={`${totalPrice.toLocaleString()}원 결제하기`}
          onClick={onOrder}
        />
      </FlexContainer>
      <ErrorModal errorMessage={errorMessage} closeModal={closeModal} />
    </Main>
  );
};

export default CheckoutPage;
