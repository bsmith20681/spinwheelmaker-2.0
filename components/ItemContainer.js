import Item from "./Item";
import ItemInput from "./ItemInput";

const ItemContainer = (props) => {
  return (
    <div>
      <ItemInput updateSegments={props.updateSegments} />
      <Item segments={props.segments} />
    </div>
  );
};

export default ItemContainer;
