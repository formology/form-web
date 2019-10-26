import React from 'react';
import styled from '@emotion/styled';

import Post from './Post';

const StyledPostList = styled.div({
  border: '1px solid gray',
});

const PostList = ({
  posts,
}) => {
  const content = posts.map((post) => {
    return (
      <Post
        key={post.title}
        post={post}
      />
    );
  });

  return (
    <StyledPostList>
      {content}
    </StyledPostList>
  );
};

export default PostList;
