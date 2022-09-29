import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productApi from '../api/productApi';

export default function useProductDetail(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  useMemo(() => {
    (async () => {
      try {
        const result = await productApi.get(productId);
        setProduct(result);
        setCategory(result.category.id);
        setLoading(false);
      } catch (error) {
        navigate('/error');
      }
    })();
  }, [productId]);
  return { product, loading, category };
}
