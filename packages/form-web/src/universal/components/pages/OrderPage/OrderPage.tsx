import React from 'react';

import OrderList from '@@src/universal/components/pages/OrderPage/OrderList';
import PageBase from '@@src/universal/components/pages/PageBase';

const OrderPage = () => {
  return (
    <PageBase>
      <OrderList />
    </PageBase>
  );
};

export default OrderPage;
