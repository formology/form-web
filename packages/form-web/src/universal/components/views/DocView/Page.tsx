import React from 'react';
import styled from '@emotion/styled';

const StyledPage = styled.div({
  backgroundColor: 'yellow',
  flexGrow: 1,
  height: 1900,
});
const Button = styled.button`
  float: right;
  font-size: 1rem;
  border-radius: 5px;
  padding: 0.25rem 1rem;
  margin: 1 1rem;
  background: white;
  border: 2px solid;
  cursor: pointer;
  &:hover {
    transform: translateY(1px);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  }
`;

const Page = ({
  rendered,
}) => {
  return (
    <StyledPage>
      <Button>edit</Button>
      <div dangerouslySetInnerHTML={rendered} />
    </StyledPage>
  );
};

export default Page;
