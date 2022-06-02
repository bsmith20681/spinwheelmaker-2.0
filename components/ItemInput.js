import { useState } from "react";

const ItemInput = (props) => {
  const [itemInputValue, setItemInputValue] = useState("");

  const handleClick = (e) => {
    if (itemInputValue !== "") {
      e.updateSegments({ fillStyle: "#7de6ef", text: itemInputValue });
      setItemInputValue("");
    }
  };

  const handleKeyDown = (e, props) => {
    if (e.code === "Enter" && itemInputValue !== "") {
      handleClick(props);
    }
  };

  return (
    <div>
      <input
        onKeyDown={(e) => handleKeyDown(e, props)}
        onChange={(e) => setItemInputValue(e.target.value)}
        value={itemInputValue}
        className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        type="text"
      />
      <button onClick={() => handleClick(props)} className="mx-3 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
        Add Item
      </button>
    </div>
  );
};

export default ItemInput;