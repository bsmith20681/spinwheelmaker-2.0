import { useEffect, useState } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DotsIcon from "../public/images/dotsIcon.png";

const Item = ({ wheelSettings }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);
  console.log(wheelSettings);

  return (
    <DragDropContext>
      <Droppable droppableId="items">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {wheelSettings.segments.map((item, index) => {
              return (
                <Draggable key={item.text} draggableId={item.text} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="my-6 flex items-center">
                      <Image src={DotsIcon} alt="dots" />
                      {console.log(provided)}
                      <p className="text-sm">{item.text}</p>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Item;
