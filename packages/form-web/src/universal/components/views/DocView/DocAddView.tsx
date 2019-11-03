import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';

import Button from '@@universal/components/app/Buttons/Button';
import DocInner from './DocInner';
import Editor from './Editor';
import { log } from '@@universal/modules/Logger';
import Toast from '@@universal/components/app/Toast/Toast';
import { USERNAME } from '@@universal/constants';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const ContentArea = styled.div({
  '& > input': {
    border: '1px solid #d2d2d2',
    borderRadius: 3,
    marginBottom: 18,
    padding: 12,
    width: 800,
  },
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const DocAddView = () => {
  const editorRef = React.useRef<any>(null);
  const nameRef = React.useRef<any>(null);
  const registerEditor = React.useCallback((instance) => {
    editorRef.current = instance;
  }, []);
  const [toast, setToast] = React.useState('');

  const handleClickPost = React.useCallback(() => {
    if (editorRef.current !== null && nameRef.current !== null) {
      const name = nameRef.current.value;
      const value = (editorRef.current! as any).value();

      axios.post('http://localhost:5001/doc/new', {
        content: value,
        name,
        namespace: USERNAME,
      })
        .then((result) => {
          log('handleClickPost(): result: %o', result);
          if (result.data.error) {
            setToast('Docuemnt creeation error');
          }
          setToast('Document is successfully created');
        })
        .catch(() => {
          setToast('Docuemnt creeation error');
        })
        .finally(() => {
          setTimeout(() => {
            setToast('');
          }, 3000);
        });
    }
  }, []);

  return (
    <ViewBase>
      <Toast label={toast} />
      <DocInner>
        <div>
          <Button
            onClick={handleClickPost}
            type="button"
          >
            Post
          </Button>
        </div>
        <ContentArea>
          <input
            placeholder="Document Name"
            ref={nameRef}
            type="text"
          />
          <Editor
            content=""
            registerEditor={registerEditor}
          />
        </ContentArea>
      </DocInner>
    </ViewBase>
  );
};

export default DocAddView;