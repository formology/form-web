import Button from 'seoul/styled/Button';
import Image from 'seoul/styled/Image';
import React from 'react';
import Spinner from 'seoul/styled/Spinner';
import styled from 'styled-components';
import Table from 'seoul/styled/Table';
import Text from 'seoul/styled/Text';
import { useDispatch } from 'react-redux';

import { ActionType } from '@@src/universal/state';
import { ProductEntity } from '@@src/universal/fetchers/entities';

const headerRows = [
  {
    cells: [
      {
        label: 'Product',
      },
      {
        label: 'Qty',
        textAlign: 'right',
      },
      {
        label: 'Price',
        textAlign: 'right',
      },
    ],
    rowId: 'headerRow',
  },
];

const StyledCart = styled.div({
  flexGrow: 1,
});

const StyledEmptyCart = styled.div({
  alignItems: 'center',
  display: 'flex',
  height: 120,
  justifyContent: 'center',
});

const EmptyCart = () => {
  return (
    <StyledEmptyCart>
      Cart is empty
    </StyledEmptyCart>
  );
};

const ProductCell = styled.div({
  '&>p': {
    paddingLeft: 13,
  },
  alignItems: 'center',
  display: 'flex',
});

const CartTable = ({
  loading,
  products,
}) => {
  if (loading) {
    return (
      <Spinner
        height={150}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyCart />
    );
  }

  const bodyRows = products.map((product: ProductEntity) => {
    const cells = [
      {
        label: (
          <ProductCell>
            <Image
              imgUrl={product.img_url}
              size={50}
            />
            <p>{product.label}</p>
          </ProductCell>
        ),
      },
      {
        label: product['$cartCount'],
        textAlign: 'right',
      },
      {
        label: `${product.currency} ${product.price}`,
        textAlign: 'right',
      },
    ];
    return {
      cells,
      rowId: product.product_no,
    };
  });

  return (
    <Table
      bodyRows={bodyRows}
      headerRows={headerRows}
    />
  );
};

const Cart: React.FC<CartProps> = ({
  loading,
  productData,
}) => {
  const dispatch = useDispatch();
  const handleClickEmptyCart = React.useCallback(() => {
    dispatch({
      type: ActionType.EMPTY_CART.Base,
    });
  }, []);

  return (
    <StyledCart>
      <Text textType="t6">
        Products to Order
      </Text>
      <CartTable
        loading={loading}
        products={productData && productData.payload}
      />
      <div>
        <Button
          onClick={handleClickEmptyCart}
        >
          Empty Cart
        </Button>
      </div>
    </StyledCart>
  );
};

export default Cart;

interface CartProps {
  loading: boolean;
  productData: {
    payload: ProductEntity[];
  }
}
