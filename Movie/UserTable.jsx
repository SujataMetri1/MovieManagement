import { useMemo } from "react";

export default function useDataTable(data, { search, filters }) {
  return useMemo(() => {
    let result = [...data];

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(lower)
        )
      );
    }

    if (filters && filters.length > 0) {
      filters.forEach(({ key, values }) => {
        result = result.filter(item => values.includes(item[key]));
      });
    }

    return result;
  }, [data, search, filters]);
}
