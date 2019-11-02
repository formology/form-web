import React from 'react';
import styled from '@emotion/styled';

const StyledViewBase = styled.div({
  minHeight: '100%',
});

const StyledTop = styled.div({
  display: 'flex',
  padding: '0 20',
});

const Top = ({
  children,
}) => {
  return (
    <StyledTop>
      {children}
    </StyledTop>
  );
};

const Account = styled.div({
  '& p': {
    cursor: 'pointer',
  },
  '&>p:not(:last-child)': {
    marginRight: 15,
  },
  display: 'flex',
  marginLeft: 'auto',
});

const Bottom = styled.div({
  minHeight: 'calc(100% - 50px)',
});

const ViewBase: React.FC<any> = ({
  children,
  className,
}) => {
  return (
    <StyledViewBase className={className}>
      <Top>
        <Account>
          <p>Help</p>
          <p>Matthew</p>
        </Account>
      </Top>
      <Bottom>
        {children}
      </Bottom>
    </StyledViewBase>
  );
};

export default ViewBase;

interface PageBaseProps {
  className?: string;
}
