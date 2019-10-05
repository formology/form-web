import React from 'react';
import Text from 'seoul/styled/Text';
import styled from 'styled-components';

import { log } from '@@react/universal/modules/Logger';
import Shipping from './Shipping';

const StyledPayment = styled.div({
});

const Payment = () => {
  React.useEffect(() => {
    try {
      const nadan = window.Nadan({
        apiKey: '123123',
      });

      nadan.payment()
        .mount('nadan-web-wrapper');
    } catch (err) {
      log('error: %o', err);
    }
  }, []);

  return (
    <StyledPayment>
      <Text textType="t6">Payment</Text>
      <Shipping />
      <div id="nadan-web-wrapper" />
    </StyledPayment>
  );
};

export default Payment;
