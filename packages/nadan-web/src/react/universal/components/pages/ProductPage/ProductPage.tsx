import React from 'react';
import styled from 'styled-components';
import Text from 'seoul/styled/Text';

import CategorySelectPane from './CategorySelectPane';
import PageBase from '@@react/universal/components/pages/PageBase';
import ProductList from '@@react/universal/components/pages/ProductPage/ProductList';

const intro = 'Here you will find all different types of products you can purchase with Nadan. That includes flight tickets, hotel reservations, clothing, and even health products. Pay in the safest-manner ever, with your identity disclosed only at your disposal.';

const StyledProductPage = styled(PageBase)({
  '>div': {
    marginBottom: 20,
  },
});

const StyledProductPageIntro = styled.div({
  display: 'flex',
});

const Title = styled.div({
  color: '#222',
  flexShrink: 0,
  width: 220,
});

const Description = styled.div({
  color: '#777',
  letterSpacing: '0.02em',
});

const ProductPageIntro = () => {
  return (
    <StyledProductPageIntro>
      <Title>
        <Text textType="h5">
          All Kinds
        </Text>
      </Title>
      <Description>
        <Text textType="t7">
          {intro}
        </Text>
      </Description>
    </StyledProductPageIntro>
  );
};

const ProductPage = () => {
  return (
    <StyledProductPage>
      <CategorySelectPane />
      <ProductPageIntro />
      <ProductList />
    </StyledProductPage>
  );
};

export default ProductPage;
