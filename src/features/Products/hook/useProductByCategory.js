import { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import { LIMIT } from '../../../constants';

export default function useProductByCategory(category) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = {
    'category.id': category,
    _limit: LIMIT,
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getByCategory(params);
        console.log('List product by category', data);
        setProductList(data);
        setLoading(false);
      } catch (error) {}
    })();
  }, [params]);
  return { productList, loading };
}
