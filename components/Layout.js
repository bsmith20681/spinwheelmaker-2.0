import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div>
      <Header isAuth={props.isAuth} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
