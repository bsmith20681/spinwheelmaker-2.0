const Item = ({ wheelSettings }) => {
  console.log(wheelSettings);
  return (
    <div>
      {wheelSettings.segments.map((item, index) => {
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
