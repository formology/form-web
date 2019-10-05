import Button from 'seoul/styled/Button';
import Input from 'seoul/styled/Input';
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Action } from '@@react/universal/state';

const StyledSignIn = styled.div({
  '>form': {
    width: 360,
  },
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
});

const SignIn: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = React.useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handleChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleClickSignIn = React.useCallback(() => {
    dispatch(Action.getAuthToken({ email, password }));
  }, [email, password]);

  return (
    <StyledSignIn>
      <form>
        <div>
          <Input
            fullWidth
            label="Email"
            onChange={handleChangeEmail}
            value={email}
          />
        </div>
        <div>
          <Input
            fullWidth
            label="Password"
            onChange={handleChangePassword}
            type="password"
            value={password}
          />
        </div>
        <div>
          <Button
            onClick={handleClickSignIn}
            type="button"
          >
            Sign In
          </Button>
        </div>
      </form>
    </StyledSignIn>
  );
};

export default SignIn;
