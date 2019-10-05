import React from 'react';
import styled from 'styled-components';
import { useFetch } from 'xongkoro';
import { useSelector } from 'react-redux';

import Cart from '@@react/universal/components/pages/CartPage/Cart';
import CustomerSupport from './CustomerSupport';
import fetchProductsByProductNoList from '@@react/universal/fetchers/fetchProductsByProductNoList';
import fetchRecommendedProducts from '@@react/universal/fetchers/fetchRecommendedProducts';
import OrderSummary from './OrderSummary';
import PageBase from '@@react/universal/components/pages/PageBase';
import Payment from '@@react/universal/components/pages/CartPage/Payment';
import RecommendedItems from './RecommendedItems';
import { ReduxState } from '@@react/universal/state';

const StyledCartPage = styled(PageBase)({
  '&>div': {
    display: 'flex',
  },
});

const Left = styled.div({
  '&>div': {
    marginBottom: 24,
    minHeight: 210,
  },
  flexGrow: 1,
});

const Right = styled.div({
  '&>div': {
    marginBottom: 24,
  },
  marginLeft: 28,
  width: 265,
});

const RightBottom = styled.div({
  '&>div': {
    marginBottom: 24,
    padding: '0 14',
  },
});

const CartPage = () => {
  const cart = useSelector((state: ReduxState) => state.cart);
  const user = useSelector((state: ReduxState) => state.user);
  const fetchOptions = {
    cacheKey: 'fetchProductsByProductNoList',
    fetchParam: {
      cart,
    },
  };

  const {
    data: productData,
    loading: productLoading,
  } = useFetch(fetchProductsByProductNoList, fetchOptions, [cart]);

  const {
    data: recommendedProductData,
    loading: recommendedProductLoading,
  } = useFetch(fetchRecommendedProducts, {
    cacheKey: 'fetchRecommendedProducts',
    fetchParam: {
      cart,
      user,
    },
  }, [cart]);

  return (
    <StyledCartPage>
      <div>
        <Left>
          <Cart
            loading={productLoading}
            productData={productData}
          />
          <Payment />
        </Left>
        <Right>
          <OrderSummary
            loading={productLoading}
            productData={productData}
          />
          <RightBottom>
            <RecommendedItems
              data={recommendedProductData}
              loading={recommendedProductLoading}
            />
            <CustomerSupport />
          </RightBottom>
        </Right>
      </div>
    </StyledCartPage>
  );
};

export default CartPage;
