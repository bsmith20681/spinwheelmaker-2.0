import Layout from "../components/Layout";
import SpinWheel from "../components/SpinWheel";

const Create = () => {
  return (
    <Layout>
      <div className="container my-5 flex justify-around">
        <div>
          <SpinWheel />
        </div>
        <div>
          <h1>These are the inputs</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
