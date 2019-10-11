import Image from 'seoul/styled/Image';
import React from 'react';
import Spinner from 'seoul/styled/Spinner';
import styled from 'styled-components';
import Table from 'seoul/styled/Table';
import Text from 'seoul/styled/Text';
import { useSelector } from 'react-redux';
import { XongkoroFetch } from 'xongkoro';

import ErrorSign from '@@src/universal/components/app/ErrorSign';
import fetchOrders from '@@src/universal/fetchers/fetchOrders';
import { OrderEntity } from '@@src/universal/fetchers/entities';
import { PaymentStatusReverse } from '@@src/universal/fetchers/constants';
import { ReduxState } from '@@src/universal/state';

const headerRows = [
  {
    cells: [
      {
        label: 'Order No',
      },
      {
        label: 'Products',
      },
      {
        label: 'Price',
        textAlign: 'right',
      },
      {
        label: 'Payment Status',
        textAlign: 'right',
        whiteSpace: 'nowrap',
      },
      {
        label: 'Order Date',
        textAlign: 'right',
      },
    ],
    rowId: 'headerRow',
  },
];

const StyledOrderList = styled.div({
  width: '100%',
});

const ProductCell = styled.div({
  alignItems: 'center',
  display: 'flex',
});

const ProductLabel = styled.div({
  '& .count': {
    color: '#666',
    marginRight: 7,
  },
  paddingLeft: 13,
});

const OrderListRendered = ({
  data,
  loading,
}) => {
  if (loading) {
    return (
      <Spinner />
    );
  }

  if (data.error) {
    return (
      <ErrorSign />
    );
  }

  const orders = React.useMemo(() => {
    const reduced = data.payload.reduce((acc, curr: OrderEntity) => {
      if (acc[curr.order_no]) {
        acc[curr.order_no].$itemLabels = acc[curr.order_no].$itemLabels.concat(curr.label);
      } else {
        acc[curr.order_no] = { ...curr };
        acc[curr.order_no].$itemLabels = [curr.label];
      }
      return acc;
    }, {});

    return reduced;
  }, [data]);

  const bodyRows = React.useMemo(() => {
    return Object.values(orders)
      .map((order: OrderEntity & { $itemLabels: string[] }) => {
        return {
          cells: [
            {
              label: order.order_no!,
            },
            {
              label: (
                <ProductCell>
                  <Image imgUrl={order.img_url} />
                  <ProductLabel>
                    <span className="count">{`[${order.$itemLabels.length} items]`}</span>
                    <span>{order.$itemLabels.join(' / ')}</span>
                  </ProductLabel>
                </ProductCell>
              ),
            },
            {
              label: `${order.currency} ${order.transaction_amount}`,
              textAlign: 'right',
            },
            {
              label: PaymentStatusReverse[order.payment_status!],
              textAlign: 'right',
            },
            {
              label: order.created_at!,
              textAlign: 'right',
            },
          ],
          rowId: order.order_no,
        };
      });
  }, [orders]);

  return (
    <Table
      bodyRows={bodyRows}
      headerRows={headerRows}
    />
  );
};

const NotSignedIn = () => {
  return (
    <div>Sign In is required to see the order history</div>
  );
};

const OrderList: React.FC<{}> = () => {
  const { data } = useSelector((state: ReduxState) => state.user);
  const fetchOptions = {
    cacheKey: 'fetchOrders',
    fetchParam: {
      user: data,
    },
  };

  return (
    <StyledOrderList>
      <Text textType="t6">Order History</Text>
      {!data
        ? <NotSignedIn />
        : (
          <XongkoroFetch
            fetchFunction={fetchOrders}
            fetchOptions={fetchOptions}
            renderData={OrderListRendered}
          />
        )
      }
    </StyledOrderList>
  );
};

export default OrderList;
