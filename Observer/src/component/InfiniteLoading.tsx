import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CONFIG = {
  ITEM_COUNT: 200000,
};

const generateArrayFromLength = (length: number): number[] =>
  Array.from({ length }, (_, i) => i + 1);

const PAGE_SIZE = 20;

function InfiniteLoading() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<number[]>([]);

  const lastObserver = useRef<IntersectionObserver>(null);
  const firstObserver = useRef<IntersectionObserver>(null);

  const totalItems = useMemo(() => {
    return generateArrayFromLength(CONFIG.ITEM_COUNT);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems.length / PAGE_SIZE);
  }, [totalItems]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (lastObserver.current) lastObserver.current.disconnect();
      lastObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = page + 1;
          if (nextPage > totalPages) return;
          setPage(nextPage);
        }
      });

      if (node) lastObserver.current.observe(node);
    },
    [page, totalPages]
  );

  const firstItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (firstObserver.current) firstObserver.current.disconnect();
      firstObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = page - 1;
          if (page <= 0) return;
          setPage(nextPage);
        }
      });

      if (node) firstObserver.current.observe(node);
    },
    [page]
  );

  useEffect(() => {
    const startIndex = Math.max(page * PAGE_SIZE - PAGE_SIZE - 1, 0);
    const endIndex = page * PAGE_SIZE + PAGE_SIZE - 1;
    console.log({ page, startIndex, endIndex });
    setItems(totalItems.slice(startIndex, endIndex));
  }, [page, totalItems]);

  return (
    <>
      <p>Rendering - {totalItems.length} items </p>
      {items.map((item, index) => {
        const isFirstElem = index === 0;
        const isLastElem = items.length === index + 1;
        return (
          <div
            style={{ padding :"2rem",width:"100%" ,backgroundColor:"pink",border:'1px solid black'}}
            key={item}
            id={`${item}`}
            ref={isFirstElem ? firstItemRef : isLastElem ? lastItemRef : null}
          >
            item - {item}
          </div>
        );
      })}
    </>
  );
}

export default InfiniteLoading;
