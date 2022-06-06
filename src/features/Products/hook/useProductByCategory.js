import { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import { LIMIT } from '../../../constants';

export default function useProductByCategory(category) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {
      'category.id': category,
      _limit: LIMIT,
    };
    (async () => {
      try {
        const { data } = await productApi.getByCategory(params);
        setProductList(data);
        setLoading(false);
      } catch (error) {}
    })();
  }, [category]);
  return { productList, loading };
}
