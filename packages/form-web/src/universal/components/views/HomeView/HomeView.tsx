import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';
import { XongkoroFetch } from 'xongkoro';

import { log } from '@@universal/modules/Logger';
import MiniDoc from './MiniDoc';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const StyledHomeView = styled(ViewBase)({
  width: '100%',
});

const StyledTrendingDocCarousel = styled.div({
  '&>div': {
    height: 400,
  },
  display: 'flex',
  justifyContent: 'center',
  margin: '6% 600px 0',
  overflowX: 'scroll',
  overflowY: 'hidden',
});

const TrendingDocCarouselRendered = ({
  data,
  loading,
}) => {
  if (!loading) {
    log('TrendingDocCarouselRendered(): data: %o', data);
    const { payload } = data;
    const { documents = [] } = payload;
    const entries = React.useMemo(() => {
      return documents.map && documents.map((doc) => {
        const address = `${doc.namespace}/${doc.name}`;
        return (
          <MiniDoc
            address={address}
            doc={doc}
            key={address}
          />
        );
      });
    }, [documents]);

    return (
      <StyledTrendingDocCarousel>
        {entries}
      </StyledTrendingDocCarousel>
    );
  }

  return (
    <div>loading...</div>
  );
};


const HomeView = () => {
  const fetchOptions = {
    cacheKey: 'http://localhost:5001/docs',
    fetchParam: {
      power: 1,
    },
  };

  return (
    <StyledHomeView>
      <XongkoroFetch
        fetchFunction={fetchFunction}
        fetchOptions={fetchOptions}
        renderData={TrendingDocCarouselRendered}
      />
    </StyledHomeView>
  );
};

export default HomeView;

function fetchFunction(param) {
  return async () => {
    log('fetchFunction(): executing with fetchParam: %j', param);

    const { data } = await axios.post('http://localhost:5001/docs');
    return data;
  };
}
