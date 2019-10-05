import Input from 'seoul/styled/Input';
import React from 'react';
import styled from 'styled-components';

const StyledShipping = styled.div({
  padding: '8px 0',
});

const Title = styled.p({
  fontWeight: 400,
  letterSpacing: '0.009em',
});

const Row = styled.div({
  '&:not(:first-child)': {
    marginTop: 12,
  },
  '&>div': {
    flexGrow: 1,
  },
  '&>div:not(:first-child)': {
    flexGrow: 1,
    marginLeft: 18,
  },
  display: 'flex',
});

const Form = styled.form({
  marginTop: 7,
});

const Shipping = () => {
  return (
    <StyledShipping>
      <Title>Shipping Address</Title>
      <Form>
        <Row>
          <Input
            label="First Name"
          />
          <Input
            label="Last Name"
          />
        </Row>
        <Row>
          <Input
            fullWidth
            label="Address Line 1"
            placeholder="Street address, P.O box, company name"
          />
        </Row>
        <Row>
          <Input
            fullWidth
            label="Address Line 2"
            placeholder="Apartment, suite, unit, building, floor, etc"
          />
        </Row>
        <Row>
          <Input
            fullWidth
            label="State/Province/Region"
          />
          <Input
            fullWidth
            label="Zip"
          />
        </Row>
        <Row>
          <Input
            fullWidth
            label="Phone Number"
          />
          <Input
            fullWidth
            label="Country/Region"
          />
        </Row>
      </Form>
    </StyledShipping>
  );
};

export default Shipping;
