import { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import { LIMIT } from '../../../constants';

export default function useProductList(queryParams) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: LIMIT, total: 10 });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        console.log('List product', data, pagination);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('fail to get product', error);
      }
      setLoading(false);
    })();
  }, [queryParams]);
  return { productList, loading, pagination };
}
