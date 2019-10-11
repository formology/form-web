import Button from 'seoul/styled/Button';
import React from 'react';
import styled from 'styled-components';
import Table from 'seoul/styled/Table';
import { useQuerry } from 'querry';

import { Action, useDispatch } from '@@src/universal/state';

const headerRows = [
  {
    cells: [
      {
        label: 'Username',
      },
      {
        label: 'Email',
      },
      {
        label: 'Registered at',
        textAlign: 'right',
      },
    ],
    rowId: 'headerRow',
  },
];

const StyledAccount = styled.div({
  width: '100%',
});

const Account: React.FC<AccountProps> = ({
  user,
}) => {
  const dispatch = useDispatch();
  const { history, querry } = useQuerry();

  const handleClickSignOut = React.useCallback(() => {
    dispatch(Action.signOutUser())
      .then(({ error }) => {
        if (!error) {
          const search = querry.mutate((object) => ({
            ...object,
            cart: undefined,
          }))
            .toString();
          history.push(`/${search}`);
        }
      });
  }, []);
  const bodyRows = React.useMemo(() => {
    return [
      {
        cells: [
          {
            label: user.username,
          },
          {
            label: user.email,
          },
          {
            label: user.created_at,
            textAlign: 'right',
          },
        ],
        rowId: 'bodyRow',
      },
    ];
  }, [user]);

  return (
    <StyledAccount>
      <Table
        bodyRows={bodyRows}
        headerRows={headerRows}
      />
      <div>
        <Button
          onClick={handleClickSignOut}
        >
          Sign out
        </Button>
      </div>
    </StyledAccount>
  );
};

export default Account;

interface AccountProps {
  user;
}
