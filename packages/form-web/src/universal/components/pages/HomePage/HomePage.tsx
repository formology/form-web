import React from 'react';
import styled from '@emotion/styled';

import Header from '@@src/universal/components/pages/HomePage/Header';
import PostList from '@@src/universal/components/app/Post/PostList';

const StyledHomePage = styled.div({
  border: '1px solid green',
});

const WelcomeDivision = styled.div({
  background: 'lightblue',
  color: 'white',
  fontFamily: 'monospace',
  fontSize: 28,
  margin: 315,
  padding: 8,
  text: '<form>',
});

const WelcomeText = () => {
  return (
    <WelcomeDivision>
      // Welcome to form
    </WelcomeDivision>
  );
};

const dummyData = [
  {
    content: 'content1',
    title: 'title1',
  },
  {
    content: 'content2',
    title: 'title2',
  },
];

const HomePage = () => {
  // const { data } = useSelector();
  // const fetchOptions = {
  //   cacheKey: 'fetchOrders',
  //   fetchParam: {},
  // };

  return (
    <StyledHomePage>
      <Header />
      <WelcomeText />
      <PostList
        posts={dummyData}
      />
      {/* <XongkoroFetch
        fetchFunction={fetchPosts}
        fetchOptions={fetchOptions}
        renderData={D}
      /> */}
    </StyledHomePage>
  );
};

export default HomePage;
