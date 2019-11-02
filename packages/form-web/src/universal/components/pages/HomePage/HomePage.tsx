import {
  Link,
} from 'react-router-dom';
import React from 'react';
import styled from '@emotion/styled';

import Search from '@@src/universal/components/pages/HomePage/Search';
import PageBase from '@@universal/components/pages/PageBase/PageBase';

const StyledHomePage = styled(PageBase)({
  flexDirection: 'column',
  height: '100%',
  width: '100%',
});

const Bottom = styled.div({
  flexGrow: 1,
  paddingTop: '7%',
});

const Account = styled.div({
  '& p': {
    cursor: 'pointer',
  },
  '&>p:not(:last-child)': {
    marginRight: 15,
  },
  display: 'flex',
  marginLeft: 'auto',
});

const dummyDocs = [
  {
    content: 'doc1',
    title: 'doc1',
  },
  {
    content: 'doc2',
    title: 'doc2',
  },
  {
    content: 'doc3',
    title: 'doc3',
  },
];

const StyledTrendingDocCarousel = styled.div({
  '&>div': {
    border: '1px solid green',
    height: 400,
    width: 300,
  },
  border: '1px solid black',
  display: 'flex',
});

const TrendingDocCarousel = ({
  docs,
}) => {
  const entries = React.useMemo(() => {
    return docs.map((doc) => {
      return (
        <div key={doc.content}>
          <Link to="/power">{doc.content}</Link>
        </div>
      );
    });
  }, [docs]);

  return (
    <StyledTrendingDocCarousel>
      {entries}
    </StyledTrendingDocCarousel>
  );
};

const StyledTop = styled.div({
  display: 'flex',
  padding: '0 20',
});

const Top = ({
  children,
}) => {
  return (
    <StyledTop>
      {children}
    </StyledTop>
  );
};

const HomePage = () => {
  // const { data } = useSelector();
  // const fetchOptions = {
  //   cacheKey: 'fetchOrders',
  //   fetchParam: {},
  // };

  return (
    <StyledHomePage>
      <Top>
        <Account>
          <p>Help</p>
          <p>Sign In</p>
        </Account>
      </Top>
      <Bottom>
        <TrendingDocCarousel docs={dummyDocs} />
        <Search />
      </Bottom>
    </StyledHomePage>
  );
};

export default HomePage;
