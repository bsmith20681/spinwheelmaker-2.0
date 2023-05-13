import Item from "./Item";
import ItemInput from "./ItemInput";

const ItemContainer = ({ updateWheelSettings, wheelSettings, spinTheWheel, handleDragEnd, handleDeleteItem, handleChangeItem }) => {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <ItemInput updateWheelSettings={updateWheelSettings} wheelSettings={wheelSettings} />
        <Item handleDeleteItem={handleDeleteItem} handleChangeItem={handleChangeItem} handleDragEnd={handleDragEnd} wheelSettings={wheelSettings} />
      </div>
      <button onClick={spinTheWheel} className="my-2 w-full rounded-md bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
        Spin The Wheel
      </button>
    </div>
  );
};

export default ItemContainer;
