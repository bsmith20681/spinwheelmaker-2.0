import { useState } from "react";

const ItemInput = ({ wheelSettings, updateWheelSettings, handleWeightInput }) => {
  const [itemInputValue, setItemInputValue] = useState("");
  const colorList = ["#52AB84", "#DA6B75", " #47B2C2", "#DA9457", "#DEC85E", "#325D89", "#6A4A80"];

  const handleClick = (e) => {
    const sortArrayById = [...wheelSettings.segments].sort((a, b) => parseInt(a.id) > parseInt(b.id));
    const createNewId = parseInt(sortArrayById.at(-1).id) + 1;

    if (itemInputValue !== "") {
      updateWheelSettings({ id: createNewId.toString(), fillStyle: colorList[wheelSettings.segments.length % 7], weightValue: 1, size: 360 / wheelSettings.segments.length, text: itemInputValue });
      //handleWeightInput();
      console.log(e);
      setItemInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && itemInputValue !== "") {
      handleClick();
    }
  };

  return (
    <div className="flex">
      <input
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => setItemInputValue(e.target.value)}
        value={itemInputValue}
        placeholder="Add Item"
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
        type="text"
      />
      <button onClick={(e) => handleClick(e)} className="mx-3 whitespace-nowrap rounded bg-blue-500 py-2 px-4 text-sm font-bold text-white hover:bg-blue-700">
        Add Item
      </button>
    </div>
  );
};

export default ItemInput;
