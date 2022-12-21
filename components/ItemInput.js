import { useState } from "react";

const ItemInput = (props) => {
  const [itemInputValue, setItemInputValue] = useState("");
  const colorList = ["#52AB84", "#DA6B75", " #47B2C2", "#DA9457", "#DEC85E", "#325D89", "#6A4A80"];

  const handleClick = (e) => {
    if (itemInputValue !== "") {
      e.updateWheelSettings({ fillStyle: colorList[props.wheelSettings.segments.length % 7], text: itemInputValue });
      setItemInputValue("");
    }
  };

  const handleKeyDown = (e, props) => {
    if (e.code === "Enter" && itemInputValue !== "") {
      handleClick(props);
    }
  };

  return (
    <div className="flex">
      <input
        onKeyDown={(e) => handleKeyDown(e, props)}
        onChange={(e) => setItemInputValue(e.target.value)}
        value={itemInputValue}
        placeholder="Add Item"
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 text-sm leading-tight text-gray-700 shadow focus:outline-none"
        type="text"
      />
      <button onClick={() => handleClick(props)} className="mx-3 whitespace-nowrap rounded bg-blue-500 py-2 px-4 text-sm font-bold text-white hover:bg-blue-700">
        Add Item
      </button>
    </div>
  );
};

export default ItemInput;
