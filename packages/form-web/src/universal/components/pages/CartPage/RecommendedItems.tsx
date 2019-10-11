import Image from 'seoul/styled/Image';
import React from 'react';
import Spinner from 'seoul/styled/Spinner';
import styled from 'styled-components';
import Text from 'seoul/styled/Text';

import Price from '@@src/universal/components/app/Price';
import { ProductEntity } from '@@src/universal/fetchers/entities';

const HARDCODED__description = `Don't forget to checkout our favorites as well!`;

const StyledRecommendedItems = styled.div({
});

const Description = styled.p({
  color: '#878c8c',
  letterSpacing: '0.01em',
  margin: '4px 0',
});

const EmptyRecommendedList = styled.div({
  alignItems: 'center',
  display: 'flex',
  height: 50,
  justifyContent: 'center',
});

const Ul = styled.ul({
  '&>li': {
    display: 'flex',
    marginBottom: 6,
  },
  marginTop: 12,
});

const ProductMeta = styled.div({
  '&>p:first-child': {
    marginBottom: 5,
  },
  fontSize: '0.95em',
  padding: '6px 14px',
});

const ItemList = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <Spinner
        height={190}
      />
    );
  }

  const { payload: items = [] } = data;

  if (items.length === 0) {
    return (
      <EmptyRecommendedList>
        Wow, such empty!
      </EmptyRecommendedList>
    );
  }

  const list = React.useMemo(() => {
    return items.map((item: ProductEntity) => (
      <li key={item.label}>
        <Image
          imgUrl={item.img_url}
          size={70}
        />
        <ProductMeta>
          <p>{item.label}</p>
          <Price>{`${item.currency} ${item.price}`}</Price>
        </ProductMeta>
      </li>
    ));
  }, [items]);

  return (
    <Ul>
      {list}
    </Ul>
  );
};

const RecommendedItems: React.FC<RecommendedItemsProps> = ({
  data,
  loading,
}) => {
  return (
    <StyledRecommendedItems>
      <Text textType="t7">Recommended Items</Text>
      <Description>{HARDCODED__description}</Description>
      <ItemList
        data={data}
        loading={loading}
      />
    </StyledRecommendedItems>
  );
};

export default RecommendedItems;

interface RecommendedItemsProps {
  data: {
    payload?: ProductEntity[];
  };
  loading: boolean;
}
