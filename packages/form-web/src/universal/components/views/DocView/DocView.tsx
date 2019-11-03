import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';
import { XongkoroFetch } from 'xongkoro';

import Button from '@@universal/components/app/Buttons/Button';
import ButtonGroup from './ButtonGroup';
import DocInner from './DocInner';
import { log } from '@@universal/modules/Logger';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';
import Viewer from './Viewer';

const StyledDocView = styled(ViewBase)({
});

const StyledContentArea = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const ContentAreaRendered = ({
  data,
  loading,
}) => {
  if (!loading) {
    log('ContentAreaRendered(): data: %o', data);
    const { payload = {} } = data;

    return (
      <StyledContentArea>
        <Viewer content={payload.content} />
      </StyledContentArea>
    );
  }

  return (
    <div>loading...</div>
  );
};

const DocView = () => {
  const history = useHistory();
  const params = useParams();
  const { name, namespace } = params;
  const handleClickEdit = React.useCallback(() => {
    history.push(`/docs/edit/${namespace}/${name}`);
  }, [params]);

  const fetchOptions = {
    cacheKey: `http://localhost:5001/docs/blob/${params.namespace}/${params.name}`,
    fetchParam: {
      name,
      namespace,
    },
  };

  return (
    <StyledDocView>
      <DocInner>
        <ButtonGroup alignRight>
          <Button
            onClick={handleClickEdit}
          >
            Edit
          </Button>
        </ButtonGroup>
        <XongkoroFetch
          fetchFunction={fetchFunction}
          fetchOptions={fetchOptions}
          renderData={ContentAreaRendered}
        />
      </DocInner>
    </StyledDocView>
  );
};

export default DocView;

function fetchFunction({
  name,
  namespace,
}) {
  return async () => {
    log('fetchFunction(): executing with name: %s, namesapce: %s', name, namespace);

    const { data } = await axios.post(`http://localhost:5001/docs/blob/${namespace}/${name}`);
    return data;
  };
}
