import { useState, useEffect } from 'react';

import categoryApi from '../../../api/categoryApi';
import StorageKeys from '../../../constants/storagekey';

export default function useCategoryList() {
  const [categoryList, setCategoryList] = useState(
    JSON.parse(localStorage.getItem(StorageKeys.CATEGORY)) || []
  );
  const [categoryOnLoad, setCategoryOnLoad] = useState(true);
  useEffect(() => {
    console.log(categoryList);
    if (categoryList.length === 0) {
      (async () => {
        try {
          const data = await categoryApi.getAll();
          const list = data.map((x) => ({ id: x.id, name: x.name }));
          setCategoryList(list);
          localStorage.setItem(StorageKeys.CATEGORY, JSON.stringify(list));
          setCategoryOnLoad(false);
        } catch (error) {
          console.log('Error');
        }
      })();
    } else {
      setCategoryOnLoad(false);
    }
  }, []);
  return { categoryList, categoryOnLoad };
}
