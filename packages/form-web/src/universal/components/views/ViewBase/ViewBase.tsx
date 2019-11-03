import {
  Link,
} from 'react-router-dom';
import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

const StyledViewBase = styled.div({
  minHeight: '100%',
});

const StyledTop = styled.div({
  alignItems: 'center',
  display: 'flex',
  height: 58,
  padding: '0 30',
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

const Logo = styled.div({
  '& svg': {
    marginRight: 12,
  },
  alignItems: 'center',
  display: 'flex',
  fontSize: 24,
});

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
        <Logo>
          <Link to="/">
            <FontAwesomeIcon icon={faProjectDiagram} />
            FORM
          </Link>
        </Logo>
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
