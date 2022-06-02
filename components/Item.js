const Item = (props) => {
  return (
    <div>
      {props.segments.map((item, index) => {
        return (
          <div key={item.text + index}>
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Item;
