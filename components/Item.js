import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DotsIcon from "../public/images/dotsIcon.png";
import { XCircleIcon } from "@heroicons/react/24/outline";
import ContentEditable from "react-contenteditable";

const Item = ({ wheelSettings, handleDragEnd, handleDeleteItem, handleChangeItem }) => {
  const [ready, setReady] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const focusInput = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const handleChangeAndFocus = async (e, index) => {
    await handleChangeItem(e, index);
    await focusInput(index);
  };

  return (
    <>
      {ready ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="items">
            {(provided) => (
              <div className="max-h-[28rem] overflow-y-auto" {...provided.droppableProps} ref={provided.innerRef}>
                {wheelSettings.segments.map((item, index) => {
                  return (
                    //adding item.id solved the cursor jumping to the end problem
                    <Draggable key={item.id} draggableId={item.text + item.fillStyle} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex items-center justify-between">
                          <div className="my-3 flex w-full items-center rounded-md bg-blue-100 p-2">
                            <Image src={DotsIcon} alt="dots" />
                            <input
                              className="max-w-lg rounded-sm bg-blue-100 indent-1 transition hover:cursor-pointer hover:bg-blue-200"
                              size={item.text.length || 1}
                              ref={(ref) => (inputRefs.current[index] = ref)}
                              id={index}
                              value={item.text}
                              onChange={(e) => handleChangeAndFocus(e, index)}
                            />
                          </div>
                          <XCircleIcon id={index} onClick={(e) => handleDeleteItem(e, index)} className="mx-3 w-7 py-1 text-red-600 hover:cursor-pointer" />
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
      ) : null}
    </>
  );
};

export default Item;
