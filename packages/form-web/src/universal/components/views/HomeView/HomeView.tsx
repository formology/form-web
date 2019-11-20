import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import { XongkoroFetch } from 'xongkoro';

import { log } from '@@universal/modules/Logger';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const StyledTopBar = styled(ViewBase)({
  width: '100%',
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

const MiddleBox = styled.div({
  border: '0.5px solid gray',
  display: 'flex',
  height: '480px',
  justifyContent: 'center',
  marginLeft: '550px',
  marginRight: '550px',
  marginTop: '5px',
});

const EmojiBox = styled.div({
  border: '0.2px solid gray',
});

const BoxEntry = styled.div({
  border: '0.2px solid gray',
  display: 'flex',
  width: '400px',
});

const SingleNewRow = styled.div({
  display: 'flex',
  height: '60px',
  justifyContent: 'space-evenly',
  marginTop: '10px',
  width: '500px',
});

const MiddleContent = ({
  data = `Elden's`,
}) => {
  return (
    <MiddleBox>
      <SingleNewRow>
        <EmojiBox>
          Avatar
        </EmojiBox>
        <BoxEntry>
          <div>
            {data}
            <span>Entry</span>
          </div>
        </BoxEntry>
      </SingleNewRow>
    </MiddleBox>
  );
};

const HomeView = () => {
  const fetchOptions = {
    cacheKey: 'http://localhost:5001',
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
    <StyledTopBar>
      <LeftBar
        handleClickEntry={handleClickEntry}
      />
      <XongkoroFetch
        fetchFunction={fetchFunction}
        fetchOptions={fetchOptions}
        renderData={MiddleContent}
        //renderData={() => (<div>123</div>)}
      />
    </StyledTopBar>
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
