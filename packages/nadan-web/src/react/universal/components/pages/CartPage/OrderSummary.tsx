import React from 'react';
import Spinner from 'seoul/styled/Spinner';
import styled from 'styled-components';
import Text from 'seoul/styled/Text';

const HARDCODED__exchangeRate = 0.00083;
const HARDCODED__shippingHandling = 21;
const HARDCODED__taxRate = 0.1;

const StyledOrderSummary = styled.div({
  '> p': {
    fontSize: '1.04rem',
    fontWeight: 500,
    letterSpacing: '0.008em',
  },
  backgroundColor: '#f9f9f9',
  borderRadius: 3,
  padding: '20px 18px',
});

const StyledOrderSummaryTable = styled.table({
  '& td': {
    fontSize: '0.8em',
    padding: 0,
  },
  '& td:nth-child(2)': {
    textAlign: 'right',
  },
  '& tr': {
    lineHeight: 1.5,
  },
  marginTop: 6,
  width: '100%',
});

const EmptyRow = styled.tr({
  height: 8,
});

const OrderSummaryTable = ({
  loading,
  products,
}) => {
  const calculation = React.useMemo(() => {
    let estimatedTax = 0;
    let orderTotal = 0;
    let shippingHandling = 0;
    let totalBeforeTax = 0;
    let totalProductPrice = 0;

    if (!loading && products.length > 0) {
      totalProductPrice = products.reduce((acc, curr) => {
        const normalizedPrice = curr.currency !== 'USD'
          ? curr.price * HARDCODED__exchangeRate
          : curr.price;

        return acc + Math.round((normalizedPrice * curr.$cartCount * 100) / 100);
      }, 0);

      shippingHandling = HARDCODED__shippingHandling;
      totalBeforeTax = totalProductPrice + shippingHandling;
      estimatedTax = Math.round(totalBeforeTax * HARDCODED__taxRate * 100) / 100;
      orderTotal = totalBeforeTax + estimatedTax;
    }
    return {
      estimatedTax,
      orderTotal,
      shippingHandling,
      totalBeforeTax,
      totalProductPrice,
    };
  }, [products]);

  if (loading) {
    return (
      <Spinner
        height={150}
      />
    );
  }

  return (
    <StyledOrderSummaryTable>
      <tbody>
        <tr>
          <td>Currency for payment</td>
          <td>USD</td>
        </tr>
        <tr>
          <td>Products</td>
          <td>{calculation.totalProductPrice}</td>
        </tr>
        <tr>
          <td>Shipping and handling</td>
          <td>{calculation.shippingHandling}</td>
        </tr>
        <EmptyRow />
        <tr>
          <td>Total before tax</td>
          <td>{calculation.totalBeforeTax}</td>
        </tr>
        <tr>
          <td>Estimated tax (10%)</td>
          <td>{calculation.estimatedTax}</td>
        </tr>
        <EmptyRow />
        <tr>
          <td>
            <Text textType="h7">Order Total</Text>
          </td>
          <td>
            <Text textType="h7">{`USD ${calculation.orderTotal}`}</Text>
          </td>
        </tr>
      </tbody>
    </StyledOrderSummaryTable>
  );
};

const OrderSummary = ({
  loading,
  productData,
}) => {
  return (
    <StyledOrderSummary>
      <p>
        Order Summary
      </p>
      <OrderSummaryTable
        loading={loading}
        products={productData && productData.payload}
      />
    </StyledOrderSummary>
  );
};

export default OrderSummary;
