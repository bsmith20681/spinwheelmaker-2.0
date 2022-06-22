import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
                      {console.log(provided)}
                      <FontAwesomeIcon className="mr-4 text-gray-600 hover:cursor-move" icon={faBars} />
                      <p>{item.text}</p>
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
