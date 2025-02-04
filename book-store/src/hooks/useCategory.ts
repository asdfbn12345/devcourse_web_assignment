import { useEffect, useState } from "react";
import { Category } from "models/category.model";
import { fetchCategory } from "api/category.api";

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategory().then((category) => {
      const categoryWithAll = [
        {
          id: null,
          name: "전체",
        },
        {
          id: 0,
          name: "동화",
        },
        {
          id: 1,
          name: "소설",
        },
        {
          id: 2,
          name: "사회",
        },
        ...category,
      ];

      setCategory(category);
    });
  }, []);

  return { category };
};
