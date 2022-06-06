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
          console.log('2:', categoryList);
        } catch (error) {
          console.log('Error');
        }
      })();
    } else {
      console.log('3:', categoryList);
      setCategoryOnLoad(false);
    }
  }, []);
  return { categoryList, categoryOnLoad };
}
