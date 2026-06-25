"use client";

import { useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaGripVertical } from "react-icons/fa";
import { ContentCard } from "@/components/cards/ContentCard";
import type { ContentItem } from "@/types/content";

const CARD_TYPE = "CONTENT_CARD";

type DragItem = {
  id: string;
  index: number;
};

export function DraggableContentCard({
  item,
  index,
  isFavorite,
  onFavorite,
  onMove,
}: {
  item: ContentItem;
  index: number;
  isFavorite: boolean;
  onFavorite: (item: ContentItem) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}) {
  const [{ isDragging }, drag] = useDrag({
    type: CARD_TYPE,
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<DragItem>({
    accept: CARD_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index === index) {
        return;
      }

      onMove(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const setCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        drag(drop(node));
      }
    },
    [drag, drop],
  );

  return (
    <div
      className={isDragging ? "opacity-40" : "opacity-100"}
      ref={setCardRef}
    >
      <ContentCard
        dragHandle={<FaGripVertical aria-hidden="true" />}
        isFavorite={isFavorite}
        item={item}
        onFavorite={onFavorite}
      />
    </div>
  );
}
