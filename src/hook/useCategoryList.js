import { useMemo, useState } from 'react';

import categoryApi from '../api/categoryApi';
import StorageKeys from '../constants/storageKeys';

export default function useCategoryList() {
  const [categoryList, setCategoryList] = useState(
    JSON.parse(localStorage.getItem(StorageKeys.CATEGORY)) || []
  );
  const [categoryOnLoad, setCategoryOnLoad] = useState(true);
  useMemo(() => {
    if (categoryList.length === 0) {
      (async () => {
        try {
          const data = await categoryApi.getAll();
          const list = data.map((x) => ({ id: x.id, name: x.name }));
          setCategoryList(list);
          localStorage.setItem(StorageKeys.CATEGORY, JSON.stringify(list));
          setCategoryOnLoad(false);
        } catch (error) {}
      })();
    } else {
      setCategoryOnLoad(false);
    }
  }, []);
  return { categoryList, categoryOnLoad };
}
