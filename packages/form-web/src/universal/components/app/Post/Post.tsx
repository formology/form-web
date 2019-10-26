import React from 'react';
import styled from '@emotion/styled';

const StyledPost = styled.div({
  border: '1px solid blue',
  marginBottom: 5,
});

const Post = ({
  post,
}) => {
  return (
    <StyledPost>
      <p>
        {post.title}
      </p>
      <p>
        {post.content}
      </p>
    </StyledPost>
  );
};

export default Post;
