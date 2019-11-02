import React from 'react';
import styled from '@emotion/styled';

const StyledPage = styled.div({
  backgroundColor: 'yellow',
  flexGrow: 1,
  height: 1900,
});

const Page = ({
  rendered,
}) => {
  // const html = React.useMemo(() => {
  // })

  return (
    <StyledPage>
      <div dangerouslySetInnerHTML={rendered} />
    </StyledPage>
  );
};

export default Page;
