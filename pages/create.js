import Layout from "../components/Layout";
import SpinWheelContainer from "../components/SpinWheelContainer";

const Create = () => {
  return (
    <Layout>
      <SpinWheelContainer
        segments={[
          { id: "0", fillStyle: "#52AB84", text: "Pizza" },
          { id: "1", fillStyle: "#D96B75", text: "Burger" },
          { id: "2", fillStyle: "#47B2C2", text: "Tacos" },
          { id: "3", fillStyle: "#DA9457", text: "Fries" },
          { id: "4", fillStyle: "#DEC85E", text: "Pasta" },
          { id: "5", fillStyle: "#325D89", text: "Hot Dogs" },
          { id: "6", fillStyle: "#6A4A80", text: "Fried Chicken" },
        ]}
        title="What to eat for Lunch?"
      />
    </Layout>
  );
};

export default Create;
