import { useState, useEffect, useMemo } from 'react';

interface UseVirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function useVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}: UseVirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    const visibleItemsArray = [];
    for (let i = startIndex; i <= endIndex; i++) {
      visibleItemsArray.push({
        index: i,
        item: items[i],
        offsetY: i * itemHeight
      });
    }

    return visibleItemsArray;
  }, [items, itemHeight, scrollTop, containerHeight, overscan]);

  const totalHeight = items.length * itemHeight;

  return {
    visibleItems,
    totalHeight,
    setScrollTop
  };
}