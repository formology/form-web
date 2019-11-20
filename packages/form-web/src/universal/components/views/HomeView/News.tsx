import React from 'react';
import styled from '@emotion/styled';

const StyledNews = styled.div({
  border: '0.5px solid gray',
  display: 'flex',
  height: '480px',
  justifyContent: 'center',
  paddingTop: 55,
});

const Avatar = styled.img({
  height: 80,
  width: 80,
});

const Body = styled.div({
  width: '400px',
});

const SingleNewRow = styled.div({
  display: 'flex',
  height: '60px',
  justifyContent: 'space-evenly',
  marginTop: '10px',
  width: '500px',
});

const Username = styled.span({
  fontWeight: 600,
  marginRight: 5,
});

const TargetDoc = styled.span({
  fontWeight: 600,
  marginLeft: 5,
});

const Title = styled.div({});

const Change = styled.div({
  marginTop: 6,
});

const Diff = styled.div({
  '& .addition': {
    background: 'green',
  },
  '& .removal': {
    backgroundColor: 'red',
  },
  '&>span': {
    whiteSpace: 'pre',
  },
  fontFamily: `'Roboto Mono', monospace`,
});

const News = ({
  data,
  loading,
}) => {
  if (!loading) {
    return data.map((d) => {
      const { diff } = d;
      const diffMap: any = [];
      let chunk: any = [];
      let chunkType = 'plain';
      let chunkIdx = 0;
      for (let idx = 0; idx < diff.length; idx += 1) {
        const c = diff[idx];
        if (c === '[') {
          diffMap.push({
            chunk,
            chunkIdx: chunkIdx += 1,
            chunkType,
          });
          chunk = [];
          chunkType = 'removal';
        } else if (c === ']') {
          diffMap.push({
            chunk,
            chunkIdx: chunkIdx += 1,
            chunkType,
          });
          chunkType = 'plain';
          chunk = [];
        } else if (c === '{') {
          diffMap.push({
            chunk,
            chunkIdx: chunkIdx += 1,
            chunkType,
          });
          chunk = [];
          chunkType = 'addition';
        } else if (c === '}') {
          diffMap.push({
            chunk,
            chunkIdx: chunkIdx += 1,
            chunkType,
          });
          chunk = [];
          chunkType = 'plain';
        } else if (
          !(chunkType === 'removal' && c === '-')
          && !(chunkType === 'addition' && c === '+')
        ) {
          chunk.push(c);
        }
        if (idx === diff.length - 1) {
          diffMap.push({
            chunk,
            chunkIdx: chunkIdx += 1,
            chunkType,
          });
        }
      }

      const _diff = diffMap.map((df) => {
        return (
          <span
            className={df.chunkType}
            key={df.chunkIdx}
          >
            {df.chunk.join('')}
          </span>
        );
      });

      return (
        <StyledNews key={d.username}>
          <SingleNewRow>
            <Avatar src={d.avatarUrl} />
            <Body>
              <Title>
                <Username>{d.username}</Username>
                <span>proposed to</span>
                <TargetDoc>{`${d.targetDocNamespace}/${d.targetDocName}`}</TargetDoc>
              </Title>
              <Change>
                <div>{d.commitMsg}</div>
                <Diff>
                  {_diff}
                </Diff>
              </Change>
            </Body>
          </SingleNewRow>
        </StyledNews>
      );
    });
  }

  return (
    <span>loading</span>
  );
};

export default React.memo(News);
