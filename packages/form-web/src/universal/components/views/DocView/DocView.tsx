import commonmark from 'commonmark';
import React from 'react';
import styled from '@emotion/styled';

import Page from './Page';
import PageTree from './PageTree';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

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
});

const StyledDocTree = styled.div({
  border: '1px solid green',
  flexShrink: 0,
  width: 160,
});

const DocTree = () => {
  return (
    <StyledDocTree>doc tree</StyledDocTree>
  );
};

const DocView = () => {
  const { headings, rendered } = React.useMemo(() => {
    const parsed = reader.parse(dummyPage);
    const walker = parsed.walker();
    const _headings: any[] = [];

    let event = walker.next();
    let node;

    while (event) {
      node = event.node; // eslint-disable-line
      if (node.type === 'text' && node.parent.type === 'heading') {
        _headings.push(node.literal);
      }
      event = walker.next();
    }
    return {
      headings: _headings,
      rendered: {
        __html: writer.render(parsed),
      },
    };
  }, []);


  return (
    <StyledDocView>
      <Inner>
        <DocTree />
        <PageTree
          headings={headings}
        />
        <Page
          rendered={rendered}
        />
      </Inner>
    </StyledDocView>
  );
};

export default DocView;
