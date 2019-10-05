import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Badged from 'seoul/styled/Badged';
import Grid from 'seoul/styled/Grid';
import GridContainer from 'seoul/styled/GridContainer';
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import styled from 'styled-components';
import { useQuerry } from 'querry';
import { useSelector } from 'react-redux';

import { ReduxState } from '@@react/universal/state';

const categories = [
  'Hotels',
  'Health Products',
  'Clothing',
  'Food',
  'Apartment',
];

const StyledCategorySelectPane = styled.div({
  backgroundColor: '#f9f9f9',
  color: '#222',
  display: 'flex',
  height: 80,
  padding: '10 26',
});

const Left = styled(GridContainer)({
  fontWeight: 500,
});

const Right = styled.div({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0 12',
  width: 200,
});

const TransformingButton = styled.div({
  '&:hover': {
    '>div': {
      transform: 'translateX(-52px)',
    },
    maxWidth: 110,
    p: {
      backgroundColor: '#444',
      color: 'white',
    },
  },
  '>div': {
    display: 'flex',
    transition: 'transform 900ms ease',
  },
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  fontWeight: 500,
  height: '100%',
  letterSpacing: '-0.1em',
  maxWidth: 52,
  overflow: 'hidden',
  p: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 20,
    justifyContent: 'center',
    textTransform: 'uppercase',
    transition: 'color 600ms ease, background-color 600ms ease',
    width: 110,
  },
  svg: {
    fontSize: 40,
    padding: 5,
  },
  transition: 'max-width 900ms ease',
});

const StyledShoppingCartIconButton = styled.div({
  paddingRight: 12,
});

const ShoppingCartIconButton = ({
  itemTotalCount,
}) => {
  return (
    <StyledShoppingCartIconButton>
      <Badged
        badgeStyle={{
          backgroundColor: 'transparent',
          color: '#222',
          fontSize: '1.2rem',
          height: 24,
          minWidth: 24,
          right: 2,
          top: 5,
        }}
        label={itemTotalCount}
      >
        <ShoppingCartIcon />
      </Badged>
    </StyledShoppingCartIconButton>
  );
};

const StyledCategory = styled(Grid)({
  '>span:last-child': {
    marginLeft: 3,
  },
  alignItems: 'center',
  cursor: 'default',
  display: 'flex',
  height: 24,
});

const Category = ({
  children,
}) => {
  return (
    <StyledCategory unit={4}>
      <span>
        <ArrowForwardIcon />
      </span>
      <span>
        {children}
      </span>
    </StyledCategory>
  );
};

const CategorySelectPane = () => {
  const { history, location } = useQuerry();
  const cart = useSelector((state: ReduxState) => state.cart);
  const itemTotalCount = Object.values(cart)
    .reduce((acc: number, curr: number) => {
      if (acc === undefined) {
        acc = 0;
      }
      return acc + curr;
    }, undefined);

  const handleClickCheckout = React.useCallback(() => {
    history.push(`/cart${location.search}`);
  }, [location]);

  return (
    <StyledCategorySelectPane>
      <Left>
        {categories.map((category) => (
          <Category key={category}>{category}</Category>
        ))}
      </Left>
      <Right>
        <TransformingButton onClick={handleClickCheckout}>
          <div>
            <ShoppingCartIconButton itemTotalCount={itemTotalCount} />
            <p>Checkout</p>
          </div>
        </TransformingButton>
      </Right>
    </StyledCategorySelectPane>
  );
};

export default CategorySelectPane;
