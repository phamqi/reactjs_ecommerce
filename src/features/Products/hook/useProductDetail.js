import { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loadding, setLoadding] = useState(true);
  const [category, setCategory] = useState();

  useEffect(() => {
    (async () => {
      try {
        const result = await productApi.get(productId);
        setProduct(result);
        console.log('result', result);
        setCategory(result.category.id);
        setLoadding(false);
      } catch (error) {
        console.log('Loi ne', error);
      }
    })();
  }, [productId]);
  return { product, loadding, category };
}
