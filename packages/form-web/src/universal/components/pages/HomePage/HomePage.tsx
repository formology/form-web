import React from 'react';
import styled from '@emotion/styled';

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
      //Welcome to form
    </WelcomeDivision>
  );
};

// const LowerDivision = styled.div({
//   background: 'orange',
//   border: '50 px solid blue',
//   borderRaduis: 4,
//   color: 'white',
//   fontFamily: 'monospace',
//   fontSize: 28,
//   margin: 220,
//   padding: 8,
//   text: '<form>',
// });

// const SecondText = () => {
//   return (
//     <LowerDivision>
//       Click To Know About Us!
//     </LowerDivision>
//   );
// };

export default WelcomeText;

/*
const P = ({className}) => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'sans-serif',
      color: 'black',
    }}
    className={className}
  />
)

const ArticleText = ({className}) => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray',
    }}
    className={className}
  />
)
*/
