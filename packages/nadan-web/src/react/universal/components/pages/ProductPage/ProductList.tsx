import GridContainer from 'seoul/styled/GridContainer';
import React from 'react';
import Spinner from 'seoul/styled/Spinner';
import styled from 'styled-components';
import { RenderDataProps, XongkoroFetch } from 'xongkoro';
import { useDispatch, useSelector } from 'react-redux';

import { ActionType, ReduxState } from '@@react/universal/state';
import AppModal from '@@react/universal/components/app/AppModal';
import CartModalContent from './CartModalContent';
import fetchProducts from '@@react/universal/fetchers/fetchProducts';
import Product from './Product';

const StyledProductList = styled.div({
  width: '100%',
});

const ProductRendered: React.FC<RenderDataProps<any>> = ({
  data,
  extraProps,
  loading,
}) => {
  const cart = useSelector((state: ReduxState) => state.cart);

  if (loading) {
    return (
      <Spinner
        height={220}
      />
    );
  }

  const { handleClickAddToCart } = extraProps;
  return data && data.payload.map((product) => {
    return (
      <Product
        handleClickAddToCart={handleClickAddToCart}
        inCartCount={cart[product.product_no]}
        key={product.product_no}
        product={product}
      />
    );
  });
};

const ProductList: React.FC<any> = () => {
  const [open, setOpen] = React.useState(false);
  const {
    handleClickAddToCart,
    handleCloseModal,
  } = useClickAddToCart(setOpen);
  const fetchOptions = {
    cacheKey: 'fetchProducts',
    fetchParam: {
      dispatch: useDispatch(),
    },
  };

  return (
    <StyledProductList>
      <GridContainer>
        <XongkoroFetch
          extraProps={{
            handleClickAddToCart,
          }}
          fetchFunction={fetchProducts}
          fetchOptions={fetchOptions}
          renderData={ProductRendered}
        />
      </GridContainer>
      <AppModal
        handleCloseModal={handleCloseModal}
        headerLabel="CART"
        open={open}
        renderContent={CartModalContent}
      />
    </StyledProductList>
  );
};

export default ProductList;

function useClickAddToCart(setOpen) {
  const dispatch = useDispatch();

  const handleCloseModal = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickAddToCart = React.useCallback((e, productNo: string) => {
    dispatch({
      payload: productNo,
      type: ActionType.ADD_TO_CART.Base,
    });
    setOpen(true);
  }, []);

  return {
    handleClickAddToCart,
    handleCloseModal,
  };
}
