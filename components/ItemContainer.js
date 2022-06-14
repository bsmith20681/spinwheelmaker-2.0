import Item from "./Item";
import ItemInput from "./ItemInput";

const ItemContainer = ({ updateWheelSettings, wheelSettings }) => {
  return (
    <div>
      <ItemInput updateWheelSettings={updateWheelSettings} />
      <Item wheelSettings={wheelSettings} />
    </div>
  );
};

export default ItemContainer;
