import React from 'react';
import Spinner from 'seoul/styled/Spinner';
import { useSelector } from 'react-redux';

import Account from '@@react/universal/components/pages/AccountPage/Account';
import PageBase from '@@react/universal/components/pages/PageBase';
import { ReduxState } from '@@react/universal/state';
import SignIn from '@@react/universal/components/pages/AccountPage/SignIn';

const AccountPage = () => {
  const user = useSelector((state: ReduxState) => state.user);

  const content = (() => {
    if (user.loading === true) {
      return (
        <Spinner />
      );
    }

    return user.data
      ? <Account user={user.data} />
      : <SignIn />;
  })();

  return (
    <PageBase>
      {content}
    </PageBase>
  );
};

export default AccountPage;
