import categoryApi from '../../../api/categoryApi';
import { useState, useEffect } from 'react';

export default function useCategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryOnLoad, setcategoryOnLoad] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
        setcategoryOnLoad(false);
      } catch (error) {
        console.log('Error');
      }
    })();
  }, []);
  return { categoryList, categoryOnLoad };
}
