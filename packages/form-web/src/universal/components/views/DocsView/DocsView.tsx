import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import { XongkoroFetch } from 'xongkoro';

import { log } from '@@universal/modules/Logger';
import MiniDoc from './MiniDoc';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const StyledDocsView = styled(ViewBase)({
  width: '100%',
});

const StyledTrendingDocCarousel = styled.div({
  '&>div': {
    height: 60,
  },
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  marginRight: '250px',
  overflowX: 'scroll',
  overflowY: 'hidden',
  paddingTop: '75px',
});

const StyledLeftHomeBar = styled.div({
  fontFamily: 'bookman',
  fontSize: '26',
  lineHeight: '175%',
  padding: '64px 0 0 42px',
  width: 200,
});

const LeftBarEntry = ({
  handleClickEntry,
  label,
  url,
}) => {
  return (
    <div
      data-url={url}
      onClick={handleClickEntry}
      role="button"
      tabIndex={0}
    >
      {label}
    </div>
  );
};

const LeftBar = ({
  handleClickEntry,
}) => {
  return (
    <StyledLeftHomeBar>
      <LeftBarEntry
        handleClickEntry={handleClickEntry}
        label="Home"
        url="/"
      />
      <LeftBarEntry
        handleClickEntry={handleClickEntry}
        label="Documents"
        url="/docs"
      />
    </StyledLeftHomeBar>
  );
};

const StyledHorizontalBar = styled.div({
  display: 'flex',
  minHeight: 'calc(100% - 58px)',
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


const DocsView = () => {
  const fetchOptions = {
    cacheKey: 'http://localhost:5001/docs',
    fetchParam: {
      power: 1,
    },
  };

  const history = useHistory();

  const handleClickEntry = React.useCallback((e) => {
    const { url } = e.target.dataset;
    history.push(url);
  }, []);

  return (
    <StyledDocsView>
      <StyledHorizontalBar>
        <LeftBar
          handleClickEntry={handleClickEntry}
        />
        <XongkoroFetch
          fetchFunction={fetchFunction}
          fetchOptions={fetchOptions}
          renderData={TrendingDocCarouselRendered}
        />
      </StyledHorizontalBar>
    </StyledDocsView>
  );
};

export default DocsView;

function fetchFunction(param) {
  return async () => {
    log('fetchFunction(): executing with fetchParam: %j', param);

    const { data } = await axios.post('http://localhost:5001/docs');
    return data;
  };
}
