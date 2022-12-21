import Item from "./Item";
import ItemInput from "./ItemInput";

const ItemContainer = ({ updateWheelSettings, wheelSettings, spinTheWheel, handleDragEnd, handleDeleteItem }) => {
  return (
    <div className="flex flex-col justify-between">
      <ItemInput updateWheelSettings={updateWheelSettings} />
      <Item handleDeleteItem={handleDeleteItem} handleDragEnd={handleDragEnd} wheelSettings={wheelSettings} />
      <button onClick={spinTheWheel} className="w-full rounded-md bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
        Spin The Wheel
      </button>
    </div>
  );
};

export default ItemContainer;
