import { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';

export default function useProductDetail(params) {
  const [productList, setProductList] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await productApi.getByCategory(params);
        setProductList(result);
        setLoading(false);
      } catch (error) {
        console.log('Loi ne', error);
      }
    })();
  }, [params]);
  return { productList, loading };
}
