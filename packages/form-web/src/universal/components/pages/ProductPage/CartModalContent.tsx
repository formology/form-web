import React from 'react';
import styled from 'styled-components';
import Table from 'seoul/styled/Table';
import { useSelector } from 'react-redux';

import { ReduxState } from '@@src/universal/state';

const StyledCartModalContent = styled.div({
  padding: '6px 12px 15px',
});

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
    ],
    rowId: 'headerRows',
  },
];

const CartModalContent = () => {
  const { cart, products } = useSelector((state: ReduxState) => ({
    cart: state.cart,
    products: state.products,
  }));

  const bodyRows = React.useMemo(() => {
    const result = Object.entries(cart)
      .map(([productNo, count]) => {
        const product = products[productNo];
        return product && {
          cells: [
            {
              label: product.label,
            },
            {
              label: count,
              textAlign: 'right',
            },
          ],
          rowId: productNo,
        };
      });
    return result;
  }, [cart]);

  return (
    <StyledCartModalContent>
      <Table
        bodyRows={bodyRows}
        headerRows={headerRows}
      />
    </StyledCartModalContent>
  );
};

export default CartModalContent;
