import React from 'react';
import styled from 'styled-components';
import Text from 'seoul/styled/Text';

const StyledCustomerService = styled.div({
  color: '#292929',
  letterSpacing: '0.031em',
  lineHeight: 1.35,
});

const Contact = styled.div({
  margin: '8 0',
});

const Content = styled.div({
  '&>p': {
    marginBottom: 12,
  },
});

const CustomerSupport = () => {
  return (
    <StyledCustomerService>
      <Text textType="t7">Customer Support</Text>
      <div>
        <Contact>
          <p>+82 1071112391</p>
          <p>+1 5109935255</p>
          <p>shop@nadan.io</p>
        </Contact>
        <Content>
          <p>Customer support on telephone between 09-18 KST Weekdays.</p>
          <p>Our ambition is to answer your enquiries within 24 hours during weekdays.</p>
        </Content>
      </div>
    </StyledCustomerService>
  );
};

export default CustomerSupport;
