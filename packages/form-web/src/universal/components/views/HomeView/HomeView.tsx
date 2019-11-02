import {
  Link,
} from 'react-router-dom';
import React from 'react';
import styled from '@emotion/styled';

import Search from '@@src/universal/components/views/HomeView/Search';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const StyledHomeView = styled(ViewBase)({
  height: '100%',
  width: '100%',
});
const Image = styled.img`
  height: auto;
  max-width: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  object-fit:contain;
  &:hover {
    transform: translateY(3px);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  }
`;

const dummyDocs = [
  {
    content: 'doc1',
    imageUrl: 'https://image.shutterstock.com/z/stock-vector-blockchain-colored-vertical-poster-or-illustration-in-outline-style-vector-block-chain-symbol-on-1067627900.jpg',
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
  {
    content: 'doc4',
    title: 'doc4',
  },
];

const StyledTrendingDocCarousel = styled.div({
  '&>div': {
    border: '1px solid green',
    height: 400,
    width: '25%',
  },
  border: '1px solid black',
  display: 'flex',
  marginTop: '6%',
});

const TrendingDocCarousel = ({
  docs,
}) => {
  const entries = React.useMemo(() => {
    return docs.map((doc) => {
      return (
        <div key={doc.content}>
          <Link to={`doc/${doc.title}`}>
            {doc.content}
            <Image src={doc.imageUrl} />
          </Link>
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

const HomeView = () => {
  // const { data } = useSelector();
  // const fetchOptions = {
  //   cacheKey: 'fetchOrders',
  //   fetchParam: {},
  // };
  return (
    <StyledHomeView>
      <TrendingDocCarousel docs={dummyDocs} />
      <Search />
    </StyledHomeView>
  );
};

export default HomeView;
