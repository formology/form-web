import React from 'react';
import styled from 'styled-components';

const StyledPageBase = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '31px 0',
  width: 1020,
});

const PageBase: React.FC<PageBaseProps> = ({
  children,
  className,
}) => {
  return (
    <StyledPageBase className={className}>
      {children}
    </StyledPageBase>
  );
};

export default PageBase;

interface PageBaseProps {
  className?: string;
}
