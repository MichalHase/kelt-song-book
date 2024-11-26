import { Fragment, useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "../pages/Login";
import Dashboard from "./Dashboard";
import AuthContext from "../contexts/auth";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <Header />
      <Login />
      <main className=".mainhead" >{props.children}</main>
      {authCtx.isLoggedIn ? <Dashboard />: <Footer />}
    </Fragment>
  );
};

export default Layout;
