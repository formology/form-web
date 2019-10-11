import Badged from 'seoul/styled/Badged';
import Grid from 'seoul/styled/Grid';
import React from 'react';
import styled from 'styled-components';

import Price from '@@src/universal/components/app/Price';

const StyledCard = styled.div({
  '&:hover': {
    backgroundColor: '#f5f9f8',
    borderRadius: 3,
  },
  cursor: 'default',
  display: 'flex',
  flexDirection: 'column',
  fontSize: 16,
  height: 320,
  margin: '3px 5px',
  padding: '13px 14px',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
});

const Button = styled.button({
  '&:hover': {
    backgroundColor: '#444',
    color: '#fefefe',
  },
  backgroundColor: 'transparent',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '0.02857em',
  lineHeight: 1.75,
  margin: 0,
  outline: 'none',
  overflow: 'visible',
  padding: '6px 8px',
  textTransform: 'uppercase',
  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  width: 'auto',
});

const Media = styled.div<any>((props) => ({
  backgroundColor: 'white',
  backgroundImage: `url(${props.url})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  flexShrink: 0,
  height: 170,
  marginBottom: 5,
}));

const ProductLabel = styled.p({
  lineHeight: '1.2',
  marginBottom: 9,
  marginTop: 5,
});

const ButtonRow = styled.div({
  margin: 0,
  padding: '9px 0',
});

const Product: React.FC<ProductProps> = ({
  handleClickAddToCart,
  inCartCount,
  product,
}) => {
  return (
    <Grid
      unit={3}
    >
      <StyledCard>
        <Badged
          badgeStyle={{
            backgroundColor: '#40ca39',
          }}
          label={inCartCount}
        >
          <Media
            title={product.label}
            url={product.img_url}
          />
        </Badged>
        <div>
          <ProductLabel>
            {product.label}
          </ProductLabel>
          <Price>
            {`${product.price} ${product.currency}`}
          </Price>
        </div>
        <ButtonRow>
          <Button onClick={(e) => handleClickAddToCart(e, product.product_no)}>
            Add to cart
          </Button>
        </ButtonRow>
      </StyledCard>
    </Grid>
  );
};

export default Product;

interface ProductProps {
  handleClickAddToCart: any;
  inCartCount: number | undefined;
  product: {
    created_at: string;
    currency: string;
    id: number;
    img_url: string;
    label: string;
    price: number;
    product_no: string;
    row_status: string;
    updated_at: string;
  }
}
