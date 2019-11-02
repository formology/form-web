import React from 'react';
import styled from '@emotion/styled';

const StyledEditor = styled.div({
  height: 700,
  width: 800,
});

const Editor = ({
  content,
}) => {
  const textareaEl = React.useRef(null);
  React.useEffect(() => {
    if (textareaEl.current) {
      const editor = new window.SimpleMDE({ // eslint-disable-line
        element: textareaEl.current,
        initialValue: content,
        status: false,
      });
    }
  }, []);

  return (
    <StyledEditor>
      <textarea
        ref={textareaEl}
      />
    </StyledEditor>
  );
};

export default Editor;
