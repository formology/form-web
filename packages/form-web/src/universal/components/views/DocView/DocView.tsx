import React from 'react';
import styled from '@emotion/styled';

import Editor from './Editor';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';
import Viewer from './Viewer';

const dummyPage = `
# Blockchain
A blockchain, originally block chain, is a growing list of records, called blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree).

## History
The first work on a cryptographically secured chain of blocks was described in 1991 by Stuart Haber and W. Scott Stornetta.[6][11] They wanted to implement a system where document timestamps could not be tampered with. In 1992, Bayer, Haber and Stornetta incorporated Merkle trees to the design, which improved its efficiency by allowing several document certificates to be collected into one block.[6][12]
`;

const StyledDocView = styled(ViewBase)({
  border: '1px solid black',
});

const Inner = styled.div({
  border: '1px solid blue',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '30px 0 100px',
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
const ButtonGroup = styled.div({
  height: 100,
});

const StyledContentArea = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const ContentArea = ({
  content,
  isViewer,
}) => {
  return (
    <StyledContentArea>
      {isViewer
        ? (
          <Viewer content={content} />
        )
        : (
          <Editor content={content} />
        )}
    </StyledContentArea>
  );
};

const DocView = () => {
  const [isViewer, setIsViewer] = React.useState(true);
  const handleClickEdit = React.useCallback(() => {
    setIsViewer(!isViewer);
  }, [isViewer]);

  return (
    <StyledDocView>
      <Inner>
        <ButtonGroup>
          <Button
            onClick={handleClickEdit}
          >
            Edit
          </Button>
        </ButtonGroup>
        <ContentArea
          content={dummyPage}
          isViewer={isViewer}
        />
      </Inner>
    </StyledDocView>
  );
};

export default DocView;
