import axios from 'axios';

import {
  OrderEntity,
  UserEntity,
} from '@@src/universal/fetchers/entities';

export default function fetchOrders({
  user,
}: FetchOrdersArgs) {
  return async () => {
    const { data } = await axios.post('http://localhost:3002/orders', {
      user_no: user && user.user_no,
    });
    return data as FetchOrdersResponse;
  };
}

interface FetchOrdersResponse {
  payload: OrderEntity[];
}

interface FetchOrdersArgs {
  user?: UserEntity;
}
