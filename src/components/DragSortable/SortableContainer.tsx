import React, { FC } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type Props = {
  children: JSX.Element | JSX.Element[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<{ id: string; [key: string]: any }>;
  handleDragEndMove: (oldIndex: number, newIndex: number) => void;
};

const SortableContainer: FC<Props> = (props: Props) => {
  const { children, items, handleDragEndMove } = props;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 避免点击事件失效 https://github.com/clauderic/dnd-kit/issues/893
      activationConstraint: {
        // Require pointer to move by 5 pixels before activating draggable
        // Allows nested onClicks/buttons/interactions to be accessed
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      // items 已经交给 redux 管理
      handleDragEndMove(oldIndex, newIndex);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {/* 怎么循环交给上层 */}
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
