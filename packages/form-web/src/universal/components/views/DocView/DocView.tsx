import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { XongkoroFetch } from 'xongkoro';

import Button from '@@universal/components/app/Buttons/Button';
import DocInner from './DocInner';
import Editor from './Editor';
import { log } from '@@universal/modules/Logger';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';
import Viewer from './Viewer';

const StyledDocView = styled(ViewBase)({
});

const StyledContentArea = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const ContentArea = ({
  content,
  isViewer,
}) => {
  return (
    <StyledContentArea>
      {isViewer
        ? (
          <Viewer content={content} />
        )
        : (
          <Editor content={content} />
        )}
    </StyledContentArea>
  );
};

const ContentAreaRendered = ({
  data,
  extraProps,
  loading,
}) => {
  if (!loading) {
    log('ContentAreaRendered(): data: %o', data);
    const { payload = {} } = data;
    const { isViewer } = extraProps;

    return (
      <ContentArea
        content={payload.content || ''}
        isViewer={isViewer}
      />
    );
  }

  return (
    <div>loading...</div>
  );
};

const DocView = () => {
  const params = useParams();
  const [isViewer, setIsViewer] = React.useState(true);
  const handleClickEdit = React.useCallback(() => {
    setIsViewer(!isViewer);
  }, [isViewer]);
  const { name, namespace } = params;

  const fetchOptions = {
    cacheKey: `http://localhost:5001/doc/${params.namespace}/${params.name}`,
    fetchParam: {
      name,
      namespace,
    },
  };

  return (
    <StyledDocView>
      <DocInner>
        <div>
          <Button
            onClick={handleClickEdit}
          >
            Edit
          </Button>
        </div>
        <XongkoroFetch
          extraProps={{
            isViewer,
          }}
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

    const { data } = await axios.post(`http://localhost:5001/doc/${namespace}/${name}`);
    return data;
  };
}
