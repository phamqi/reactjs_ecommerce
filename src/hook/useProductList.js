import { useMemo, useState } from 'react';
import productApi from '../api/productApi';
import { LIMIT } from '../constants';

export default function useProductList(queryParams) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: LIMIT, total: 10 });

  useMemo(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        setPagination(pagination);
      } catch (error) {}
      setLoading(false);
    })();
  }, [queryParams]);
  return { productList, loading, pagination };
}
