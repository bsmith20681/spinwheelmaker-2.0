import { useEffect, useState } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DotsIcon from "../public/images/dotsIcon.png";
import { XCircleIcon } from "@heroicons/react/24/outline";

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
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex items-center justify-between">
                      <div className="my-6 flex w-full items-center rounded-md bg-blue-100 p-2">
                        <Image src={DotsIcon} alt="dots" />
                        <p>{item.text}</p>
                      </div>
                      {console.log(provided)}

                      <XCircleIcon className="ml-3 w-7 py-1 text-red-600 hover:cursor-pointer" />
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
