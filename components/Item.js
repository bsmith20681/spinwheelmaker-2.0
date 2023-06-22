import { useEffect, useState } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DotsIcon from "../public/images/dotsIcon.png";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Item = ({ wheelSettings, handleDragEnd, handleDeleteItem, handleWeightInput, handleChangeItem }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  return (
    <>
      {ready ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="items">
            {(provided) => (
              <div className="max-h-[28rem] overflow-y-auto" {...provided.droppableProps} ref={provided.innerRef}>
                {wheelSettings.segments.map((item, index) => {
                  return (
                    <Draggable key={item.id} draggableId={item.text + item.fillStyle} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="flex items-center justify-between">
                          <div className="my-3 flex w-full items-center rounded-md bg-blue-100 p-2">
                            <input type="number" id={index} onFocus={(e) => e.target.select()} value={item.weightValue == undefined ? 1 : item.weightValue} onChange={(e) => handleWeightInput(e)} className="w-7 rounded-md text-center" min={1} />
                            <Image src={DotsIcon} alt="dots" />
                            <input className="max-w-lg rounded-sm bg-blue-100 indent-1 transition hover:cursor-pointer hover:bg-blue-200 focus:bg-white" size={item.text.length || 1} id={index} value={item.text} onChange={(e) => handleChangeItem(e, index)} />
                          </div>
                          <XCircleIcon id={item.id} onClick={(e) => handleDeleteItem(e, index)} className="mx-3 w-7 py-1 text-red-600 hover:cursor-pointer" />
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
