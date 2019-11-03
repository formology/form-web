import {
  Link,
} from 'react-router-dom';
import marked from 'marked';
import React from 'react';
import styled from '@emotion/styled';

const StyledMiniDoc = styled.div({
  marginRight: 5,
});

const Upper = styled.div({
});

const Bottom = styled.div({
  height: 380,
});

const MarkdownView = styled.div({
  boxShadow: '1px 1px 5px 0px rgba(0,0,0,0.75)',
  height: '166%',
  padding: '15',
  transform: 'scale(0.6) translate(-33%, -33%);',
  width: '166%',
});

const MiniDoc = ({
  address,
  doc,
}) => {
  const html = React.useMemo(() => {
    const _content = doc.content.substring(0, 1400);

    return {
      __html: marked(_content),
    };
  }, [doc]);

  return (
    <StyledMiniDoc>
      <Upper>
        <p>{address}</p>
      </Upper>
      <Bottom>
        <Link to={`/doc/${address}`}>
          <MarkdownView dangerouslySetInnerHTML={html} />
        </Link>
      </Bottom>
    </StyledMiniDoc>
  );
};

export default MiniDoc;
