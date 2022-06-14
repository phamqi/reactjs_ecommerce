import { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState();

  useEffect(() => {
    (async () => {
      try {
        const result = await productApi.get(productId);
        setProduct(result);
        setCategory(result.category.id);
        setLoading(false);
      } catch (error) {
        console.log('Loi ne', error);
      }
    })();
  }, [productId]);
  return { product, loading, category };
}
